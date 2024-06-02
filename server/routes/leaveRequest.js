const express = require('express');
const router = express.Router();
const leaveRequestController = require('../controllers/leaveRequest');

// Create a leave request
router.post('/', leaveRequestController.createLeaveRequest);

// Get all leave requests
router.get('/', leaveRequestController.getAllLeaveRequests);

// Get a leave request by ID
//router.get('/:id', leaveRequestController.getLeaveRequestById);

// Update a leave request
router.put('/:id', leaveRequestController.updateLeaveRequest);

// Delete a leave request
router.delete('/:id', leaveRequestController.deleteLeaveRequest);


router.get('/:employeeID', leaveRequestController.getAllLeaveRequestsEmployee);

module.exports = router;
