import React, { useState, useEffect } from "react";
import axios from "axios";
import { useModal } from "react-hooks-use-modal";
import { useUser } from "../../../../helper/UserContext";

const Job = () => {
  const [jobs, setJobs] = useState([]);
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
      const response = await axios.get("http://localhost:3001/jobschema");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:3001/jobschema", {
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
      await axios.put(`http://localhost:3001/jobschema/${editingId}`, {
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
      await axios.delete(`http://localhost:3001/jobschema/${id}`);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <button
        onClick={openCreate}
        type="button"
        className="flex items-center justify-center text-white m-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      >
        Create a Job
      </button>
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
