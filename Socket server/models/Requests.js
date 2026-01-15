const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestSchema = new Schema({

    requestId: { type: String, required: true, unique: true },
    clientSubmissionId: { type: String, required: true },
    username: { type: String, required: true },
    language: { type: String, required: true },

}, {timestamps: true});

module.exports = mongoose.model('Request', requestSchema);
