import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../../../helper/UserContext';

const Leaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Leave Requests</h1>
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
                {request.LeaveType?.name || 'No Leave Type'} - {request.Employee?.name || 'No Employee'}
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
