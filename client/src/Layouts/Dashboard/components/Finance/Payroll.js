import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../../helper/UserContext';

const PayrollOverview = () => {
    const [overview, setOverview] = useState([]);
    const [topEarners, setTopEarners] = useState([]);
    const [topTeamEarners, setTopTeamEarners] = useState([]);
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
        } catch (error) {
            console.error('Error fetching top earners:', error);
        }
    };

    const fetchTopTeamEarners = async () => {
        try {
            const response = await axios.get('http://localhost:3001/payroll/top-teams', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTopTeamEarners(response.data);
        } catch (error) {
            console.error('Error fetching top team earners:', error);
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
            fetchTopTeamEarners();
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
                            <p className="text-gray-700">Name: {earner.employee.name}</p>
                            <p className="text-gray-700">Amount: {earner.totalAmount}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Top Team Earners</h2>
                <ul>
                    {topTeamEarners.map((teamEarner, index) => (
                        <li key={index} className="mb-2">
                            <p className="text-gray-700">Team: {teamEarner.team}</p>
                            <p className="text-gray-700">Total Amount: {teamEarner.totalAmount}</p>
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

const Payroll = () => {
    const [file, setFile] = useState(null);
    const { token } = useUser();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('salaryFile', file);

        try {
            const response = await axios.post('http://localhost:3001/payroll/upload', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded:', file);
            alert(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file: ' + error.response.data);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-7xl grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <PayrollOverview />
                </div>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-center">Upload Payroll File</h2>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mb-4 p-2"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payroll;
