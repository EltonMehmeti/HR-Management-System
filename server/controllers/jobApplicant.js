const JobApplicant = require("../models/jobApplicant")
const upload = require("../middleware/multer")
const rejecttionEmail = require("../helper/rejectionEmail")

const createJobApplicant = async (req, res) => {
  try {
    // Get the file path or filename from the uploaded file
    const resume = req.file.filename

    // Create the job applicant record with the resume filename or path
    const jobApplicant = await JobApplicant.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      resume: resume, // Store the filename or path in the resume field
      jobTitle: req.body.jobTitle,
    })

    res.status(201).json(jobApplicant)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getAllJobApplicants = async (req, res) => {
  try {
    const jobApplicants = await JobApplicant.find({
      status: { $ne: "rejected" },
    })
    res.status(200).json(jobApplicants)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getJobApplicantById = async (req, res) => {
  const { _id } = req.params
  try {
    const jobApplicant = await JobApplicant.findById(_id)
    if (jobApplicant) {
      res.status(200).json(jobApplicant)
    } else {
      res.status(404).json({ message: "Job applicant not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateJobApplicantById = async (req, res) => {
  const { _id } = req.params
  try {
    let updateFields = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      jobTitle: req.body.jobTitle,
    }

    if (req.file) {
      updateFields.resume = req.file.filename // If a new file is uploaded, update the resume field
    }

    const updatedJobApplicant = await JobApplicant.findByIdAndUpdate(
      _id,
      updateFields,
      { new: true }
    )

    if (updatedJobApplicant) {
      res.status(200).json(updatedJobApplicant)
    } else {
      res.status(404).json({ message: "Job applicant not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteJobApplicantById = async (req, res) => {
  const { _id } = req.params
  try {
    const deletedJobApplicant = await JobApplicant.findByIdAndDelete(_id)
    if (deletedJobApplicant) {
      res.status(204).send()
    } else {
      res.status(404).json({ message: "Job applicant not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const rejectJobApplicantById = async (req, res) => {
  const { _id } = req.params
  try {
    const jobApplicant = await JobApplicant.findByIdAndUpdate(
      _id,
      { status: "rejected" },
      { new: true }
    )
    if (jobApplicant) {
      await rejectionEmail(jobApplicant.name, jobApplicant.email)
      res.status(200).json({ message: "Rejection email sent" })
    } else {
      res.status(404).json({ message: "Job applicant not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createJobApplicant,
  getAllJobApplicants,
  getJobApplicantById,
  updateJobApplicantById,
  deleteJobApplicantById,
  rejectJobApplicantById,
}
