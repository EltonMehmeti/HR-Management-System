const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Employee = require('../../models/employee');
const generateToken = require('../../helper/generateToken');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const employee = await Employee.findOne({ where: { email } });
        if (!employee) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, employee.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        
        const employeeData = {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            role: 'employee',
        };

        const token = generateToken(employeeData);

        res.status(200).json({ token, employee: employeeData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
