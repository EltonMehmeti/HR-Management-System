
const express = require('express');
const router = express.Router();
const jobApplicantController = require('../controllers/jobApplicant');


router.post('/', jobApplicantController.createJobApplicant);

router.get('/', jobApplicantController.getAllJobApplicants);

router.get('/:id', jobApplicantController.getJobApplicantById);

router.put('/:id', jobApplicantController.updateJobApplicantById);

router.delete('/:id', jobApplicantController.deleteJobApplicantById);

module.exports = router;
