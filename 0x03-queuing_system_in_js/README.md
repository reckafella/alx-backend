# **0x03. Queuing System in JS**

## **Resources**

**Read or watch:**

* **[Redis quick start](https://redis.io/docs/install/install-redis/)**
* **[Redis client interface](https://redis.io/docs/connect/cli/)**
* **[Redis client for Node JS](https://github.com/redis/node-redis)**
* **[Kue deprecated but still use in the industry](https://github.com/Automattic/kue)**

## **Requirements**

* All of your code will be compiled/interpreted on `Ubuntu 18.04`, `Node 12.x`, and `Redis 5.0.7`
* All of your files should end with a new line
* A `README.md` file, at the root of the folder of the project, is mandatory
* Your code should use the `js` extension

## **Tasks**

**[0. Install a redis instance](./dump.rdb)**

Download, extract, and compile the latest stable Redis version (higher than 5.0.7 - <https://redis.io/download/>):

> ```?
> $ wget https://download.redis.io/releases/redis-6.0.10.tar.gz
>
> $ tar xzf redis-6.0.10.tar.gz
>
> $ cd redis-6.0.10
>
> $ make
> ```
>

Start Redis in the background with src/redis-server

> ```?
> $ src/redis-server &
> ```

Make sure that the server is working with a ping `src/redis-cli ping`

>```?
> PONG

Using the Redis client again, set the value School for the key Holberton

> ```?
>127.0.0.1:[Port]> set Holberton School
>OK
>127.0.0.1:[Port]> get Holberton
>"School"
>

Kill the server with the process id of the redis-server (hint: use ps and grep)

>```?
> $ kill [PID_OF_Redis_Server]

Copy the `dump.rdb` from the `redis-5.0.7` directory into the root of the Queuing project.

Requirements:

Running get `Holberton` in the client, should return `School`

**[1. Node Redis Client](./0-redis_op.js)**

Install `node_redis` using `npm` [optionally: run `sudo apt install node-redis` ]

Using `Babel` and `ES6`, write a script named `0-redis_client.js`. It should connect to the Redis server running on your machine:

* It should log to the console the message `Redis client connected to the server` when the connection to Redis works correctly
* It should log to the console the message `Redis client not connected to the server: ERROR_MESSAGE` when the connection to Redis does not work

Requirements:

* To import the library, you need to use the keyword import

**[2. Node Redis client and basic operations](./1-redis_op.js)**

In a file [1-redis_op.js](./1-redis_op.js), copy the code you previously wrote ([0-redis_client.js](./0-redis_client.js)).

Add two functions:

* `setNewSchool`:
  * It accepts two arguments `schoolName`, and `value`.
  * It should set in Redis the value for the key `schoolName`
  * It should display a confirmation message using `redis.print`

* `displaySchoolValue`:
  * It accepts one argument `schoolName`.
  * It should log to the console the value for the key passed as argument

At the end of the file, call:

* `displaySchoolValue('Holberton');`
* `setNewSchool('HolbertonSanFrancisco', '100');`
* `displaySchoolValue('HolbertonSanFrancisco');`

Requirements:

* Use callbacks for any of the operation, we will look at async operations later
