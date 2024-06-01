const path = require('path');
const xlsx = require('xlsx');
const Salary = require('../models/salary');
const Sequelize = require('sequelize');
const HrPersonnel = require('../models/hrPersonnel');
const Employee = require('../models/employee');

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
        // Fetch recent payroll uploads from the database
        const recentUploads = await Salary.findAll({
            attributes: ['transactionDate', 'amount'],
            order: [['transactionDate', 'DESC']],
            limit: 5 // Limit to 5 recent uploads for demonstration
        });
        console.log('Recent uploads:', recentUploads);  
        res.status(200).json(recentUploads);
    } catch (error) {
        console.error('Error retrieving payroll overview:', error);
        res.status(500).send('Error retrieving payroll overview');
    }
};





const getTopEarners = async (req, res) => {
    try {
        const topEarners = await Salary.findAll({
            attributes: ['employeeId', [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']],
            include: [{ model: Employee, as: 'employee' }],
            group: ['employeeId'],
            order: [[Sequelize.literal('totalAmount'), 'DESC']],
            limit: 10 // Limit to top 10 earners for demonstration
        });
        res.status(200).json(topEarners);
    } catch (error) {
        console.error('Error retrieving top earners:', error);
        res.status(500).send('Error retrieving top earners');
    }
};

// Top Paying Teams
const getTopPayingTeams = async (req, res) => {
    try {
        const topPayingTeams = await Salary.findAll({
            attributes: ['hrPersonnelId', [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']],
            include: [{ model: HrPersonnel, as: 'hrPersonnel' }],
            group: ['hrPersonnelId'],
            order: [[Sequelize.literal('totalAmount'), 'DESC']],
            limit: 5 // Limit to top 5 paying teams for demonstration
        });
        res.status(200).json(topPayingTeams);
    } catch (error) {
        console.error('Error retrieving top paying teams:', error);
        res.status(500).send('Error retrieving top paying teams');
    }
};

module.exports = {
    getPayrollAnalytics,
    getPayrollOverview,
    insertSalaryDataFromExcel,
    getTopEarners,
    getTopPayingTeams
};