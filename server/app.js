const express = require("express")
const bodyParser = require("body-parser")
const sequelize = require("./util/database")
const mongoConnect = require("./util/mongoCon")
const employeeRoutes = require("./routes/employee")
const employeeAuthRoutes = require("./routes/auth/employee")
const teamRoutes = require("./routes/team")
const app = express()
const PORT = 3001
const employee = require("./models/employee")
app.use(bodyParser.json())
async function startServer() {
  try {
    await sequelize.sync({ logging: console.log })
    console.log("Database synchronized successfully")
    app.listen(PORT, () => {
      console.log(`Server is running and listening on port ${PORT}`)
    })
  } catch (error) {
    console.error("Error occurred while synchronizing database:", error)
  }
}

mongoConnect(() => {
  console.log("Connected to MongoDB")
})

app.use("/employee", employeeRoutes)
app.use("/auth/employee", employeeAuthRoutes)
app.use("/team", teamRoutes)
startServer()
