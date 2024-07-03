const { Op } = require('sequelize');
const Contract = require('../models/contract');

const createContract = async (req, res, next) => {
    const { name, startDate, puntorID } = req.body;
    try {
      const newContract = await Contract.create({
        name,
        startDate,
        puntorID,
      });
      res.status(201).json(newContract);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 

 const getAllContracts = async (req, res) => {
    try {
      const contracts = await Contract.findAll();
      res.status(200).json(contracts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getContractsByPuntorId = async (req, res) => {
    const { puntorID } = req.params;
    try {
      const contracts = await Contract.findAll({ where: { puntorID } });
      if (contracts.length === 0) {
        return res.status(404).json({ message: 'No contracts found for the specified Puntor ID' });
      }
      res.status(200).json(contracts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getContractsByStartDate = async (req, res) => {
    const { startDate } = req.params;
    try {
      const contracts = await Contract.findAll({ where: { startDate: { [Op.eq]: startDate } } });
      if (contracts.length === 0) {
        return res.status(404).json({ message: 'No contracts found for the specified start date' });
      }
      res.status(200).json(contracts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateContract = async (req, res) => {
    const { id } = req.params;
    const { name, startDate, puntorID } = req.body;
    try {
      const contract = await Contract.findByPk(id);
      if (!contract) {
        return res.status(404).json({ message: 'Contract not found' });
      }
      contract.name = name;
      contract.startDate = startDate;
      contract.puntorID = puntorID;
      await contract.save();
      res.status(200).json(contract);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports={
    getAllContracts,
    getContractsByPuntorId,
    getContractsByStartDate,
    updateContract,
    createContract
  }