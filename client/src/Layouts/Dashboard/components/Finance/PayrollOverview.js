import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../../helper/UserContext';


const PayrollOverview = () => {
    const [overview, setOverview] = useState([]);
    const [topEarners, setTopEarners] = useState([]);
    const [salaryTrends, setSalaryTrends] = useState([]);
    const [analytics, setAnalytics] = useState({});
    const { token } = useUser();

    const fetchOverview = async () => {
        try {
            const response = await axios.get('http://localhost:3001/payroll/overview', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOverview(response.data);
        } catch (error) {
            console.error('Error fetching payroll overview:', error);
        }
    };

    const fetchTopEarners = async () => {
        try {
            const response = await axios.get('http://localhost:3001/payroll/top-earners', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTopEarners(response.data);
            console.log('Top earners:', response.data);
        } catch (error) {
            console.error('Error fetching top earners:', error);
        }
    };

    const fetchSalaryTrends = async () => {
        try {
            const response = await axios.get('http://localhost:3001/payroll/trends', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSalaryTrends(response.data);
        } catch (error) {
            console.error('Error fetching salary trends:', error);
        }
    };

    const fetchAnalytics = async () => {
        try {
            const response = await axios.get('http://localhost:3001/payroll/analytics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAnalytics(response.data);
        } catch (error) {
            console.error('Error fetching payroll analytics:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOverview();
            fetchTopEarners();
            fetchSalaryTrends();
            fetchAnalytics();
        }
    }, [token]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Top Earners</h2>
                <ul>
                    {topEarners.map((earner, index) => (
                        <li key={index} className="mb-2">
                            <p className="text-gray-700">Name: {earner?.name}</p>
                            <p className="text-gray-700">Amount: {earner?.totalAmount}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Salary Trends Over Time</h2>
            <ul>
                {salaryTrends.map((trend, index) => (
                    <li key={index} className="mb-2">
                        <p className="text-gray-700">Month: {trend.month}</p>
                        <p className="text-gray-700">Total Amount: {trend.totalAmount}</p>
                    </li>
                ))}
            </ul>
        </div>
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">All Payroll Records</h2>
                <ul>
                    {overview.map((upload, index) => (
                        <li key={index} className="mb-2">
                            <p className="text-gray-700">Date: {formatDate(upload.transactionDate)}</p>
                            <p className="text-gray-700">Amount: {upload.amount}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Payroll Analytics</h2>
                <div className="border-t border-gray-200 pt-4">
                    <div className="mb-4">
                        <p className="text-gray-600">Average Salary:</p>
                        <p className="text-lg font-semibold">{analytics.averageSalary}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Total Payroll Expenses:</p>
                        <p className="text-lg font-semibold">{analytics.totalPayrollExpenses}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default PayrollOverview;