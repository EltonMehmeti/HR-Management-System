import React from 'react';
import { HiChartPie, HiInbox, HiShoppingBag, HiUser, HiTable } from "react-icons/hi";
import { useUser } from '../../helper/UserContext';
import Cookies from 'js-cookie';

function Sidebar() {
  const { user } = useUser();

  const signout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    window.location.href = '/hr/signin';
  };

  const renderSidebarItems = () => {
    if (!user) return null;

    const { role } = user;
console.log(role);
    switch (role) {
      case 'recruiter':
        return (
          <>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiUser className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Recruiting</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiShoppingBag className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Job Applicants</span>
              </a>
            </li>
          </>
        );
      case 'datamanager':
        return (
          <>
            <li>
              <a
                href="/employee"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiShoppingBag className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Employees</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiInbox className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Leaves</span>
              </a>
            </li>
          </>
        );
      case 'employee':
        return (
          <li>
            <a
              href="dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <HiChartPie className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ms-3">Dashboard</span>
            </a>
          </li>
        );
      default:
        return null;
    }
  };

  return (
    <aside
      id="default-sidebar"
      className="top-0 left-0 z-40 w-64 h-screen overflow-y-auto bg-gray-50 dark:bg-gray-800"
    >
      <div className="h-full px-3 py-4">
        <ul className="space-y-2 font-medium">
          {renderSidebarItems()}
          {user && (
            <li>
              <span
                onClick={signout}
                className="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiTable className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </span>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
