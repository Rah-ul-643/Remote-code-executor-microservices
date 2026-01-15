const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const {connectDB} = require('./services/database');
const {createRedisClient} = require("./services/redis");

const auth = require("./middlewares/auth");

const handleAuth = require("./handlers/authHandler");
const handleCodeExecution = require("./handlers/codeHandler");

const app = express();
const PORT  = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3001';

const CORS_OPTIONS = {
        origin: CLIENT_URL,
        methods: ['GET', 'POST'],
        credentials: true, // Allow cookies to be sent
        allowedHeaders: ['Content-Type', 'Authorization'], 
}

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// TODO: implement rate limiting.

app.use('/auth', handleAuth);
app.post('/code', auth, handleCodeExecution);

(async () => {
        try {
                await connectDB();
                const redisClient = await createRedisClient();
                app.locals.redis = redisClient;

                app.listen(PORT, () => {
                        console.log(`Server is running on port ${PORT}`);
                });

        } catch (error) {
                console.log("Failed to start server");
                console.log(error);
                process.exit(1);
        }
})();