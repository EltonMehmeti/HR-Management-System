import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../../../helper/UserContext';

const Request = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const { token, user } = useUser(); // Assuming useUser hook provides token and user details

  const fetchLeaveRequests = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(`http://localhost:3001/leaveRequests/${user.id}`, config);
      console.log('Response data:', res.data); 
      setLeaveRequests(res.data);
      console.log(leaveRequests)
    } catch (err) {
      console.error('Error fetching leave requests:', err);
    }
  };

  useEffect(() => {
    if (token && user) {
      fetchLeaveRequests();
    }
  }, [token, user]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Leave Requests</h1>
      {leaveRequests.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        leaveRequests.map((request) => (
          <div
            key={request.id}
            className="flex justify-between items-center p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <div>
              {/* <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {request.LeaveType.name}
              </h2> */}
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
          </div>
        ))
      )}
    </div>
  );
};

export default Request;
