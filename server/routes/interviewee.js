const express = require('express');
const router = express.Router();
const IntervieweeController = require('../controllers/interviewee');
const authorizeRole = require('../middleware/authorizeRole');


router.post('/', authorizeRole(['recruiter']), IntervieweeController.createInterviewee);

router.get('/', authorizeRole(['recruiter']), IntervieweeController.getAllInterviewees);

router.get('/:id', authorizeRole(['recruiter']), IntervieweeController.getIntervieweeById);

router.put('/:id', authorizeRole(['recruiter']), IntervieweeController.updateInterviewee);

router.delete('/:id', authorizeRole(['recruiter']), IntervieweeController.deleteInterviewee);

module.exports = router;
