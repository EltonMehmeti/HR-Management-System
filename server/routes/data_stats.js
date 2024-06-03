const express = require('express');
const router = express.Router();
const dataManager_Stats = require('../controllers/dataManager_Stats');

router.get('/stats', async (req, res) => {
  try {
    const totalEmployees = await dataManager_Stats.totalEmployees();
    const totalLeaves = await dataManager_Stats.totalLeaves();
    const totalPayments = await dataManager_Stats.totalPayments();
    const totalTeams = await dataManager_Stats.totalTeams();
    const totalDocs = await dataManager_Stats.totalDocs();
    const averagePayment = await dataManager_Stats.averagePayment();

    res.json({
      totalEmployees,
      totalLeaves,
      totalPayments,
      totalTeams,
      totalDocs,
      averagePayment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
