import React, { useEffect, useState } from "react";
import logo from "../../../../Image/logo (1).png";
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";
import axios from "axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for create employee modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit employee modal
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // State to store the id of the employee being edited

  // Define fetchAllEmployees function outside of useEffect hook
  const fetchAllEmployees = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlRFU1QiLCJpYXQiOjE3MTI0MDA3MjV9._02HtBYzx9oSuiAnNRe_FRT-0Oo9Pl74s0SEMuYJ5gQ";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("http://localhost:3001/employee", config);
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlRFU1QiLCJpYXQiOjE3MTI0MDA3MjV9._02HtBYzx9oSuiAnNRe_FRT-0Oo9Pl74s0SEMuYJ5gQ";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:3001/employee/${id}`, config);
      fetchAllEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mx-2">
      {employees.map((item, index) => (
        <div
          key={index}
          className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex flex-col items-center pb-10 mt-5">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={logo}
              alt="Employee image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {item.name}
            </h5>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {item.role}
            </div>
            <div className="flex flex-row gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.email}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.phone}
              </div>
            </div>
            <div className="flex mt-4 md:mt-6">
              <button
                onClick={() => {
                  setIsEditModalOpen(true);
                  setSelectedEmployeeId(item.id);
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      {isCreateModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <CreateEmployee
              onClose={() => setIsCreateModalOpen(false)}
              onSave={() => {
                setIsCreateModalOpen(false);
                fetchAllEmployees();
              }}
            />
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <EditEmployee
              employeeId={selectedEmployeeId}
              onClose={() => setIsEditModalOpen(false)}
              onSave={() => {
                setIsEditModalOpen(false);
                fetchAllEmployees();
              }}
            />
          </div>
        </div>
      )}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="modal-backdrop"></div>
      )}
    </div>
  );
}

export default EmployeeList;
