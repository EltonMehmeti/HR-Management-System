import React, { useState, useEffect } from 'react';
import LeaveTypes from './LeaveTypes';
import Request from './Request';
import { useUser } from "../../../../helper/UserContext";

export default function Time() {
  const [activeTab, setActiveTab] = useState('LeaveTypes');
  const { token, user } = useUser();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (user) {
      const imageFilename = user.imageURL ? user.imageURL.split(/[\\/]/).pop() : '';
      const imageURL = `http://localhost:3001/uploads/${imageFilename}`;
      setUserDetails({ ...user, imageURL: imageURL });
    }
  }, [user]);

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700 m-10">
        <div className='flex p-2 ml-5'>
          {userDetails && userDetails.imageURL && (
            <img
              className="h-16 w-16 rounded-full ring-2 ring-white"
              src={userDetails.imageURL}
              alt="User Avatar"
            />
          )}
          <h2 className="pl-6 mt-5 text-lg">{userDetails?.name}</h2>
        </div>
      
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2 ">
            <button
              onClick={() => setActiveTab('LeaveTypes')}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
                activeTab === 'LeaveTypes' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'border-transparent'
              }`}
            >
              LeaveTypes
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('Request')}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
                activeTab === 'Request' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'border-transparent'
              }`}
            >
              Request
            </button>
          </li>
        </ul>
      </div>
      <div className="p-4 ml-6">
        {activeTab === 'LeaveTypes' && <LeaveTypes token={token} user={userDetails} />}
        {activeTab === 'Request' && <Request />}
      </div>
    </div>
  );
}
