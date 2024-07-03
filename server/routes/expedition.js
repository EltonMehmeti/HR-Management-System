const express = require("express")
const expeditionController = require("../controllers/expedition")

const router = express.Router()

router.get("/", expeditionController.getAllExpedition)

router.post("/", expeditionController.createExpedition)

router.get("/:nationality", expeditionController.getAllExpeditionByNationality)


module.exports = router
