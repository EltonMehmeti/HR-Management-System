import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../../helper/UserContext';
import SalaryChart from './Chart';

const EmployeesWithSalaries = () => {
    const [employees, setEmployees] = useState([]);
    const { token } = useUser();

    useEffect(() => {
        if (token) {
            fetchEmployeesWithSalaries();
        }
    }, [token]);

    const fetchEmployeesWithSalaries = async () => {
        try {
            const response = await axios.get('http://localhost:3001/payroll/employee-salaries', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees with salaries:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Employees with Salaries</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Salaries</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td className="border px-4 py-2">{employee.name}</td>
                                <td className="border px-4 py-2">{employee.email}</td>
                                <td className="border px-4 py-2">
                                 
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold mb-2">Salary Over Time</h3>
                                        <div className='w-96 '>
                                    <SalaryChart salaries={employee.salaries} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeesWithSalaries;
