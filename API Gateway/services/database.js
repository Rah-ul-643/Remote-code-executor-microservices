const mongoose = require('mongoose');

const Request = require('../models/Requests');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to Database successfully");

    } catch (error) {
        console.log("Error connecting to Database");
        throw error;
    }
}

const saveRequestToDB = async (requestObject) => {
    try {
        const newRequest = new Request({
            RequestId: requestObject.requestId,
            clientSubmissionId: requestObject.clientSubmissionId,
            username: requestObject.username,
            language: requestObject.language,
        });

        await newRequest.save();
        console.log("Request:", requestObject.requestId, "saved to DB successfully");
    }
    catch (error) {
        throw error;
    }
}

module.exports = { connectDB, saveRequestToDB };