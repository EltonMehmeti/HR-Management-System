const Interviewee = require("../models/interviewee")
const zoomMeeting = require("../helper/zoomMeeting")

const createInterviewee = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      resume,
      jobTitle,
      hrEmail,
      title,
      date,
      time,
      duration,
      agenda,
    } = req.body
    const interviewee = await Interviewee.create({
      name,
      email,
      phone,
      resume,
      jobTitle,
    })
    const start_time = new Date(`${date}T${time}:00`)
    zoomMeeting
      .createMeeting(title, start_time, duration, agenda)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })

    res.status(201).json(interviewee)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

const getAllInterviewees = async (req, res) => {
  try {
    const interviewee = await Interviewee.findAll()
    res.json(interviewee)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

const getIntervieweeById = async (req, res) => {
  try {
    const { id } = req.params
    const interviewee = await Interviewee.findByPk(id)
    if (!interviewee) {
      return res.status(404).json({ error: "Interviewee not found" })
    }
    res.json(jobApplicant)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

const updateInterviewee = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, phone, resume, jobTitle } = req.body
    const updatedInterviewee = await Interviewee.update(
      { name, email, phone, resume, jobTitle },
      { where: { id } }
    )
    res.json(updatedInterviewee)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

const deleteInterviewee = async (req, res) => {
  try {
    const { id } = req.params
    await Interviewee.destroy({ where: { id } })
    res.json({ message: "Job applicant deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  createInterviewee,
  getAllInterviewees,
  getIntervieweeById,
  updateInterviewee,
  deleteInterviewee,
}
