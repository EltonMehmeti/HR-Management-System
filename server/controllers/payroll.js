const path = require('path');
const xlsx = require('xlsx');
const Salary = require('../models/salary');
const Employee = require('../models/employee');
const Team = require('../models/team');
const { Sequelize, Op } = require("sequelize");

// Insert salary data from Excel
const insertSalaryDataFromExcel = async (req, res) => {
    const filePath = path.join(__dirname, '../uploads/documents', req.file.filename);

    try {
        const workbook = xlsx.readFile(filePath, { cellDates: true });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const salaryData = xlsx.utils.sheet_to_json(worksheet);

        for (const data of salaryData) {
            const salary = new Salary({
                employeeId: data["Employee ID"],
                amount: data["Amount"],
                transactionDate: data["Transaction Date"],
                hrPersonnelId: data["HR Personnel ID"]
            });

            await salary.save();
        }

        res.status(200).send('File uploaded and data inserted into the database!');
    } catch (error) {
        console.error('Error inserting salary data:', error);
        res.status(500).send('Error inserting salary data: ' + error.message);
    }
};

// Analytics: Calculate average salary and total payroll expenses
const getPayrollAnalytics = async (req, res) => {
    try {
        const salaries = await Salary.findAll();
        const totalSalaries = salaries.reduce((acc, curr) => acc + curr.amount, 0);
        const averageSalary = totalSalaries / salaries.length;

        res.status(200).json({
            averageSalary,
            totalPayrollExpenses: totalSalaries
        });
    } catch (error) {
        console.error('Error retrieving payroll analytics:', error);
        res.status(500).send('Error retrieving payroll analytics');
    }
};

// Overview: Get recent payroll uploads
const getPayrollOverview = async (req, res) => {
    try {
        const recentUploads = await Salary.findAll({
            attributes: ['transactionDate', 'amount'],
            order: [['transactionDate', 'DESC']],
            limit: 5
        });

        console.log('Recent uploads:', recentUploads);
        res.status(200).json(recentUploads);
    } catch (error) {
        console.error('Error retrieving payroll overview:', error);
        res.status(500).send('Error retrieving payroll overview');
    }
};

// Get top earners
const getTopEarners = async (req, res) => {
    try {
        const topEarners = await Employee.findAll({
            attributes: [
                'id',
                'name',
                'email',
                'phone',
                [Sequelize.literal('(SELECT SUM(amount) FROM salaries WHERE employeeId = employee.id)'), 'totalAmount']
            ],
            include: [],
            order: [[Sequelize.literal('totalAmount'), 'DESC']],
            limit: 10
        });
        res.status(200).json(topEarners);
    } catch (error) {
        console.error('Error retrieving top earners:', error);
        res.status(500).send('Error retrieving top earners');
    }
};



// Get salary trends over time
const getSalaryTrends = async (req, res) => {
    try {
        const salaryTrends = await Salary.findAll({
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('transactionDate'), '%Y-%m'), 'month'],
                [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']
            ],
            group: ['month'],
            order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('transactionDate'), '%Y-%m'), 'ASC']]
        });

        res.status(200).json(salaryTrends);
    } catch (error) {
        console.error('Error retrieving salary trends:', error);
        res.status(500).send('Error retrieving salary trends');
    }
};
// In your controller (payroll.js)
const getEmployeesWithSalaries = async (req, res) => {
    try {
        const employeesWithSalaries = await Employee.findAll({
            include: [
                {
                    model: Salary,
                    as: 'salaries' // Alias for the association
                }
            ]
        });
        res.status(200).json(employeesWithSalaries);
    } catch (error) {
        console.error('Error retrieving employees with salaries:', error);
        res.status(500).send('Error retrieving employees with salaries');
    }
};
    
module.exports = {
    getPayrollAnalytics,
    getPayrollOverview,
    insertSalaryDataFromExcel,
    getTopEarners,
    getSalaryTrends,
    getEmployeesWithSalaries 
};
