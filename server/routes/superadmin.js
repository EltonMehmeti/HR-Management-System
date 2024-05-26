const express = require("express");
const superAdminController = require("../controllers/superAdmin"); // Import the SuperAdmin controller

const router = express.Router();

// Get all SuperAdmins
router.get("/", superAdminController.getAllSuperAdmins);

// Get a specific SuperAdmin by ID
router.get("/:id", superAdminController.getSuperAdminById);

// Create a new SuperAdmin
router.post("/", superAdminController.createSuperAdmin);

// Update an existing SuperAdmin by ID
router.put("/:id", superAdminController.updateSuperAdmin);

// Delete a SuperAdmin by ID
router.delete("/:id", superAdminController.deleteSuperAdmin);

module.exports = router;
