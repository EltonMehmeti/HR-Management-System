const Employee = require('../models/employee');
const bcrypt = require('bcrypt')
// Controller methods for employee model
const path = require('path'); 
const fs = require('fs');

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll(); 
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id); 
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new employee
const createEmployee = async (req, res) => {
    const { name, email, phone, teamId, salary, password } = req.body;
    const imagePath = req.file.path;

    // Check if file was uploaded
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const employee = await Employee.create({
            name,
            email,
            password: hashedPassword,
            phone,
            teamId,
            salary,
            image: imagePath,
        });
        res.status(201).json(employee);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an employee
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, teamId, salary, password } = req.body; // Include password here if needed
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Check if password is included and hash it
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update employee fields
        await employee.update({
            name: name || employee.name,
            email: email || employee.email,
            phone: phone || employee.phone,
            teamId: teamId || employee.teamId,
            salary: salary || employee.salary,
            password: hashedPassword || employee.password, // Update password only if provided
        });

        res.json(employee);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Delete an employee
const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEmployee = await Employee.findByPk(id);
        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        await Employee.destroy({ where: { id } });
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
