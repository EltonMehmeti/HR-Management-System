
  const teamRoutes = require("./routes/team")
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
// const mongoConnect = require('./util/mongoCon');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employee');
const employeeAuthRoutes = require('./routes/auth/employee');
const hrPersonnelRoutes = require('./routes/auth/hrPersonnel');
const authenticate = require('./middleware/authenticate');
const app = express();
const PORT = 3001;
const cors = require('cors');
const employee = require('./models/employee');
const interview = require('./models/interview');
const interviewee = require('./models/interviewee');
const hrPersonnel = require('./models/hrPersonnel');  
const team = require('./models/team');
const leaveRequest = require('./models/leaveRequest')
const attendanceRecord = require('./models/attendaceRecord')
const jobApplicant = require('./models/jobApplicant');
const intervieweeRoutes = require('./routes/interviewee');  
const jobApplicantRoutes = require('./routes/jobApplicant');
const HrPersonnel = require("./models/hrPersonnel");
app.use(bodyParser.json());



async function startServer() {
  try {
    await sequelize.sync({ logging: console.log })
    console.log("Database synchronized successfully")
    // Enable CORS for all routes
   
    app.listen(PORT, () => {
      console.log(`Server is running and listening on port ${PORT}`)
    })
  } catch (error) {
    console.error("Error occurred while synchronizing database:", error)
  }
}
mongoose.connect('mongodb+srv://eltonmhmt:ghjsC0rBHq35MrPG@cluster0.kg03jet.mongodb.net/').
then(() => { console.log('Connected to MongoDB') })
.catch((err) => { console.log(err) });


app.use(cors());
app.use("/team", teamRoutes)

app.use('/employee', authenticate(hrPersonnel), employeeRoutes);
app.use('/auth/employee', employeeAuthRoutes);
app.use('/auth/hr', hrPersonnelRoutes);
app.use('/interviewee', authenticate(hrPersonnel), intervieweeRoutes);
app.use('/jobapplicant', jobApplicantRoutes);


startServer();
