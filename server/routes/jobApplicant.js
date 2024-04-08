
const express = require('express');
const router = express.Router();
const jobApplicantController = require('../controllers/jobApplicant');


router.post('/post', jobApplicantController.createJobApplicant);

router.get('/get', jobApplicantController.getAllJobApplicants);

router.get('/get/:_id', jobApplicantController.getJobApplicantById);

router.put('/update/:_id', jobApplicantController.updateJobApplicantById);

router.delete('/delete/:_id', jobApplicantController.deleteJobApplicantById);

module.exports = router;
