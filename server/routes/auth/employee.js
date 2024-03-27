const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../../models/employee');
const generateToken = require('../../helper/generateToken');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, salary } = req.body;

        const existingEmployee = await Employee.findOne({ where: { email } });
        
        if (existingEmployee) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const employee = await Employee.create({
            name,
            email,
            password: hashedPassword,
            phone,
            salary
        });

        const token = generateToken(employee.id);

        res.status(201).json({ token, employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const employee = await Employee.findOne({ where: { email } });
        if (!employee) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, employee.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(employee.id);

        res.status(200).json({ token, employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
