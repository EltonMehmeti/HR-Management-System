const Employee = require('../models/employee');
const Team = require('../models/team');
const LeaveRequest = require('../models/leaveRequest');

class EmployeeStatsManager {
  static async totalEmployees() {
    const count = await Employee.count();
    return count;
  }

  static async totalTeams() {
    const count = await Team.count();
    return count;
  }

  static async totalLeaveRequests() {
    const count = await LeaveRequest.count();
    return count;
  }

  static async averageEmployeesPerTeam() {
    const teams = await Team.findAll({ include: [{ model: Employee, as: 'members' }] });
    const totalEmployees = teams.reduce((acc, team) => acc + team.members.length, 0);
    const average = totalEmployees / teams.length;
    return average;
  }

  static async averageLeavesPerEmployee() {
    const employees = await Employee.findAll({ include: LeaveRequest });
    const totalLeaves = employees.reduce((acc, employee) => acc + employee.leaveRequests.length, 0);
    const average = totalLeaves / employees.length;
    return average;
  }
}

module.exports = EmployeeStatsManager;
