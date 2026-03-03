const rateLimit = require("express-rate-limit");
const {RedisStore} = require("rate-limit-redis");

const createRateLimiter = (redisClient) => {
        return rateLimit({
            store: new RedisStore({
                sendCommand: (...args) => redisClient.sendCommand(args),
            }),

            windowMs: 60 * 1000, // 1 minute
            max: 10, // 10 requests per minute per user

            keyGenerator: (req) => {
                if (req.username) {
                    return `rate_limit:${req.username}`;
                }

                // fallback to IP if not authenticated (login/registration routes)
                return req.ip;
            },

            standardHeaders: true,
            legacyHeaders: false,

            message: {
                success: false,
                message: "Too many requests, please try again later.",
            }
        });
}

module.exports = createRateLimiter;
