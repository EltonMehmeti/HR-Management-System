const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job');

// Route for creating a new job
router.post('/', jobController.createJob);

// Route for getting all jobs
router.get('/', jobController.getAllJobs);

// Route for getting a single job by ID
router.get('/:id', jobController.getJobById);

// Route for updating a job by ID
router.put('/:id', jobController.updateJob);

// Route for deleting a job by ID
router.delete('/:id', jobController.deleteJob);

module.exports = router;
