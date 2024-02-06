import kue from 'kue';

const push_notification_code = kue.createQueue();

const jobData = {
  phoneNumber: 'string',
  message: 'string',
}

const job = push_notification_code.create('push notification code', jobData).save((error) => {
  if (!error) {
    console.log(`Notification job created: ${job.id}`);
  }
});

push_notification_code.on('complete', (job) => console.log('Notification job completed'));
push_notification_code.on('failed', (job) => console.log('Notification job failed'));
