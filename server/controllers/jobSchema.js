const Job = require('../models/jobSchema');

// Create a new job

exports.createJob = async (req, res) => {
    try {
        

        // Create a new job instance
        const newJob = await Job.create({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            salary: req.body.salary,
            requirements: req.body.requirements,
        });

        // Respond with the newly created job
        res.status(201).json(newJob);
    } catch (error) {
        // If an error occurs, respond with an error message
        res.status(500).json({ error: error.message });
    }
};


// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a job by ID
exports.updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a job by ID
exports.deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
