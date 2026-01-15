const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const {connectDB} = require('./services/database');

const { loginController, registerController, validateToken } = require('./controller/authHandler');

const app = express();
const PORT  = process.env.PORT || 5000;
const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost:3000';

const CORS_OPTIONS = {
        origin: API_GATEWAY_URL,
        methods: ['GET', 'POST'],
        credentials: true, // Allow cookies to be sent
        allowedHeaders: ['Content-Type', 'Authorization'], 
}

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/auth/login', loginController);
app.post('/auth/register', registerController);
app.get('/auth/validate', validateToken);

(async () => {
        try {
                await connectDB();

                app.listen(PORT, () => {
                        console.log(`Server is running on port ${PORT}`);
                });

        } catch (error) {
                console.log("Failed to start server");
                console.log(error);
                process.exit(1);
        }
})();