import redis from 'redis';
import { promisify } from 'util';
import kue from 'kue';
import express from 'express';

const app = express();
const port = 1245;

/* Redis */
const client = redis.createClient();

let initialNumber = 50;
let reservationEnabled = true; // turned to false when no seat available

const set = promisify(client.set).bind(client);
const get = promisify(client.get).bind(client);

async function reserveSeat(number) {
  return set('available_seats', number);
}

async function getCurrentAvailableSeats() {
  return get('available_seats');
}

/* Kue queue */
const queue = kue.createQueue({name: 'reserve_seat'});

/* Server */
app.get('/available_seats', (req, res) => {
  getCurrentAvailableSeats()
    .then((numberOfAvailableSeats) => {
      res.json({ numberOfAvailableSeats });
    });
});

app.get('/reserve_seat', (req, res) => {
  if (reservationEnabled === false) {
    res.json({ "status": "Reservation are blocked" });
    return;
  }
  try {
    const job = queue.create('reserve_seat');

    job
      .on('failed', (err) => {
        const error = err.message || err.toString();
        console.log(`Seat reservation job ${job.id} failed: ${error}`);
      })
      .on('complete', () => {
        console.log(`Seat reservation job ${job.id} completed`)
      })
      .save();
      res.json({ "status": "Reservation in process" }); // no error
  } catch {
    res.json({ "status": "Reservation failed" }); // error occurred
  }
});

app.get('/process', (req, res) => {
  queue.process('reserve_seat', (job, done) => {
    getCurrentAvailableSeats()
    .then((result) => Number.parseInt(result || 0))
    .then((availableSeats) => {
      if (availableSeats <= 1) reservationEnabled = false;
      if (availableSeats >= 1) {
        reserveSeat(availableSeats - 1)
        .then(() => done());
      } else {
        done(new Error('Not enough seats available'));
      }
    })
  });
  res.json({ "status": "Queue processing" });
});

async function setAvailableSeats(initialNumber) {
  return set('available_seats', parseInt(initialNumber));
}

app.listen(port, () => {
  setAvailableSeats(initialNumber)
    .then(() => {
      reservationEnabled = true;
      console.log(`API available at http://localhost:${port}`);
    })
})
