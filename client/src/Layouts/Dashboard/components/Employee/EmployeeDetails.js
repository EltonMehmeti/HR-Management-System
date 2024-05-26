import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../../../../Image/logo (1).png";
import { useUser } from "../../../../helper/UserContext";

function EmployeeDetails() {
  const { id } = useParams(); // Accessing route parameters using useParams hook
  const { token } = useUser();
  const [employee, setEmployee] = useState(null);
  
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`http://localhost:3001/employee/${id}`, config);
        
        console.log("Response data:", res.data); // Debugging log
        
        // Extract the image filename from the response data
        const imageFilename = res.data.image.split(/[\\/]/).pop();
        
        console.log("Image filename:", imageFilename); // Debugging log
        
        // Construct the image URL
        const imageURL = `http://localhost:3001/uploads/${imageFilename}`;
        
        console.log("Image URL:", imageURL); // Debugging log
        
        // Update the state with the employee details including the image URL
        setEmployee({
          ...res.data,
          imageURL: imageURL,
        });
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchEmployeeDetails();
  }, [id, token]);
  

  if (!employee) {
    return <div>Loading...</div>; // Add loading indicator while fetching data
  }

  return (
    <div className="m-auto p-20">
        <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
        <img className="rounded-t-lg mx-auto" src={employee.imageURL} alt="" />
   
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
