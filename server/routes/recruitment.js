const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitment');
const {uploadFile2} = require('../middleware/multer');

router.post('/', recruitmentController.createInterviewe);
router.post('/interviews/:recruiterId', recruitmentController.getInterviewsByRecruiterId);
router.get('/interviews/getAll',recruitmentController.getAllInterviews);
router.put('/interviews/:interviewId', recruitmentController.editInterviewStatus);
router.post('/interviewee/jobOffer',uploadFile2, recruitmentController.jobOffer )
module.exports = router;
