function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }
  jobs.forEach((data) => {
    const job = queue.create('push_notification_code_3', data);

    job
      .on('complete', () => {
        console.log(`Notification job #${job.id} completed`);
      })
      .on('failed', (error) => {
        const err = error.message || error.toString();
        console.log(`Notification job #${job.id} failed: ${err}`);
      })
      .on('progress', (progress, _data) => {
        console.log(`Notification job #${job.id} ${progress}% complete`)
      })
      .save((error) => {
        if (!error) {
          console.log(`Notification job created: ${job.id}`);
        }
      });
  });
}

export default createPushNotificationsJobs;
