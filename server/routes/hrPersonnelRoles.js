const express = require("express")
const router = express.Router()
const HrPersonnelController = require("../controllers/hrPersonnel")

router.get(
  "/",
  //   authorizeRole(["super_admin"]),
  HrPersonnelController.getAllHrPersonnel
)

router.put(
  "/:id",
  //   authorizeRole(["super_admin"]),
  HrPersonnelController.updateHrPersonnel
)

module.exports = router
