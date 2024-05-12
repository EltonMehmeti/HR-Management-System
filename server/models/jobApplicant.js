const mongoose = require("mongoose")

const jobApplicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  resume: String,
  jobTitle: String,
  image: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "proceeded", "rejected"],
    default: "pending",
  },
})

const JobApplicant = mongoose.model("JobApplicant", jobApplicantSchema)

module.exports = JobApplicant
