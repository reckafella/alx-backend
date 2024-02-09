import kue from 'kue';

const queue = kue.createQueue();

const jobData = {
  phoneNumber: '4153518780',
  message: 'This is the code to verify your account',
}

const job = queue.create('push_notification_code', jobData);

job
  .on('complete', (_job) => console.log('Notification job completed'))
  .on('failed', (_job) => console.log('Notification job failed'))
  .save((error) => {
    if (!error) {
      console.log(`Notification job created: ${job.id}`);
    }
  });
