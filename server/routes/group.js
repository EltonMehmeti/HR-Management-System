const express = require("express")
const groupController = require("../controllers/group")

const router = express.Router()

router.get("/", groupController.getAllGroups)

router.post("/", groupController.createGroup)

router.put("/:id", groupController.updateGroup)


module.exports = router
