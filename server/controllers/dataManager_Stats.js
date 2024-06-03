const Employee = require('../models/employee');
const LeaveRequest = require('../models/leaveRequest');
const Salary = require('../models/salary');
const Team = require('../models/team');
const Docs = require('../models/docs');
const { Sequelize } = require('sequelize');

class dataManager_Stats {
  static async totalEmployees() {
    const count = await Employee.count();
    return count;
  }

  static async totalLeaves() {
    const count = await LeaveRequest.count();
    return count;
  }

  static async totalPayments() {
    const count = await Salary.count();
    return count;
  }

  static async totalTeams() {
    const count = await Team.count();
    return count;
  }

  static async totalDocs() {
    const count = await Docs.count();
    return count;
  }

  static async averagePayment() {
    const result = await Salary.findAll({
      attributes: [[Sequelize.fn('AVG', Sequelize.col('amount')), 'avgAmount']]
    });
    return result[0].get('avgAmount');
  }
}

module.exports = dataManager_Stats;
