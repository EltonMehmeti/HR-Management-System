const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: String,
  salary: Number,
  requirements: [String],
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobApplicant" }],
  postedAt: { type: Date, default: Date.now },
});
const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
