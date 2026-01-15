const { createClient } = require("redis");
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const { fetchSubmissionHistory, fetchResultById } = require("./database");

const EVENT_NAME = "execution_events";

const createRedisSubscriber = async () => {
        try {
                const subscriber = createClient({
                        url: REDIS_URL || "redis://localhost:6379",
                });
                await subscriber.connect();
                console.log("Connected to Redis server successfully");
                return subscriber;
        } 
        catch (error) {
                console.log("Error connecting to redis server");
                throw error;
        }
}

const subscribeToResults = async (redisSubscriber, io) => {

        await redisSubscriber.subscribe(EVENT_NAME, async (message) => {
                try {
                        const event = JSON.parse(message);

                        if (event.event !== "EXECUTION_COMPLETED") return;

                        const { resultId, username } = event;

                        // Fetch submission details from database
                        const Result = await fetchResultById(resultId);

                        // Fetch updated submission history
                        const submissionHistory = await fetchSubmissionHistory(username);

                        // Find user socket
                        const socketId = userToSocket.get(username);

                        if (!socketId) {
                                console.log("User not connected, skipping socket emit");
                                return;
                        }

                        // Emit execution result update
                        io.to(socketId).emit("execution-result", Result);

                        // Send updated submission history
                        io.to(socketId).emit("set-submission-history", submissionHistory);
                        
                        console.log("Emitted execution result and updated submission history to user:", username);

                } catch (err) {
                        console.error("Error handling execution event:");
                        throw err;
                }
        });
};

module.exports = {createRedisSubscriber, subscribeToResults};
