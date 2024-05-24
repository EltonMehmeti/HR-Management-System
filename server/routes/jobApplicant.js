const express = require('express');
const router = express.Router();
const jobApplicantController = require('../controllers/jobApplicant');
const multerMiddleware = require('../middleware/multer'); 

router.post('/post', multerMiddleware.uploadFile, jobApplicantController.createJobApplicant);

router.put('/update/:_id', multerMiddleware.uploadFile, jobApplicantController.updateJobApplicantById);

router.get('/get', jobApplicantController.getAllJobApplicants);

router.get('/get/:_id', jobApplicantController.getJobApplicantById);

router.delete('/delete/:_id', jobApplicantController.deleteJobApplicantById);

module.exports = router;
