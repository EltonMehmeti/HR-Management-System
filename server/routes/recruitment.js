const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitment');

router.post('/', recruitmentController.createInterviewe);

module.exports = router;
