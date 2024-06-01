const Team = require("../models/team")
const Employee = require("../models/employee")
const axios  = require("axios")
require("dotenv").config()

//Get all Teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: [
        {
          model: Employee,
          as: "teamLeader",
          attributes: ["name"],
        },
      ],
    })

    res.json(teams)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" })
  }
}

//Get Team By Id
const getTeamById = async (req, res) => {
  const { id } = req.params
  try {
    const team = await Team.findByPk(id, {
      include: [
        {
          model: Employee,
          as: "teamLeader",
          attributes: ["name"],
        },
      ],
    })
    if (!team) {
      return res.status(404).json({ error: "Team not found" })
    }
    res.json(team)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

const createTeam = async (req, res) => {
  console.log(req.body);
  const { name, description, leaderId } = req.body;
  
  try {
    const team = await Team.create({ name, description, leaderId });

    const employee = await Employee.findByPk(leaderId);
    if (!employee) {
      return res.status(404).json({ error: "Leader not found" });
    }
    console.log(process.env.PROJECT_ID);

    try {
      const response = await axios.post('https://api.chatengine.io/chats/', 
        {
          title: team.name,
          is_direct_chat: false
        },
        {
          headers: {
            'Project-ID': process.env.PROJECT_ID,
            'User-Name': employee.name,
            'User-Secret': employee.name + '123'  
          }
        }
      );


      console.log(response.data);
    } catch (error) {
      console.error('Error creating chat team:', error);
      return res.status(500).json({ error: "Error creating chat team" });
    }

    res.status(201).json(team);
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Update a Team
const updateTeam = async (req, res) => {
  const { id } = req.params
  const { name, description, leaderId } = req.body
  try {
    const [updated] = await Team.update(
      { name, description, leaderId },
      { where: { id } }
    )
    if (!updated) {
      return res.status(404).json({ error: "Team not found" })
    }
    const updatedTeam = await Team.findByPk(id, {
      include: [
        {
          model: Employee,
          as: "teamLeader",
          attributes: ["name"],
        },
      ],
    })
    res.json(updatedTeam)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

//Delete a Team
const deleteTeam = async (req, res) => {
  const { id } = Number(req.params);
  try {
    const deletedTeam = await Team.findByPk(id);

    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    await Team.destroy({ where: { id } });
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error('Error deleting team or chat:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
}
