const JobApplicant = require('../models/jobApplicant');

const createJobApplicant = async (req, res) => {
    try {
        const { name, email, phone, resume, jobTitle } = req.body;
        const jobApplicant = await JobApplicant.create({ name, email, phone, resume, jobTitle });
        res.status(201).json(jobApplicant);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllJobApplicants = async (req, res) => {
    try {
        const jobApplicants = await JobApplicant.findAll();
        res.json(jobApplicants);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getJobApplicantById = async (req, res) => {
    try {
        const { id } = req.params;
        const jobApplicant = await JobApplicant.findByPk(id);
        if (!jobApplicant) {
            return res.status(404).json({ error: 'Job applicant not found' });
        }
        res.json(jobApplicant);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateJobApplicant = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, resume, jobTitle } = req.body;
        const updatedJobApplicant = await JobApplicant.update(
            { name, email, phone, resume, jobTitle },
            { where: { id } }
        );
        res.json(updatedJobApplicant);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteJobApplicant = async (req, res) => {
    try {
        const { id } = req.params;
        await JobApplicant.destroy({ where: { id } });
        res.json({ message: 'Job applicant deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createJobApplicant,
    getAllJobApplicants,
    getJobApplicantById,
    updateJobApplicant,
    deleteJobApplicant
};
