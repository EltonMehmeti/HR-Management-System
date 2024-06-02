// const Team = require("../models/team")
// const Employee = require("../models/employee")
// //Get all Teams
// const getAllTeams = async (req, res) => {
//   try {
//     const teams = await Team.findAll({
//       include: [
//         {
//           model: Employee,
//           as: "teamLeader",
//           attributes: ["name"],
//         },
//       ],
//     })
//     res.json(teams)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error: "Internal server error" })
//   }
// }

// //Get Team By Id
// const getTeamById = async (req, res) => {
//   const { id } = req.params
//   try {
//     const team = await Team.findByPk(id, {
//       include: [
//         {
//           model: Employee,
//           as: "teamLeader",
//           attributes: ["name"],
//         },
//       ],
//     })
//     if (!team) {
//       return res.status(404).json({ error: "Team not found" })
//     }
//     res.json(team)
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" })
//   }
// }

// //Create new Team
// const createTeam = async (req, res) => {
//   console.log(req.body)
//   const { name, description, leaderId } = req.body
//   try {
//     const team = await Team.create({ name, description, leaderId })
//     res.status(201).json(team)
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" })
//   }
// }

// //Update a Team
// const updateTeam = async (req, res) => {
//   const { id } = req.params
//   const { name, description, leaderId } = req.body
//   try {
//     const [updated] = await Team.update(
//       { name, description, leaderId },
//       { where: { id } }
//     )
//     if (!updated) {
//       return res.status(404).json({ error: "Team not found" })
//     }
//     const updatedTeam = await Team.findByPk(id, {
//       include: [
//         {
//           model: Employee,
//           as: "teamLeader",
//           attributes: ["name"],
//         },
//       ],
//     })
//     res.json(updatedTeam)
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" })
//   }
// }

// //Delete a Team
// const deleteTeam = async (req, res) => {
//   const { id } = req.params
//   try {
//     const deletedTeam = await Team.findByPk(id)
//     if (!deletedTeam) {
//       return res.status(404).json({ error: "Team not found" })
//     }
//     await Team.destroy({ where: { id } })
//     res.json({ message: "Team deleted successfully" })
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" })
//   }
// }

// module.exports = {
//   getAllTeams,
//   getTeamById,
//   createTeam,
//   updateTeam,
//   deleteTeam,
// }

// controllers/team.js
const Team = require("../models/team")
const Employee = require("../models/employee")

// Get all Teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: [
        { model: Employee, as: "teamLeader", attributes: ["name"] },
        {
          model: Employee,
          through: "EmployeeTeam",
          as: "members",
          attributes: ["id", "name"],
        },
      ],
    })
    res.json(teams)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Get Team By Id
const getTeamById = async (req, res) => {
  const { id } = req.params
  try {
    const team = await Team.findByPk(id, {
      include: [
        { model: Employee, as: "teamLeader", attributes: ["name"] },
        {
          model: Employee,
          through: "EmployeeTeam",
          as: "members",
          attributes: ["id", "name"],
        },
      ],
    })
    if (!team) {
      return res.status(404).json({ error: "Team not found" })
    }
    res.json(team)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Create new Team
const createTeam = async (req, res) => {
  const { name, description, leaderId, memberIds } = req.body

  try {
    // Create the team
    const team = await Team.create({ name, description, leaderId })

    // Associate leader with the team
    const leader = await Employee.findByPk(leaderId)
    if (!leader) {
      return res.status(404).json({ error: "Team leader not found" })
    }
    await team.setTeamLeader(leader)

    // Associate members with the team if memberIds is provided
    if (memberIds && memberIds.length) {
      const members = await Employee.findAll({
        where: {
          id: memberIds,
        },
      })
      await team.addMembers(members)
    }

    // Fetch the new team with associated team leader and members
    const newTeam = await Team.findByPk(team.id, {
      include: [
        { model: Employee, as: "teamLeader", attributes: ["name"] },
        {
          model: Employee,
          as: "members",
          attributes: ["id", "name"],
        },
      ],
    })

    // Respond with the newly created team
    res.status(201).json(newTeam)
  } catch (error) {
    console.error("Error creating team:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Update a Team
const updateTeam = async (req, res) => {
  const { id } = req.params // Extract the team ID from the request parameters
  const { name, description, leaderId, memberIds } = req.body

  try {
    // Find the team by ID
    const team = await Team.findByPk(id)

    if (!team) {
      return res.status(404).json({ error: "Team not found" })
    }

    // Update team attributes
    team.name = name
    team.description = description
    team.leaderId = leaderId

    // Save the updated team
    await team.save()

    // Associate leader with the team
    const leader = await Employee.findByPk(leaderId)
    if (!leader) {
      return res.status(404).json({ error: "Team leader not found" })
    }
    await team.setTeamLeader(leader)

    // Associate members with the team if memberIds is provided
    if (memberIds && memberIds.length) {
      const members = await Employee.findAll({
        where: {
          id: memberIds,
        },
      })
      await team.setMembers(members)
    } else {
      // If no memberIds provided, remove all existing members from the team
      await team.setMembers([])
    }

    // Fetch the updated team with associated team leader and members
    const updatedTeam = await Team.findByPk(id, {
      include: [
        { model: Employee, as: "teamLeader", attributes: ["name"] },
        {
          model: Employee,
          as: "members",
          attributes: ["id", "name"],
        },
      ],
    })

    // Respond with the updated team
    res.status(200).json(updatedTeam)
  } catch (error) {
    console.error("Error updating team:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Delete a Team
const deleteTeam = async (req, res) => {
  const { id } = req.params
  try {
    const team = await Team.findByPk(id)
    if (!team) {
      return res.status(404).json({ error: "Team not found" })
    }
    await Team.destroy({ where: { id } })
    res.json({ message: "Team deleted successfully" })
  } catch (error) {
    console.error(error)
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
