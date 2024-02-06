import redis from 'redis';

const client = redis.createClient();

client.on('error', (error) => console.log(`Redis client not connected to the server: ${error}`));

client.on('connect', () => console.log('Redis client connected to the server'));

const HolbertonSchools = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2,
}

Object.entries(HolbertonSchools).forEach(([key, value]) => {
  client.HSET('HolbertonSchools', key, value, redis.print);
});

client.HGETALL('HolbertonSchools', (_error, result) => {
  console.log(result);
});
