const express = require("express")
const memberController = require("../controllers/member")

const router = express.Router()

router.get("/", memberController.getAllMembers)

router.post("/", memberController.createMember)

router.delete("/:id", memberController.deleteMember)


module.exports = router
