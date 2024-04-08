import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../../../../Image/logo (1).png";

function EmployeeDetails() {
  const { id } = useParams(); // Accessing route parameters using useParams hook

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlRFU1QiLCJpYXQiOjE3MTI0MDA3MjV9._02HtBYzx9oSuiAnNRe_FRT-0Oo9Pl74s0SEMuYJ5gQ";
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`http://localhost:3001/employee/${id}`, config);
        setEmployee(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>; // Add loading indicator while fetching data
  }

  return (
    <div className="m-auto p-20">
        <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
        <img className="rounded-t-lg mx-auto" src={logo} alt="" />
   
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{employee.name}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{employee.email}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{employee.phone}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{employee.salary}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{employee.password}</p>

      </div>
    </div>
      
    </div>
  );
}

export default EmployeeDetails;