import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";

function EditEmployee({ token, employeeId, onClose, onSave }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) {
        formData.append("image", image);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.put(
        `http://localhost:3001/employee/${employeeId}`,
        formData,
        config
      );
      
      // Handle successful update
      onSave();
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-8">
      <div className="justify-center items-center rounded-lg flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-auto my-6 mx-auto max-w-3xl ">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-orange-50 p-10 outline-none focus:outline-none">
            <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-base font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full bg-orange-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="image" className="block text-base font-medium leading-6 text-gray-900">
                  Image
                </label>
                <div className="mt-2">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="block w-full bg-orange-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex items-center bg-orange-50 justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  onClick={onClose}
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Close
                </button>
                <button
                  onClick={handleSave}
                  className="bg-orange-950 text-white active:bg-orange-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
