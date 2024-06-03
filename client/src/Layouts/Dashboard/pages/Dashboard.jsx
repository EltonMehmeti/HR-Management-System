import React from 'react';
import RoleBasedComponent from '../../../helper/RoleBasedComponent';
import Stats from '../components/Stats/data_Stats';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <RoleBasedComponent roles={['admin']}>
          <div>Admin and Data Manager specific content</div>
        </RoleBasedComponent>
        <RoleBasedComponent roles={['employee']}>
          <div>Employee specific content</div>
        </RoleBasedComponent>
        <RoleBasedComponent roles={['recruiter']}>
          <div className="w-full max-w-4xl rounded-xl bg-white p-8 mb-6" id="widget">
            <h6 className="text-xs text-gray-400">Total earnings</h6>
            <div className="mt-2 flex text-xl font-semibold">
              <span>$27,956</span>
              <span className="ml-2 flex items-center text-xs text-green-500">
                31%
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  ></path>
                </svg>
              </span>
            </div>
            <div className="mt-8 flex space-x-2">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                <div key={index} className="group relative flex flex-col items-center space-y-2">
                  <div className="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block">
                    {Math.floor(Math.random() * 20) + 1}
                  </div>
                  <div className="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer">
                    <div className={`h-${Math.floor(Math.random() * 32) + 1} w-3 rounded-full bg-blue-500`}></div>
                  </div>
                  <div className="text-xs text-gray-500">{month}</div>
                </div>
              ))}
            </div>
          </div>
        </RoleBasedComponent>

        <RoleBasedComponent roles={['data_manager']}>
          <div className="w-full max-w-4xl rounded-xl bg-white p-8" id="widget">
            <Stats />
          </div>
        </RoleBasedComponent>
      </div>
    </div>
  );
};

export default Dashboard;
