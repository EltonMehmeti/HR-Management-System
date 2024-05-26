const express = require("express")
const orgController = require("../controllers/org")


const router = express.Router()

router.get("/",orgController.getOrg)

module.exports = router
