const Employee = require('../models/employee');

// Controller methods for employee model

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
    console.log(req.body);
    const { name, email, phone, teamId, salary } = req.body; 
    try {
        const employee = await Employee.create({ name, email, phone, teamId, salary }); 
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an employee
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, teamId, salary } = req.body; 
    try {
        const [updated] = await Employee.update(
            { name, email, phone, teamId, salary }, 
            { where: { id } }
        );
        if (!updated) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        const updatedEmployee = await Employee.findByPk(id);
        res.json(updatedEmployee);
    } catch (error) {
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
