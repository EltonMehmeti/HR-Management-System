import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/UserContext";

function EditEmployee({ onClose, onSave, employeeId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    image: "",
    reportsTo: null,
  });
  const [employees, setEmployees] = useState([]);
  const { token } = useUser();

  const fetchAllEmployees = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("http://localhost:3001/employee", config);
      const employeesWithImageFilename = res.data.map((employee) => {
        const imageFilename = employee?.image?.split(/[\\/]/).pop();
        return {
          imageFilename,
          ...employee,
        };
      });
      setEmployees(employeesWithImageFilename);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllEmployees();
    }
  }, [token]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`http://localhost:3001/employee/${employeeId}`, config);
        setFormData({
          ...res.data,
          reportsTo: res.data.reportsTo ? res.data.reportsTo : "",
          image: res.data.image,
        });
      } catch (err) {
        console.log(err);
      }
    };
    if (employeeId && token) {
      fetchEmployeeData();
    }
  }, [employeeId, token]);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    const newValue = type === 'file' ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('reportsTo', formData.reportsTo);

      // Only append image if it's a file, not a string (existing image path)
      if (formData.image && typeof formData.image !== 'string') {
        formDataToSend.append('image', formData.image);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      await axios.put(`http://localhost:3001/employee/${employeeId}`, formDataToSend, config);
      onSave();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div className="justify-center items-center rounded-lg flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-4 mx-auto max-w-2xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-blue-50 p-6 outline-none focus:outline-none">
          <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
          <form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="name"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
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
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
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
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="image">
                    Image
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="image"
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleChange}
                  />
                  {formData.image && typeof formData.image === 'string' && (
                    <p className="text-gray-600 text-xs italic">Current image: {formData.image?.split(/[\\/]/).pop()}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="reportsTo">
                    Reports To
                  </label>
                  <select
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="reportsTo"
                    name="reportsTo"
                    value={formData.reportsTo || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select a manager</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
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
