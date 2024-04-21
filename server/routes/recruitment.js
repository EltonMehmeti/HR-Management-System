const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitment');

router.post('/', recruitmentController.createInterviewe);
router.post('/interviews/:recruiterId', recruitmentController.getInterviewsByRecruiterId);
router.put('/interviews/:interviewId', recruitmentController.editInterviewStatus);
module.exports = router;
