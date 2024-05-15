import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateJobApplicant from "../components/JobApplicant/CreateJobApplicant";
import EditJobApplicant from "../components/JobApplicant/EditJobApplicant";
import {
  FaEdit,
  FaTrashAlt,
  FaCalendarPlus,
  FaTimesCircle,
} from "react-icons/fa";
import ScheduleMetting from "../components/Recruitment/ScheduleMetting";
import { useUser } from "../../../helper/UserContext";
function JobApplicantList() {
  const [jobApplicants, setJobApplicants] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for create employee modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit employee modal
  const [isScheduleModalOpen, setScheduleModalOpen] = useState(false); // State for edit employee modal

  const [selectedJobApplicantId, setSelectedJobApplicantId] = useState(null); // State to store the id of the employee being edited
  const { token } = useUser()

  // Define fetchAllEmployees function outside of useEffect hook
  const fetchAllJobAplicants = async () => {
    try {
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
    if (token) {

    fetchAllJobAplicants();
    }
  }, [token]);


  const handleDelete = async (_id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:3001/jobApplicant/delete/${_id}`,{}, config);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const handleReject = async (_id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(`http://localhost:3001/jobApplicant/reject/${_id}`, {}, config);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <button
        onClick={() => setIsCreateModalOpen(true)}
        type="button"
        class="flex items-center justify-center text-white m-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      >
          <svg
          class="h-4 w-4 mr-2"
          fill="currentColor"
          viewbox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          />
        </svg>
        Create new
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
          
             
          
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Email
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Phone
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Resume
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Job Title
              </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {jobApplicants.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50"              >
             
                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.name}
                </td>
                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.email}
                </td>
                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.phone}
                </td>
                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.resume}
                </td>
                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.jobTitle}
                </td>
                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex">
                    <button
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setSelectedJobApplicantId(item._id);
                      }}
                      type="button"
                      className="text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      type="button"
                      className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
                    >
                      <FaTrashAlt />
                    </button>
                    <button
                      onClick={() => {
                        setScheduleModalOpen(true);
                        setSelectedJobApplicantId(item._id);
                      }}
                      type="button"
                      className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
                    >
                      <FaCalendarPlus />
                    </button>
                    <button
                      onClick={() => handleReject(item._id)}
                      type="button"
                      className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
                    >
                      <FaTimesCircle />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {isCreateModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <CreateJobApplicant
              onClose={() => setIsCreateModalOpen(false)}
              onSave={() => {
                setIsCreateModalOpen(false)
                // Fetch employees again to update the list after creating a new one
                fetchAllJobAplicants()
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
                setScheduleModalOpen(false)
                fetchAllJobAplicants()
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
                setIsEditModalOpen(false)
                fetchAllJobAplicants()
              }}
            />
          </div>
        </div>
      )}
      {/* Backdrop for Modals */}
      {(isCreateModalOpen || isEditModalOpen || isScheduleModalOpen) && (
        <div className="modal-backdrop"></div>
      )}
    </div>
  );
}

export default JobApplicantList;
