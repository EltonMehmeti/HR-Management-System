const express = require('express');
const router = express.Router();
const jobApplicantController = require('../controllers/jobApplicant');
const authorizeRole = require('../middleware/authorizeRole');
router.post('/', authorizeRole(['recruiter']), jobApplicantController.createJobApplicant);

router.get('/', authorizeRole(['recruiter']), jobApplicantController.getAllJobApplicants);

router.get('/:id', authorizeRole(['recruiter']), jobApplicantController.getJobApplicantById);

router.put('/:id', authorizeRole(['recruiter']), jobApplicantController.updateJobApplicant);

router.delete('/:id', authorizeRole(['recruiter']), jobApplicantController.deleteJobApplicant);

module.exports = router;
