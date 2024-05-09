const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitment');

router.post('/', recruitmentController.createInterviewe);
router.post('/interviews/:recruiterId', recruitmentController.getInterviewsByRecruiterId);
router.put('/interviews/:interviewId', recruitmentController.editInterviewStatus);
router.post('/interviewee/jobOffer', recruitmentController.jobOffer )
module.exports = router;
