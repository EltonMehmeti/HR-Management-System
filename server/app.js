const express = require('express');
const sequelize = require('./util/database');
const Employee = require('./models/employee');
const Team = require('./models/team');
const mongoConnect = require('./util/mongoCon')
const app = express();
const PORT = 3000;

console.log(sequelize.models);

sequelize.sync({ logging: console.log })
  .then(() => {
    console.log('Database synchronized successfully');
    app.listen(PORT, () => {
      console.log(`Server is running and listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error occurred while synchronizing database:', error);
  });

  mongoConnect(() => {
    console.log('Connected to MongoDB');
  });