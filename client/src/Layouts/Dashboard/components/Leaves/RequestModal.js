import React, { useState } from 'react'

const RequestModal = ({ show, onClose, leaveType }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Logic to submit the leave request, e.g., make an API call
      console.log({ leaveType, startDate, endDate, reason });
      onClose();
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
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">End Date</label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Reason</label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              ></textarea>
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