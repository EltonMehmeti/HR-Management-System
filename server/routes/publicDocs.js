const express = require("express")
const docsController = require("../controllers/docs")

const router = express.Router()

router.get("/", docsController.getPublicDocs)

module.exports = router
