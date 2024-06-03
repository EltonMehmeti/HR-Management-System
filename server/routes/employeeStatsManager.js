const express = require('express');
const router = express.Router();
const EmployeeStatsManager = require('../controllers/employeeStatsManager');

router.get('/stats', async (req, res) => {
  try {
    const totalEmployees = await EmployeeStatsManager.totalEmployees();
    const totalTeams = await EmployeeStatsManager.totalTeams();
    const totalLeaveRequests = await EmployeeStatsManager.totalLeaveRequests();
    const averageEmployeesPerTeam = await EmployeeStatsManager.averageEmployeesPerTeam();
    const averageLeavesPerEmployee = await EmployeeStatsManager.averageLeavesPerEmployee();

    res.json({
      totalEmployees,
      totalTeams,
      totalLeaveRequests,
      averageEmployeesPerTeam,
      averageLeavesPerEmployee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
