const express = require('express');
const router = express.Router();
const SuperAdminModel = require('../../models/superAdmin');
const generateToken = require('../../helper/generateToken');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const superAdmin = await SuperAdminModel.findOne({ where: { email } });
        if (!superAdmin) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        if (password !== superAdmin.password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        } else {
            console.log("Password matched");
            superAdmin.role = "admin";
            const token = generateToken(superAdmin);
            
            res.status(200).json({ token, superAdmin });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
