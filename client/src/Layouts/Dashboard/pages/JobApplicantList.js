import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/modal.css";
import CreateJobApplicant from "../components/JobApplicant/CreateJobApplicant";
import EditJobApplicant from "../components/JobApplicant/EditJobApplicant";
import ScheduleMetting from "../components/Recruitment/ScheduleMetting";

function JobApplicantList() {
  const [jobApplicants, setJobApplicants] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for create employee modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit employee modal
  const [isScheduleModalOpen, setScheduleModalOpen] = useState(false); // State for edit employee modal

  const [selectedJobApplicantId, setSelectedJobApplicantId] = useState(null); // State to store the id of the employee being edited

  // Define fetchAllEmployees function outside of useEffect hook
  const fetchAllJobAplicants = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlRFU1QiLCJpYXQiOjE3MTI0MDA3MjV9._02HtBYzx9oSuiAnNRe_FRT-0Oo9Pl74s0SEMuYJ5gQ";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        "http://localhost:3001/jobApplicant/get",
        config
      );
      setJobApplicants(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllJobAplicants();
  }, []);

  console.log(jobApplicants);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:3001/jobApplicant/delete/${_id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" bg-blue-100 ">
      <button
        onClick={() => setIsCreateModalOpen(true)}
        type="button"
        class="m-5 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Create new
      </button>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-blue-800 uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Resume
            </th>
            <th scope="col" className="px-6 py-3">
              Job Title
            </th>

            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {jobApplicants.map((item, index) => {
            return (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${index + 1}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`checkbox-table-search-${index + 1}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{item._id}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.email}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.phone}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.resume}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.jobTitle}
                </th>

                <td colSpan={2} className="px-4 py-4">
                  <button
                    onClick={() => {
                      setIsEditModalOpen(true); // Open the EditEmployee modal
                      setSelectedJobApplicantId(item._id); // Set the selected employee ID
                    }}
                    type="button"
                    className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    type="button"
                    class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setScheduleModalOpen(true); // Open the EditEmployee modal
                      setSelectedJobApplicantId(item._id); // Set the selected employee ID
                    }}
                    type="button"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
                  >
                    Schedule a meeting
                  </button>
                  <button
                    type="button"
                    class="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            );
          })}

          {/* More table rows */}
        </tbody>
      </table>
      {/* Render CreateEmployee modal when isModalOpen is true */}
      {isCreateModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <CreateJobApplicant
              onClose={() => setIsCreateModalOpen(false)}
              onSave={() => {
                setIsCreateModalOpen(false);
                // Fetch employees again to update the list after creating a new one
                fetchAllJobAplicants();
              }}
            />
          </div>
        </div>
      )}
      {/* Render EditEmployee modal when isEditModalOpen is true */}
      {isScheduleModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <ScheduleMetting
              jobApplicantId={selectedJobApplicantId} // Pass selectedEmployeeId as a prop
              onClose={() => setScheduleModalOpen(false)}
              onSave={() => {
                setScheduleModalOpen(false);
                fetchAllJobAplicants();
              }}
            />
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <EditJobApplicant
              jobApplicantId={selectedJobApplicantId} // Pass selectedEmployeeId as a prop
              onClose={() => setIsEditModalOpen(false)}
              onSave={() => {
                setIsEditModalOpen(false);
                fetchAllJobAplicants();
              }}
            />
          </div>
        </div>
      )}
      {/* Backdrop for EditEmployee modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="modal-backdrop"></div>
      )}
    </div>
  );
}

export default JobApplicantList;
