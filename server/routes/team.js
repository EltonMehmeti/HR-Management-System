const express = require("express")
const teamController = require("../controllers/team")

const router = express.Router()

router.get("/", teamController.getAllTeams)

router.get("/:id", teamController.getTeamById)

router.post("/", teamController.createTeam)

router.put("/:id", teamController.updateTeam)

router.delete("/:id", teamController.deleteTeam)

module.exports = router
