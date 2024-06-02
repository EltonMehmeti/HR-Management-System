const express = require("express")
const employeeController = require("../controllers/employee")
const multerMiddleware = require('../middleware/multer'); 


const router = express.Router()

router.get("/",employeeController.getAllEmployees)

router.get("/:id", employeeController.getEmployeeById)

router.post("/post", multerMiddleware.uploadImage, employeeController.createEmployee);

router.put("/:id", multerMiddleware.uploadImage,employeeController.updateEmployee)

router.delete("/:id", employeeController.deleteEmployee)

module.exports = router
