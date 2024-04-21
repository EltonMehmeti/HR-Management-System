import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ScheduleMetting({ onClose, onSave, jobApplicantId }) {

    const { token,user } = useUser();


const [formData, setFormData] = useState({
    title: "",
 date:"",
    time: "",
    duration: "",
    agenda: "",
    recruiterId: null,
    name: "", email: "", phone: "", resume: "", jobTitle: ""
});

  useEffect(() => {
    const fetchJobApplicantData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const res = await axios.get(`http://localhost:3001/jobApplicant/get/${jobApplicantId}`, config);
      
        setFormData(res.data);
        setFormData(formData => ({ ...formData, recruiterId: user?.id }));
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
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      setFormData(formData => ({ ...formData, recruiterId: user?.id }));
      console.log(formData.recruiterId);
      await axios.post('http://localhost:3001/recruitment', formData, config);
      toast.success("Meeting scheduled successfully");
      toast.success("Mail sent successfully");
      onSave();
    } catch (err) {
      toast.error(err.response.data.error)
      console.log(err);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z- p-8">
      <ToastContainer/>
      <div className="justify-center items-center rounded-lg  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-auto my-6 mx-auto max-w-3xl ">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-blue-50 p-10 outline-none focus:outline-none">
            <h2 className="text-xl font-semibold mb-4">Schedule a meeting</h2>
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
                    id="title"
                    type="text"
                    placeholder="Title of meeting"
                    name="title"
                    onChange={handleChange}
                  />
                 
                </div>
                <div className="w-full md:w-1/2 px-3">
    <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="start_time"
    >
        Start Time
    </label>
<div className="flex">
    <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-2"
        id="date"
        type="date"
        placeholder="Date"
        name="date" 
        onChange={handleChange}
    />
    <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="time"
        type="time"
        placeholder="Time"
        name="time"  
        onChange={handleChange}
    />
</div>

</div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="phone"
                  >
                    Duration
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="duration"
                    type="number"
                    placeholder="Duration"
                    name="duration"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="resume"
                  >
                    Agenda
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="agenda"
                    type="text"
                    placeholder="Agenda"
                    name="agenda"
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

export default ScheduleMetting;
