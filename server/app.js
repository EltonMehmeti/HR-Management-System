
  const teamRoutes = require("./routes/team")
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employee');
const employeeAuthRoutes = require('./routes/auth/employee');
const hrPersonnelRoutes = require('./routes/auth/hrPersonnel');
const superAdminRoutes = require('./routes/auth/superAdmin');
const authenticate = require('./middleware/authenticate');
const app = express();
const PORT = 3001;

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
const salary = require('./models/salary');
const zoomMetting = require('./helper/zoomMeeting');
const HrPersonnel = require("./models/hrPersonnel");
const axios = require('axios');
require('dotenv').config()



app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());

zoomMetting.getMeetings().then((response) => {
  console.log(response);
}).catch((error) => {
  console.error(error);
});
const participantEmails = ['eltonmeh1@gmail.com', 'eltonmhmt@gmail.com'];
zoomMetting.createMeeting('Interview', '2024-04-11T15:22:00', 60, 'Asia/Kuala_Lumpur', 'Interview for the position of Software Engineer',participantEmails).then((response) => {
  console.log(response);
}).catch((error) => {
  console.error(error);
});
  

async function startServer() {
  try {
    await sequelize.sync({ logging: console.log})
    console.log("Database synchronized successfully")
    mongoose.connect('mongodb+srv://eltonmhmt:ghjsC0rBHq35MrPG@cluster0.kg03jet.mongodb.net/').
    then(() => { console.log('Connected to MongoDB') })
    .catch((err) => { console.log(err) });
    app.listen(PORT, () => {
      console.log(`Server is running and listening on port ${PORT}`)
    })
  } catch (error) {
    console.error("Error occurred while synchronizing database:", error)
  }
}


app.use("/team", teamRoutes)
app.use('/employee', authenticate(employee), employeeRoutes);

app.use('/employee', authenticate(hrPersonnel), employeeRoutes);
app.use('/auth/employee', employeeAuthRoutes);
app.use('/auth/hr', hrPersonnelRoutes);
app.use('/interviewee', authenticate(hrPersonnel), intervieweeRoutes);
app.use('/jobapplicant', jobApplicantRoutes);
app.use('/auth/superAdmin', superAdminRoutes);




startServer();
