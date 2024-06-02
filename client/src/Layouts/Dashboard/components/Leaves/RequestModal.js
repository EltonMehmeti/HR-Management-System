import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestModal = ({ show, onClose, leaveType, employeeID }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    hrPersonnelID: '' // Add hrPersonnelID to formData
  });
  const [hrPersonnelList, setHrPersonnelList] = useState([]);

  useEffect(() => {
    // Fetch HR personnel list
    const fetchHrPersonnel = async () => {
      try {
        const response = await axios.get("http://localhost:3001/hrPersonnel"); // Update with your endpoint
        setHrPersonnelList(response.data);
      } catch (error) {
        console.error('Error fetching HR personnel:', error);
      }
    };

    if (show) {
      fetchHrPersonnel();
    }
  }, [show]);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/leaveRequests", {
        leaveTypeID: leaveType.id,
        employeeID, // Ensure employeeID is passed
        ...formData
      });
      console.log('Leave request submitted successfully:', response.data);
      onClose();
    } catch (error) {
      console.error('Error submitting leave request:', error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Request Leave for {leaveType.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded-md"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded-md"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Reason</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">HR Personnel</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md"
              name="hrPersonnelID"
              value={formData.hrPersonnelID}
              onChange={handleChange}
              required
            >
              <option value="">Select HR Personnel</option>
              {hrPersonnelList.map((hr) => (
                <option key={hr.id} value={hr.id}>
                  {hr.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;
