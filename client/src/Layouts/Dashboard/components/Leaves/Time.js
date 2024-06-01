import React, { useState } from 'react';
import LeaveTypes from './LeaveTypes';
import Request from './Request';
import { useUser } from "../../../../helper/UserContext";

export default function Time() {
  const [activeTab, setActiveTab] = useState('LeaveTypes');
  const { token, user } = useUser();

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700 m-10">
        <div className='flex p-2 ml-5'>
        <img
                  className="h-16 w-16 rounded-full ring-2 ring-white"
                  src={user?.imageURL}
                />
                <h2 className="pl-6 mt-5 text-lg">{user?.name}</h2>
        </div>
      
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('LeaveTypes')}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
                activeTab === 'LeaveTypes' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'border-transparent'
              }`}
            >
              <svg
                className={`w-4 h-4 mr-2 ${activeTab === 'LeaveTypes' ? 'text-blue-600 dark:text-blue-500' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
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
              <svg
                className={`w-4 h-4 mr-2 ${activeTab === 'Request' ? 'text-blue-600 dark:text-blue-500' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              Request
            </button>
          </li>
        </ul>
      </div>
      <div className="p-4">
        {activeTab === 'LeaveTypes' && <LeaveTypes token={token} user={user} />}
        {activeTab === 'Request' && <Request />}
      </div>
    </div>
  );
}
