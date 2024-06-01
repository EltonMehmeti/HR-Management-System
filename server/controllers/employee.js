const Employee = require('../models/employee');
const bcrypt = require('bcrypt')
const axios = require('axios');
require('dotenv').config();
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll(); 
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

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
const createEmployee = async (req, res) => {
    const { name, email, phone, teamId, salary, password, reportsTo } = req.body;
    const imagePath = req.file ? req.file.path : null;

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    let reportsToValue = null;
    if (reportsTo !== undefined && reportsTo !== null && !isNaN(reportsTo)) {
        reportsToValue = Number(reportsTo);
    }
    console.log(reportsToValue);
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const employee = await Employee.create({
            name,
            email,
            password: hashedPassword,
            phone,
            teamId,
            reportsTo: reportsToValue,
            salary,
            image: imagePath,
        });

        const response = await axios.post("https://api.chatengine.io/users/", {
            username: name,
            first_name: employee.email,
            last_name: name, 
            secret: employee.name + "123", 
        }, {
            headers: {
                'PRIVATE-KEY': process.env.PRIVATE_KEY
            }
        });

        console.log(response.data); // Log the response data from ChatEngine

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
        const response = await axios.delete(`https://api.chatengine.io/users/${id}/`, {
            headers: {
                'PRIVATE-KEY': process.env.PRIVATE_KEY
            }
        });
        console.log(response.data); // Log the response data from ChatEngine
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
