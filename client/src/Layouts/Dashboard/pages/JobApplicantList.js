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
  const [filteredJobApplicants, setFilteredJobApplicants] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isScheduleModalOpen, setScheduleModalOpen] = useState(false);
const [jobs, setJobs] = useState([]);
  const [selectedJobApplicantId, setSelectedJobApplicantId] = useState(null);
  const { token } = useUser();

  const [searchTerm, setSearchTerm] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState("");

  const fetchAllJobApplicants = async () => {
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
      setFilteredJobApplicants(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchJobs = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        "http://localhost:3001/job/",
        config
      );
      console.log("test" + res.data);
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (token) {
      fetchAllJobApplicants();
      fetchJobs();
    }
  }, [token]);

  const handleDelete = async (_id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:3001/jobApplicant/delete/${_id}`, {}, config);
      fetchAllJobApplicants();
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
      fetchAllJobApplicants();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    filterJobApplicants(searchValue, jobTitleFilter);
  };

  const handleJobTitleFilter = (e) => {
    const jobTitleValue = e.target.value;
    setJobTitleFilter(jobTitleValue);
    filterJobApplicants(searchTerm, jobTitleValue);
  };

  const filterJobApplicants = (searchValue, jobTitleValue) => {
    const filtered = jobApplicants.filter((applicant) => {
      const matchesSearch =
        applicant.name.toLowerCase().includes(searchValue) ||
        applicant.email.toLowerCase().includes(searchValue) ||
        applicant.phone.toLowerCase().includes(searchValue);

      const matchesJobTitle =
        jobTitleValue === "" || applicant.jobTitle === jobTitleValue;

      return matchesSearch && matchesJobTitle;
    });
    setFilteredJobApplicants(filtered);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <button
        onClick={() => setIsCreateModalOpen(true)}
        type="button"
        className="flex items-center justify-center text-white m-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      >
        <svg
          className="h-4 w-4 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          />
        </svg>
        Create new
      </button>

      <div className="flex m-5 space-x-4">
        <input
          type="text"
          placeholder="Search by name, email or phone"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-md w-1/2"
        />
        <select
          value={jobTitleFilter}
          onChange={handleJobTitleFilter}
          className="px-4 py-2 border rounded-md w-1/2"
        >
          <option value="">All Job Titles</option>
          {/* Replace with dynamic job titles if available */}
        {jobs.map((job, index) => (
          <option key={index} value={job.title}>
            {job.title}
          </option>
        ))
        }
        </select>
      </div>

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
            {filteredJobApplicants.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
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
                  <a
                    href={`http://localhost:3001/uploads/documents/${item.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Resume
                    </button>
                  </a>
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
                setIsCreateModalOpen(false);
                fetchAllJobApplicants();
              }}
            />
          </div>
        </div>
      )}
      {isScheduleModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <ScheduleMetting
              jobApplicantId={selectedJobApplicantId}
              onClose={() => setScheduleModalOpen(false)}
              onSave={() => {
                setScheduleModalOpen(false);
                fetchAllJobApplicants();
              }}
            />
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <EditJobApplicant
              jobApplicantId={selectedJobApplicantId}
              onClose={() => setIsEditModalOpen(false)}
              onSave={() => {
                setIsEditModalOpen(false);
                fetchAllJobApplicants();
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
