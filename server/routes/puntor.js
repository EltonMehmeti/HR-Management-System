const express = require('express');
const router = express.Router();
const puntorController = require('../controllers/puntor');

// Create a leave request
router.post('/', puntorController.createEmployee);

// Get all leave requests
router.get('/', puntorController.getAllEmployees);


module.exports = router;
