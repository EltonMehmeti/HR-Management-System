const express = require("express")
const docsController = require("../controllers/docs")
const multerMiddleware = require("../middleware/multer")

const router = express.Router()

router.get("/", docsController.getAllDocs)

router.get("/:id", docsController.getDocsById)

router.post("/", multerMiddleware.uploadDocs, docsController.createDocs)

router.put("/:id", multerMiddleware.uploadDocs, docsController.updateDocs)

router.delete("/:id", docsController.deleteDocs)

module.exports = router
