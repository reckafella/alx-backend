import redis from 'redis';

const subscriber = redis.createClient();

subscriber.on('error', (error) => console.log(`Redis client not connected to the server: ${error}`));

subscriber.on('connect', () => console.log('Redis client connected to the server'));

const channel = 'holberton school channel';

subscriber.subscribe(channel);

subscriber.on('message', (channel, message) => {
  console.log(message);

  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe(channel);
    subscriber.quit();
  }
});
