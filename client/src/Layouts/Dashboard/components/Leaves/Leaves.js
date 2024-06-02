import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../../helper/UserContext';
import LeaveTypeModal from './LeaveTypeModal'; // Import LeaveTypeModal component

const Leaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const { token } = useUser(); // Assuming useUser hook provides token

  useEffect(() => {
    if (token) {
      const fetchLeaveRequests = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const res = await axios.get('http://localhost:3001/leaveRequests', config);
          setLeaveRequests(res.data);
        } catch (err) {
          console.error('Error fetching leave requests:', err);
        }
      };
      fetchLeaveRequests();
    }
  }, [token]);

  const handleStatusChange = async (id, status, comments = '') => {
    console.log('Changing status for request ID:', id); // Debugging step
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`http://localhost:3001/leaveRequests/${id}/status`, { status, comments }, config);
      setLeaveRequests(prevState => prevState.map(request => request.id === id ? { ...request, status, comments } : request));
    } catch (err) {
      console.error('Error updating leave request status:', err);
    }
  };

  const createLeaveType = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // You can adjust the endpoint and request body according to your server implementation
      await axios.post('http://localhost:3001/leaveTypes', { name: 'New Leave Type' }, config);
      // Optionally, you can fetch leave types again to update the state with the newly created leave type
      // fetchLeaveTypes();
    } catch (err) {
      console.error('Error creating leave type:', err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Leave Requests</h1>
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        Create Leave Type
      </button>
      <LeaveTypeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> {/* Render LeaveTypeModal */}
      {leaveRequests.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        leaveRequests.map((request) => (
          <div
            key={request.id}
            className="flex justify-between items-center p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {request.leaveType?.name || 'No Leave Type'} - {request.employee?.name || 'No Employee'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {`From: ${new Date(request.startDate).toLocaleDateString()} To: ${new Date(request.endDate).toLocaleDateString()}`}
              </p>
              <p className="text-gray-500 dark:text-gray-400">Reason: {request.reason}</p>
              <p className={`font-semibold ${request.status === 'Approved' ? 'text-green-500' : request.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                Status: {request.status}
              </p>
              {request.comments && (
                <p className="text-gray-500 dark:text-gray-400">Comments: {request.comments}</p>
              )}
            </div>
            <div>
              <button
                onClick={() => handleStatusChange(request.id, 'Approved')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange(request.id, 'Rejected')}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Leaves;
