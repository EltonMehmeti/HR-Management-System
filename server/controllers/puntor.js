const Puntor = require('../models/puntor');

const createEmployee = async (req, res) => {
    const { name, isActive } = req.body;
    try {
      await Puntor.create({ name, isActive });
      res.status(201).send('Employee added successfully');
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  const getAllEmployees = async (req, res) => {
    try {
      const employees = await Puntor.findAll();
      res.send(employees);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  module.exports = {
    createEmployee,
    getAllEmployees
  }