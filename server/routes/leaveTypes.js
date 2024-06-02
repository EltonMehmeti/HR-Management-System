const express = require('express');
const router = express.Router();
const LeaveType = require('../models/leaveType'); // Assuming you have defined LeaveType model

router.get('/', async (req, res) => {
  try {
    const leaveTypes = await LeaveType.findAll();
    res.json(leaveTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// POST create a new leave type
router.post('/', async (req, res) => {
  try {
    const { name, days } = req.body;
    const newLeaveType = await LeaveType.create({ name, days });
    res.status(201).json(newLeaveType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;