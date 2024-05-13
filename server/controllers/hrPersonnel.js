const HrPersonnel = require("../models/hrPersonnel")

const getAllHrPersonnel = async (req, res) => {
  try {
    const hrPersonnel = await HrPersonnel.findAll()
    res.json(hrPersonnel)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" })
  }
}

const updateHrPersonnel = async (req, res) => {
  const { id } = req.params
  const { role } = req.body
  try {
    const [updated] = await HrPersonnel.update({ role }, { where: { id } })
    if (!updated) {
      return res.status(404).json({ error: "HrPersonnel not found" })
    }
    const updatedHrPersonnel = await HrPersonnel.findByPk(id)
    res.json(updatedHrPersonnel)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  getAllHrPersonnel,
  updateHrPersonnel,
}
