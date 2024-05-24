const Employee = require('../models/employee');

const getOrg = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            attributes: ['id', 'name', 'reportsTo', 'image']
        }); 
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {getOrg};
