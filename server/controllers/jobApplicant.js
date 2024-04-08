
const JobApplicant = require('../models/jobApplicant');

const createJobApplicant = async (req, res) => {
    try {
        const jobApplicant = await JobApplicant.create(req.body);
        res.status(201).json(jobApplicant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllJobApplicants = async (req, res) => {
    try {
        const jobApplicants = await JobApplicant.find();
        res.status(200).json(jobApplicants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getJobApplicantById = async (req, res) => {
    const { _id } = req.params;
    try {
        const jobApplicant = await JobApplicant.findById(_id);
        if (jobApplicant) {
            res.status(200).json(jobApplicant);
        } else {
            res.status(404).json({ message: 'Job applicant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateJobApplicantById = async (req, res) => {
    const { _id } = req.params;
    try {
        const updatedJobApplicant = await JobApplicant.findByIdAndUpdate(_id, req.body, { new: true });
        if (updatedJobApplicant) {
            res.status(200).json(updatedJobApplicant);
        } else {
            res.status(404).json({ message: 'Job applicant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteJobApplicantById = async (req, res) => {
    const { _id } = req.params;
    try {
        const deletedJobApplicant = await JobApplicant.findByIdAndDelete(_id);
        if (deletedJobApplicant) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Job applicant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={
    createJobApplicant,
    getAllJobApplicants,
    getJobApplicantById,
    updateJobApplicantById,
    deleteJobApplicantById,
}