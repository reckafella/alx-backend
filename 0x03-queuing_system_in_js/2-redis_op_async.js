import util from 'util';
import redis from 'redis';

const client = redis.createClient();

client.on('error', (error) => console.log(`Redis client not connected to the server: ${error}`));

client.on('connect', () => console.log('Redis client connected to the server'));

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {
  const get = util.promisify(client.get).bind(client);

  await get(schoolName)
    .then((reply) => console.log(`${reply}`))
    .catch((error) => { throw error });
}

// test calls
async function testCalls() {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}

testCalls();
