import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/UserContext";
import RequestModal from "./RequestModal";

const LeaveTypes = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
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
    setSelectedLeaveType(leaveType);
    setShowModal(true);
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
      <RequestModal
        show={showModal}
        onClose={() => setShowModal(false)}
        leaveType={selectedLeaveType}
      />
    </div>
  );
};

export default LeaveTypes;
