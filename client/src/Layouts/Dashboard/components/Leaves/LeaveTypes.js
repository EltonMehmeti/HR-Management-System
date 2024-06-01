import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/UserContext";

const LeaveTypes = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const { token, user } = useUser(); // Assuming useUser hook provides token and user details

  const fetchLeaveTypes = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("http://localhost:3001/leaveTypes", config);
      setLeaveTypes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchLeaveTypes();
    }
  }, [token]);

  const handleRequestLeave = (leaveType) => {
    // Logic to open a request leave form or redirect to a request leave page
    console.log("Request leave button clicked for:", leaveType);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Leave Types</h1>
      {leaveTypes.map((leaveType) => (
        <div
          key={leaveType.id}
          className="flex justify-between items-center p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{leaveType.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">Days: {leaveType.days}</p>
          </div>
          <button
            onClick={() => handleRequestLeave(leaveType)}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Request Leave
          </button>
        </div>
      ))}
    </div>
  );
};

export default LeaveTypes;
