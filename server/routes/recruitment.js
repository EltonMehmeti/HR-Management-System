const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitment');
const {uploadFile} = require('../middleware/multer');
router.post('/', recruitmentController.createInterviewe);
router.post('/interviews/:recruiterId', recruitmentController.getInterviewsByRecruiterId);
router.get('/interviews/getAll',recruitmentController.getAllInterviews);
router.put('/interviews/:interviewId', recruitmentController.editInterviewStatus);
router.post('/interviewee/jobOffer',uploadFile, recruitmentController.jobOffer )
module.exports = router;
