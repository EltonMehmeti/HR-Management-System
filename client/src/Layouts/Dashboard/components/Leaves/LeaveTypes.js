import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/UserContext";

const LeaveTypes = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const { token } = useUser(); // Assuming useUser hook provides token and user details

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
    <div className="relative overflow-x-auto">
      <h1 className="text-xl font-bold mb-4">Leave Types</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Leave Type</th>
            <th scope="col" className="px-6 py-3">Days</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveTypes.map((leaveType) => (
            <tr key={leaveType.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {leaveType.name}
              </th>
              <td className="px-6 py-4">{leaveType.days}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleRequestLeave(leaveType)}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  Request Leave
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTypes;
