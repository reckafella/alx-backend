import kue from 'kue';

const queue = kue.createQueue();

const BLACKLIST = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
  if (BLACKLIST.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    return;
  }

  let progress = 0;
  const interval = setInterval(() => {
    if (progress === 0) {
      job.progress(progress, 100);
    }

    progress += 50;

    if (progress === 50) {
      job.progress(progress, 100);
      console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    }
    if (progress === 100) {
      clearInterval(interval);
      done();
    }
  }, 1000);
}

queue.process('push_notification_code_2', (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
