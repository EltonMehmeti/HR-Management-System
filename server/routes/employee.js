const express = require('express');
const employeeController = require('../controllers/employee');

const router = express.Router();

router.get('/', employeeController.getAllEmployees);

router.get('/:id', employeeController.getEmployeeById);

router.post('/', employeeController.createEmployee);

router.put('/:id', employeeController.updateEmployee);

router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;