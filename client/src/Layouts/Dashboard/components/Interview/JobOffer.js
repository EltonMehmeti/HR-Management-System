import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library
import { useUser } from '../../../../helper/UserContext';

const JobOffer = ({ onClose, intervieweeId }) => {
  const [file, setFile] = useState(null);
  const { token } = useUser();

  const handleSave = async () => {
    try {
      if (!token) return;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };
      const formData = new FormData();
      formData.append('file', file); // Ensure this matches the field name in Multer
      formData.append('intervieweeId', intervieweeId);
  
      const response = await axios.post('http://localhost:3001/recruitment/interviewee/jobOffer', formData, config);
  
      console.log('Job offer created:', response.data);
      onClose();
    } catch (error) {
      console.error('Error creating job offer:', error);
    }
  };
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file); // Save the actual file object
    }
  };

  const onCloseHandler = () => {
    if (!file) {
      alert('Please upload a file');
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-8">
      <div className="justify-center items-center rounded-lg flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-blue-50 p-10 outline-none focus:outline-none">
            <h2 className="text-xl font-semibold mb-4">Upload a Job Offer</h2>

            <form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="file"
                  >
                    Job Offer
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="file"
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="flex items-center bg-blue-50 justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
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
};

export default JobOffer;
