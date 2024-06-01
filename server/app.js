const teamRoutes = require("./routes/team")
const express = require("express")
const bodyParser = require("body-parser")
const sequelize = require("./util/database")
const cors = require("cors")
const mongoose = require("mongoose")
const employeeRoutes = require("./routes/employee")
const employeeAuthRoutes = require("./routes/auth/employee")
const hrPersonnelRoutes = require("./routes/auth/hrPersonnel")
const superAdminRoutes = require("./routes/auth/superAdmin")
const leaveTypesRoutes = require("./routes/leaveTypes");
const hrPersonnelRolesRoute = require("./routes/hrPersonnelRoles")
const docsRoutes = require("./routes/docs")
const publicDocsRoutes = require("./routes/publicDocs")
const authenticate = require("./middleware/authenticate")
const app = express()
const PORT = 3001
const path = require("path")

const employee = require("./models/employee")
const interview = require("./models/interview")
const interviewee = require("./models/interviewee")
const hrPersonnel = require("./models/hrPersonnel")
const team = require("./models/team")
const leaveRequest = require("./models/leaveRequest")
const attendanceRecord = require("./models/attendaceRecord")
const jobApplicant = require("./models/jobApplicant")
const intervieweeRoutes = require("./routes/interviewee")
const jobApplicantRoutes = require("./routes/jobApplicant")
const salary = require("./models/salary")
const zoomMetting = require("./helper/zoomMeeting")
const HrPersonnel = require("./models/hrPersonnel")
const superAdmin = require("./models/superAdmin")
const axios = require("axios")
const recruitmentsRoutes = require("./routes/recruitment")
const authorizeRole = require("./middleware/authorizeRole")
const jobSchemaRoutes = require('./routes/jobSchema')
const { auth } = require("googleapis/build/src/apis/abusiveexperiencereport")
const orgRoutes = require("./routes/org")
const payrollRoutes = require("./routes/payroll")
require("dotenv").config()

app.use(cors({ origin: "http://localhost:3000" }))

app.use(bodyParser.json())


// zoomMetting.getMeetings().then((response) => {
//  console.log(response);
// }).catch((error) => {
//   console.error(error);
// });

async function startServer() {
  try {
    await sequelize.sync({ logging: console.log })
    console.log("Database synchronized successfully")
    mongoose
      .connect(
        "mongodb+srv://eltonmhmt:ghjsC0rBHq35MrPG@cluster0.kg03jet.mongodb.net/"
      )
      .then(() => {
        console.log("Connected to MongoDB")
      })
      .catch(err => {
        console.log(err)
      })
    app.listen(PORT, () => {
      console.log(`Server is running and listening on port ${PORT}`)
    })
  } catch (error) {
    console.error("Error occurred while synchronizing database:", error)
  }
}
app.use(
  "/images",
  express.static(path.join(__dirname, "..", "server", "uploads"))
)

app.use("/hrPersonnel", hrPersonnelRolesRoute)
app.use(
  "/team",
  authenticate(hrPersonnel),
  authorizeRole(["data_manager"]),
  teamRoutes
)
app.use(
  "/employee",
  authenticate(hrPersonnel),
  authorizeRole(["data_manager"]),
  employeeRoutes
)
app.use(
  "/docs",
  authenticate(hrPersonnel),
  authorizeRole(["data_manager"]),
  docsRoutes
)


app.use("/public-docs", publicDocsRoutes)
app.use('/auth/hr', hrPersonnelRoutes);
app.use('/auth/employee', employeeAuthRoutes);
app.use('/auth/superAdmin', superAdminRoutes);
app.use('/payroll',authenticate(hrPersonnel),authorizeRole(['finance']), payrollRoutes);
app.use('/jobschema', jobSchemaRoutes);


app.use("/interviewee", authenticate(hrPersonnel), intervieweeRoutes)
app.use(
  "/jobapplicant",
  authenticate(hrPersonnel),
  authorizeRole(["recruiter"]),
  jobApplicantRoutes
)
app.use(
  "/recruitment",
  authenticate(hrPersonnel),
  authorizeRole(["recruiter"]),
  recruitmentsRoutes
)
app.use("/org", authenticate(employee), authorizeRole(["employee"]), orgRoutes)

app.use("/auth/hr", hrPersonnelRoutes)
app.use("/auth/employee", employeeAuthRoutes)
app.use("/auth/superAdmin", superAdminRoutes)
app.use('/leaveTypes', leaveTypesRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads", "images")))

app.use(
  "/uploads/documents",
  express.static(path.join(__dirname, "uploads", "documents"))
)

startServer()
