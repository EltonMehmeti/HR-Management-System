const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const cors = require("cors");
const mongoose = require("mongoose");
const employeeRoutes = require("./routes/employee");
const employeeAuthRoutes = require("./routes/auth/employee");
const hrPersonnelRoutes = require("./routes/auth/hrPersonnel");
const superAdminRoutes = require("./routes/auth/superAdmin");
const hrPersonnelRolesRoute = require("./routes/hrPersonnelRoles");
const docsRoutes = require("./routes/docs");
const publicDocsRoutes = require("./routes/publicDocs");
const authenticate = require("./middleware/authenticate");
const app = express();
const PORT = 3001;
const path = require("path");

// Import Employee Stats Routes
const employeeStatsRoutes = require("./routes/employeeStatsManager");

// Import Models
const employee = require("./models/employee");
const interview = require("./models/interview");
const interviewee = require("./models/interviewee");
const hrPersonnel = require("./models/hrPersonnel");
const team = require("./models/team");
const leaveRequest = require("./models/leaveRequest");
const attendanceRecord = require("./models/attendaceRecord");
const jobApplicant = require("./models/jobApplicant");
const salary = require("./models/salary");
const zoomMetting = require("./helper/zoomMeeting");
const HrPersonnel = require("./models/hrPersonnel");
const superAdmin = require("./models/superAdmin");
const axios = require("axios");
const recruitmentsRoutes = require("./routes/recruitment");
const authorizeRole = require("./middleware/authorizeRole");
const jobsRoutes = require("./routes/job");
const orgRoutes = require("./routes/org");
const payrollRoutes = require("./routes/payroll");
require("dotenv").config();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

// Sync database and start server
async function startServer() {
  try {
    await sequelize.sync({ logging: console.log });
    console.log("Database synchronized successfully");

    mongoose
      .connect("mongodb+srv://eltonmhmt:ghjsC0rBHq35MrPG@cluster0.kg03jet.mongodb.net/")
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch(err => {
        console.log(err);
      });

    app.listen(PORT, () => {
      console.log(`Server is running and listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error occurred while synchronizing database:", error);
  }
}

// Serve static images
app.use("/images", express.static(path.join(__dirname, "..", "server", "uploads")));

// Routes
app.use("/hrPersonnel", hrPersonnelRolesRoute);
app.use("/employee", authenticate(hrPersonnel), authorizeRole(["data_manager"]), employeeRoutes);
app.use("/docs", authenticate(hrPersonnel), authorizeRole(["data_manager"]), docsRoutes);
app.use("/public-docs", publicDocsRoutes);
app.use("/auth/hr", hrPersonnelRoutes);
app.use("/auth/employee", employeeAuthRoutes);
app.use("/auth/superAdmin", superAdminRoutes);
app.use("/payroll", authenticate(hrPersonnel), authorizeRole(["data_manager"]), payrollRoutes);
app.use("/job", jobsRoutes);
app.use("/recruitment", authenticate(hrPersonnel), authorizeRole(["recruiter"]), recruitmentsRoutes);
app.use("/org", authenticate(employee), authorizeRole(["employee"]), orgRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads", "images")));
app.use("/uploads/documents", express.static(path.join(__dirname, "uploads", "documents")));

// Employee Stats Routes
app.use("/employee-stats", employeeStatsRoutes);

startServer();
