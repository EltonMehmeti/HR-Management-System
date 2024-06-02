import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../../helper/UserContext';
import PayrollOverview from './PayrollOverview';
import EmployeesPayroll from './EmployeesPayroll';


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
        <div className="bg-[#d9d9fb] p-4 ">
        <div className="flex justify-center items-center mb-10  bg-[#d9d9fb]">
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
        <EmployeesPayroll/>
        </div>

    );
};

export default Payroll;
