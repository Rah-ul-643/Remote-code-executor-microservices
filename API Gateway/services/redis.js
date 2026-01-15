const { createClient } = require("redis");

const REDIS_URL = process.env.REDIS_SERVER_URL || 'redis://localhost:6379';

const createRedisClient = async () => {
        try {
                const client = createClient({
                        url: REDIS_URL,
                });
                await client.connect();
                console.log("Connected to Redis server successfully");
                return client;
        }
        catch (error) {
                console.log("Error connecting to redis server");
                throw error;
        }
}

const publishJobToQueue = async (requestObject, redis, job_stream) => {
        try {
                const response = await redis.xAdd(
                        job_stream,
                        '*',
                        requestObject
                )
                console.log("Job with id", requestObject.requestId, "published to Redis Stream Queue");
                console.log(response);
                return response;
                
        } catch (error) {
                console.log("Error publishing job to redis");
                throw error;
        }
}

module.exports = {createRedisClient, publishJobToQueue};