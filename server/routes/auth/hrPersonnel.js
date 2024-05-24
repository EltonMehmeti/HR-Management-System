const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const HrPersonnel = require("../../models/hrPersonnel")
const router = express.Router()
const generateToken = require("../../helper/generateToken")
const path = require('path'); 
const fs = require('fs');
const multerMiddleware = require('../../middleware/multer'); 


router.post("/register", multerMiddleware.uploadImage, async (req, res) => {
  try {
    const { name, email, password, role, joiningDate } = req.body;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imagePath = req.file.path;

    const existingPersonnel = await HrPersonnel.findOne({ where: { email } });
    if (existingPersonnel) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const personnel = await HrPersonnel.create({
      name,
      email,
      password: hashedPassword,
      role,
      joiningDate,
      image: imagePath,
    });

    const token = generateToken({ id: personnel.id, role: personnel.role });

    res.status(201).json({ token, personnel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const personnel = await HrPersonnel.findOne({ where: { email } })
    if (!personnel) {
      return res.status(400).json({ error: "Invalid email or password" })
    }

    const passwordMatch = await bcrypt.compare(password, personnel.password)
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid email or password" })
    }

    const token = generateToken({ id: personnel.id, role: personnel.role })

    res.status(200).json({ token, personnel })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router