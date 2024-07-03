const express = require("express")
const explorerController = require("../controllers/explorer")

const router = express.Router()

router.get("/", explorerController.getAllExplorer)

router.post("/", explorerController.createExplorer)

router.delete("/:id", explorerController.deleteExplorer)


module.exports = router
