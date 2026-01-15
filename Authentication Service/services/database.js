const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL || "";

const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("Connected to Database successfully");

    } catch (error) {
        console.log("Error connecting to Database");
        throw error;
    }
}

module.exports = { connectDB };