const Member = require('../models/member');
const Group = require('../models/group');

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll({
      attributes: ["id", "name", "role"],
      include: {
        model: Group,
        attributes: ["id", "name"],
      },
    });

    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createMember = async (req, res) => {
    const {id, name, role, groupId } = req.body;
  
    // Validate input
    if (!name || !role || !groupId) {
      return res.status(400).json({ error: "Missing required fields: name, role, groupId" });
    }
  
    try {
      // Check if the associated group exists
      const group = await Group.findByPk(groupId);
      if (!group) {
        return res.status(404).json({ error: "Associated group not found" });
      }
  
      // Create the member
      const member = await Member.create({id, name, role, groupId });
      res.status(201).json(member);
    } catch (error) {
      console.error("Error creating member:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

const deleteMember = async (req, res) => {
  const { memberID } = req.params;

  try {
    const doc = await Member.findByPk(memberID);
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    await doc.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMembers,
  createMember,
  deleteMember
};
