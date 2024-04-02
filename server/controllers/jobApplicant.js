
const JobApplicant = require('../models/jobApplicant');

exports.createJobApplicant = async (req, res) => {
    try {
        const jobApplicant = await JobApplicant.create(req.body);
        res.status(201).json(jobApplicant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllJobApplicants = async (req, res) => {
    try {
        const jobApplicants = await JobApplicant.find();
        res.status(200).json(jobApplicants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJobApplicantById = async (req, res) => {
    const { id } = req.params;
    try {
        const jobApplicant = await JobApplicant.findById(id);
        if (jobApplicant) {
            res.status(200).json(jobApplicant);
        } else {
            res.status(404).json({ message: 'Job applicant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateJobApplicantById = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedJobApplicant = await JobApplicant.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedJobApplicant) {
            res.status(200).json(updatedJobApplicant);
        } else {
            res.status(404).json({ message: 'Job applicant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteJobApplicantById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedJobApplicant = await JobApplicant.findByIdAndDelete(id);
        if (deletedJobApplicant) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Job applicant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
