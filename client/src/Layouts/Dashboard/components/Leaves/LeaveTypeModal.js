import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../../helper/UserContext';

const LeaveTypeModal = ({ isOpen, onClose }) => {
  const { token } = useUser(); // Assuming useUser hook provides token
  const [name, setName] = useState('');
  const [days, setDays] = useState('');

  useEffect(() => {
    setName('');
    setDays('');
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post('http://localhost:3001/leaveTypes', { name, days }, config);
      // Optionally, you can close the modal after successful creation
      onClose();
    } catch (err) {
      console.error('Error creating leave type:', err);
    }
  };

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create Leave Type</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="days" className="block text-gray-700">Days</label>
            <input type="number" id="days" value={days} onChange={(e) => setDays(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md" />
          </div>
          <div className="flex justify-end">
            <button type="button" className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveTypeModal;
