const mongoose = require('mongoose');
const Result = require('../models/Results');
const Request = require('../models/Requests');

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

const fetchSubmissionHistory = async (username) => {
        try {
                // Find all requests for this username
                const requests = await Request.find({ username: username });

                if (requests.length === 0) {
                        return [];
                }
                
                // Get all RequestIds
                const requestIds = requests.map(req => req.requestId);
                
                // Find all results for these requests
                const results = await Result.find({ requestId: { $in: requestIds } });
                
                console.log("Fetched requests and results for user:", username);

                // Combine requests with their results
                const submissionResults = requests.map(request => {
                        const result = results.find(r => r.requestId === request.requestId);
                        return {
                                clientSubmissionId: request.clientSubmissionId,
                                username: request.username,
                                status: result?.status || "pending",
                                stdout: result?.stdout || null,
                                stderr: result?.stderr || null,
                                error: result?.error || null,
                        };
                });

                return submissionResults;

        } catch (error) {
                console.error('Error fetching submissions:', error);
                throw error;
        }
};

const fetchResultById = async (resultId) => {
        try {
                const result = await Result.findOne({ resultId: resultId });
                console.log("Fetched result with ID:", resultId);
                
                return result;
                
        } catch (error) {
                console.error('Error fetching result by ID:', error);
                throw error;
        }
};

module.exports = { connectDB, fetchSubmissionHistory, fetchResultById };