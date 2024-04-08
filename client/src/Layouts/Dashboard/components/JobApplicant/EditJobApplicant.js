import React, { useState, useEffect } from "react";
import axios from "axios";

function EditJobApplicant({ onClose, onSave, jobApplicantId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    jobTitle: "",
  });

  useEffect(() => {
    const fetchJobApplicantData = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlRFU1QiLCJpYXQiOjE3MTI0MDA3MjV9._02HtBYzx9oSuiAnNRe_FRT-0Oo9Pl74s0SEMuYJ5gQ";
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const res = await axios.get(`http://localhost:3001/jobApplicant/get/${jobApplicantId}`, config);
  
        console.log("API response:", res.data);
        setFormData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJobApplicantData();
  }, [jobApplicantId]);
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlRFU1QiLCJpYXQiOjE3MTI0MDA3MjV9._02HtBYzx9oSuiAnNRe_FRT-0Oo9Pl74s0SEMuYJ5gQ";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios.put(`http://localhost:3001/jobApplicant/update/${jobApplicantId}`, formData, config);
      onSave();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z- p-8">
      <div className="justify-center items-center rounded-lg  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-auto my-6 mx-auto max-w-3xl ">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-blue-50 p-10 outline-none focus:outline-none">
            <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
            <form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="name"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                 
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="email"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="phone"
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="resume"
                  >
                    Resume
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="resume"
                    type="text"
                    placeholder="Resume"
                    name="resume"
                    value={formData.resume}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="jobTitle"
                  >
                    Job Title
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="jobTitle"
                    type="text"
                    placeholder="Job Title"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>
             
              <div className="flex items-center bg-blue-50  justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  onClick={onClose}
                  className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Close
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-950 text-white active:bg-orange-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditJobApplicant;
