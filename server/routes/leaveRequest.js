const express = require('express');
const router = express.Router();
const leaveRequestController = require('../controllers/leaveRequest');

// Create a leave request
router.post('/', leaveRequestController.createLeaveRequest);

// Get all leave requests
router.get('/', leaveRequestController.getAllLeaveRequests);

// Delete a leave request
router.delete('/:id', leaveRequestController.deleteLeaveRequest);

router.get('/:employeeID', leaveRequestController.getAllLeaveRequestsEmployee);

router.put('/:id/status', leaveRequestController.updateLeaveRequestStatus);

module.exports = router;
