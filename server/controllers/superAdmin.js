const SuperAdmin = require('../models/superAdmin'); // Import the SuperAdmin model
const bcrypt = require('bcrypt');

// Controller methods for superAdmin model

// Get all SuperAdmins
const getAllSuperAdmins = async (req, res) => {
    try {
        const superAdmins = await SuperAdmin.findAll(); 
        res.json(superAdmins);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get SuperAdmin by ID
const getSuperAdminById = async (req, res) => {
    const { id } = req.params;
    try {
        const superAdmin = await SuperAdmin.findByPk(id); 
        if (!superAdmin) {
            return res.status(404).json({ error: 'SuperAdmin not found' });
        }
        res.json(superAdmin);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new SuperAdmin
const createSuperAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const superAdmin = await SuperAdmin.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json(superAdmin);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a SuperAdmin
const updateSuperAdmin = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const superAdmin = await SuperAdmin.findByPk(id);
        if (!superAdmin) {
            return res.status(404).json({ error: 'SuperAdmin not found' });
        }

        // Check if password is provided, then hash it
        let hashedPassword = superAdmin.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update SuperAdmin fields
        await superAdmin.update({
            name: name || superAdmin.name,
            email: email || superAdmin.email,
            password: hashedPassword, // Update password only if provided
        });

        res.json(superAdmin);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a SuperAdmin
const deleteSuperAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const superAdmin = await SuperAdmin.findByPk(id);
        if (!superAdmin) {
            return res.status(404).json({ error: 'SuperAdmin not found' });
        }
        await SuperAdmin.destroy({ where: { id } });
        res.json({ message: 'SuperAdmin deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllSuperAdmins,
    getSuperAdminById,
    createSuperAdmin,
    updateSuperAdmin,
    deleteSuperAdmin,
};
