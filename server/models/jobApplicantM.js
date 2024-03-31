// jobApplicant.js

const mongoose = require('mongoose');

const jobApplicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: String,
    resume: String,
    jobTitle: String
});

const JobApplicant = mongoose.model('JobApplicant', jobApplicantSchema);

module.exports = JobApplicant;
