
import sinon from 'sinon';
import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';


const queue = kue.createQueue({name: 'push_notification_code_test'});

const testJobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  }
];

describe('createPushNotificationsJobs', () => {
  const consoleSpy = sinon.spy(console, 'log');

  before(() => {
    queue.testMode.enter(true);
  });

  after(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  afterEach(() => {
    consoleSpy.resetHistory();
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => {
      createPushNotificationsJobs({}, queue)
    }).to.throw('Jobs is not an array');
  });

  it('should create and save jobs to the queue', (done) => {
    expect(queue.testMode.jobs.length).to.equal(0);

    createPushNotificationsJobs(testJobs, queue);

    expect(queue.testMode.jobs.length).to.equal(2);

    expect(queue.testMode.jobs[0].data).to.deep.equal(testJobs[0]);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');

    queue.process('push_notification_code_3', (done) => {
      expect(consoleSpy.calledWith(sinon.match(`Notification job created: ${queue.testMode.jobs[0].id}`))).to.be.true;
      done();
    });
    done();
  });

  it('should test the progress bar', (done) => {
    queue.testMode.jobs[0].addListener('progress', () => {
      expect(
        consoleSpy
          .calledWith('Notification job #', queue.testMode.jobs[0].id, '50% complete')
      ).to.be.true;
      done()
    });
    queue.testMode.jobs[0].emit('progress', 50);
  });

  it('should test the failed jobs', (done) => {
    queue.testMode.jobs[0].addListener('failed', () => {
      expect(consoleSpy
        .calledWith(`Notification job #${queue.testMode.jobs[0].id} failed: Failed to send`)
      ).to.be.true;
      done()
    });
    queue.testMode.jobs[0].emit('failed', new Error('Failed to send'));
  });

  it('should test the complete jobs', (done) => {
    queue.testMode.jobs[0].addListener('complete', () => {
      expect(
        consoleSpy
          .calledWith(`Notification job #${queue.testMode.jobs[0].id} completed`)
      ).to.be.true;
      done()
    });
    queue.testMode.jobs[0].emit('complete');
  });
});
