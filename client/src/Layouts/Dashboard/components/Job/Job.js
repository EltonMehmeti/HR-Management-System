import React, { useState, useEffect } from "react";
import axios from "axios";
import { useModal } from "react-hooks-use-modal";
import { useUser } from "../../../../helper/UserContext";

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { token } = useUser();

  const [CreateModal, openCreate, closeCreate, isOpenCreate] = useModal(
    "root",
    {
      preventScroll: true,
      closeOnOverlayClick: true,
    }
  );

  const [EditModal, openEdit, closeEdit, isOpenEdit] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: true,
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/job", {
        params: { search: searchQuery }, // Pass search query as parameter to API
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Function to handle search query change
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:3001/job", {
        title,
        description,
        location,
        salary,
        requirements,
      });
      setTitle("");
      setDescription("");
      setLocation("");
      setSalary("");
      setRequirements([]);
      fetchJobs();
      closeCreate();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const handleEdit = (job) => {
    setTitle(job.title);
    setDescription(job.description);
    setLocation(job.location);
    setSalary(job.salary);
    setRequirements(job.requirements);
    setEditingId(job._id);
    openEdit();
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/job/${editingId}`, {
        title,
        description,
        location,
        salary,
        requirements,
      });
      setTitle("");
      setDescription("");
      setLocation("");
      setSalary("");
      setRequirements([]);
      setEditingId(null);
      fetchJobs();
      closeEdit();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/job/${id}`);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  const handleSearch = () => {
    const filteredJobs = jobs.filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setJobs(filteredJobs);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    fetchJobs(); // Reset jobs to original list
  };
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">

      <div className="flex flex-row  justify-between items-center">
      <button
        onClick={openCreate}
        type="button"
        className="flex items-center justify-center text-white m-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      >
        Create a Job
      </button>
      <div className="flex flex-row">
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg onClick={handleClearSearch} class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input    value={searchQuery}           onChange={(e) => setSearchQuery(e.target.value)}
 type="search" id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
        <button onClick={handleSearch}  class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
   
      
          </div>
      </div>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
    
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Title
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Description
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Location
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Salary
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Requirements
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {jobs.map((job) => (
            <tr key={job._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-normal text-gray-900">
                {job.title}
              </td>
              <td className="px-6 py-4">{job.description}</td>
              <td className="px-6 py-4">{job.location}</td>
              <td className="px-6 py-4">{job.salary}</td>
              <td className="px-6 py-4">{job.requirements.join(", ")}</td>
              <td className="px-6 py-4">
                <div className="flex">
                  <button
                    onClick={() => handleEdit(job)}
                    className="mr-3 text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreateModal>
        <div className="overflow-auto rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Create Job
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-2 px-3 py-2 border rounded-lg w-full"
              placeholder="Title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-2 px-3 py-2 border rounded-lg w-full"
              placeholder="Description"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mb-2 px-3 py-2 border rounded-lg w-full"
              placeholder="Location"
            />
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="mb-2 px-3 py-2 border rounded-lg w-full"
              placeholder="Salary"
            />
            <input
              type="text"
              value={requirements.join(", ")}
              onChange={(e) => setRequirements(e.target.value.split(", "))}
              className="mb-2 px-3 py-2 border rounded-lg w-full"
              placeholder="Requirements (comma-separated)"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </form>
        </div>
      </CreateModal>


      <EditModal>
        <div className="overflow-auto rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Edit Job
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-2 px-3 py-2 border rounded-lg w-full"
              placeholder="Title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-2 px-3 py-2 border rounded-lg w-full"
              placeholder="Description"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mb-2 px-3 py-2 border rounded-lg w-full"
              placeholder="Location"
            />
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="mb-2 px-3 py-2 border rounded-lg w-full"
              placeholder="Salary"
            />
            <input
              type="text"
              value={requirements.join(", ")}
              onChange={(e) => setRequirements(e.target.value.split(", "))}
              className="mb-2 px-3 py-2 border rounded-lg w-full"
              placeholder="Requirements (comma-separated)"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </form>
        </div>
      </EditModal>
    </div>
  );
};

export default Job;
