const crypto = require('crypto');
const checkCodeSanity = require('./codeValidation');

const { publishJobToQueue } = require('../services/redis');
const { saveRequestToDB } = require('../services/database');

const STEREAM_NAME = "code_execution_jobs";

const handleCodeExecution = async (req, res) => {

        // 1. code validation and sanitization
        // 2. create request object
        // 3. save request to DB.
        // 4. publish request to job queue.

        try {
                console.log("Code execution request received for user:", req.username);

                if (! checkRequestValidity(req)){
                        console.log("Invalid request format");
                        return res.status(400).json({
                                error: "Invalid request format",
                        });
                }

                const submissionId = req.body.submissionId;
                const language = req.body.language;
                const code = req.body.code;
                const input = req.body.input || "";

                const result = checkCodeSanity(code, language);

                if (!result){
                        console.log("Code validation failed, malicious content detected");
                        return res.status(405).json("Code contains malicious content");
                }

                const requestObject = {
                        requestId: generateRequestId(req.username),
                        clientSubmissionId: submissionId,
                        username: req.username,
                        language: language,
                        code: code,
                        input: input,
                };

                console.log("Request Object:", requestObject);

                // saving to DB.

                await saveRequestToDB(requestObject);

                // publish to job queue

                const redis = req.app.locals.redis;
                await publishJobToQueue(requestObject, redis, STEREAM_NAME);
                
                
                return res.status(200).json({
                        message: "Code submission received, processing started",
                });
        } 
        catch (error) {
                console.error("Error handling code execution request:", error);
                return res.status(500).json({
                        error: "Internal server error",
                });
        }

}


const checkRequestValidity = (req) => {
        if (!req.body.submissionId || !req.body.language || !req.body.code) {
                return false;
        }
        
        const languageOptions = ['python', 'java', 'cpp', 'c'];
        if (!languageOptions.includes(req.body.language)) {
                return false;
        }

        if (typeof req.body.submissionId !== 'string' || typeof req.body.language !== 'string' || typeof req.body.code !== 'string') {
                return false;
        }

        return true;
}

const generateRequestId = (username) => {
        // return Request ID -> string of length 68.
        
        const str = username + '_' + Date.now();
        const hashString = crypto.createHash("sha256").update(str).digest("hex");
        return 'req_' + hashString;
}


module.exports = handleCodeExecution;