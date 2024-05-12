const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const SuperAdminModel = require("../../models/superAdmin")
const generateToken = require("../../helper/generateToken")
const authorizeRole = require("../../middleware/authorizeRole")

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingSuperAdmin = await SuperAdminModel.findOne({
      where: { email },
    })

    if (existingSuperAdmin) {
      return res.status(400).json({ error: "Email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newSuperAdmin = await SuperAdminModel.create({
      name,
      email,
      password: hashedPassword,
    })

    const token = generateToken(newSuperAdmin.id) // Corrected this line

    res.status(201).json({ token, superAdmin: newSuperAdmin }) // Changed superAdmin to newSuperAdmin
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const superAdmin = await SuperAdminModel.findOne({ where: { email } })
    if (!superAdmin) {
      return res.status(400).json({ error: "Invalid email or password" })
    }
    const passwordMatch = await bcrypt.compare(password, superAdmin.password)
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid email or password" })
    }
    const token = generateToken(superAdmin.id)
    res.status(200).json({ token, superAdmin })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
