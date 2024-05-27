const multer = require("multer")
const path = require("path")

// Storage configuration for images
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/images"))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

// Image upload middleware
const uploadImage = multer({
  storage: imageStorage,
  fileFilter: function (req, file, cb) {
    // Check if file is an image
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("File type not supported. Only images are allowed."))
    }
  },
}).single("image")

// Storage configuration for files
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/documents"))
  },
  filename: function (req, file, cb) {
    // Use the original filename for files
    req.filename = file.originalname
    cb(null, file.originalname)
  },
})

const uploadFile = (req, res, next) => {
  multer({
    storage: fileStorage,
    fileFilter: function (req, file, cb) {
      // Check if file is not an image and is a PDF file
      if (
        !file.mimetype.startsWith("image/") &&
        file.mimetype === "application/pdf"
      ) {
        cb(null, true) // Accept the file
      } else {
        cb(new Error("File type not supported. Only PDF files are allowed."))
      }
    },
  }).single("resume")(req, res, next)
}

const uploadDocs = (req, res, next) => {
  multer({
    storage: fileStorage,
    fileFilter: function (req, file, cb) {
      // Check if file is not an image and is a PDF file
      if (
        !file.mimetype.startsWith("image/") &&
        file.mimetype === "application/pdf"
      ) {
        cb(null, true) // Accept the file
      } else {
        cb(new Error("File type not supported. Only PDF files are allowed."))
      }
    },
  }).single("filePath")(req, res, next)
}

// Export both middlewares
const uploadSalaryFile = (req, res, next) => {
  multer({
    storage: fileStorage,
    fileFilter: function (req, file, cb) {
      // Check if file is an Excel file
      if (
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.mimetype === "application/vnd.ms-excel"
      ) {
        cb(null, true) // Accept the file
      } else {
        cb(new Error("File type not supported. Only Excel files are allowed."))
      }
    },
  }).single("salaryFile")(req, res, next)
}
// Export both middlewares
module.exports = { uploadImage, uploadDocs, uploadFile, uploadSalaryFile }
