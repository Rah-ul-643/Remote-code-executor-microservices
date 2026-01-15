const mongoose = require("mongoose");
const { Schema } = mongoose;

const resultSchema = new Schema({
        resultId: { type: String, required: true, unique: true },
        requestId: { type: String, required: true },

        status: { type: String, required: true },

        stdout: { type: String },
        stderr: { type: String },
        error: { type: String },
        
},{ timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model("Result", resultSchema);
