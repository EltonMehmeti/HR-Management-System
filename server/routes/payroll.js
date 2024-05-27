const express = require('express');
const router = express.Router();
const { uploadSalaryFile } = require('../middleware/multer');
const payrollController = require('../controllers/payroll');

router.post('/upload', uploadSalaryFile, payrollController.insertSalaryDataFromExcel);
router.get('/analytics', payrollController.getPayrollAnalytics);
router.get('/overview',  payrollController.getPayrollOverview);
router.get('/top-earners', payrollController.getTopEarners);
router.get('/top-teams', payrollController.getTopPayingTeams);

module.exports = router;
