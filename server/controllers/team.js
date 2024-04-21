const Team = require("../models/team")
const Employee = require("../models/employee")
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

//Create new Team
const createTeam = async (req, res) => {
  console.log(req.body)
  const { name, description, leaderId } = req.body
  try {
    const team = await Team.create({ name, description, leaderId })
    res.status(201).json(team)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

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
  const { id } = req.params
  try {
    const deletedTeam = await Team.findByPk(id)
    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found" })
    }
    await Team.destroy({ where: { id } })
    res.json({ message: "Team deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
}
