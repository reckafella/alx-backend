import redis from 'redis';

const client = redis.createClient();

client.on('error', (error) => console.log(`Redis client not connected to the server: ${error}`));
client.on('connect', () => console.log('Redis client connected to the server'));

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

function displaySchoolValue(schoolName) {
  client.get(schoolName, (_err, reply) => {
    if (_err) throw _err;
    console.log(`${reply}`)
  });
}

// test calls
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
