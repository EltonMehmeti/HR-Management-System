const Expedition = require('../models/expedition');
const Explorer = require('../models/explorer');

const getAllExpedition = async (req, res) => {
    try {
      const members = await Expedition.findAll({
        attributes: ["id", "destination", "crewSize"],
        include: {
          model: Explorer,
          attributes: ["id", "name","nationality"],
        },
      });
  
      res.json(members);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


  const createExpedition = async (req, res) => {
    const {id, destination, crewSize, explorerID } = req.body;
  
    // Validate input
    if (!destination || !crewSize || !explorerID) {
      return res.status(400).json({ error: "Missing required fields: name, role, groupId" });
    }
  
    try {
      // Check if the associated group exists
      const group = await Explorer.findByPk(explorerID);
      if (!group) {
        return res.status(404).json({ error: "Associated group not found" });
      }
  
      // Create the member
      const member = await Expedition.create({id, destination, crewSize, explorerID });
      res.status(201).json(member);
    } catch (error) {
      console.error("Error creating member:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


  const getAllExpeditionByNationality = async (req, res) => {
    try {
        const { nationality } = req.params;
        const leaveRequests = await Explorer.findAll({ where: { nationality } });
        res.json(leaveRequests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports={
    createExpedition,
    getAllExpedition,
    getAllExpeditionByNationality
}