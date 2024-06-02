
import React from 'react';
import { HiChartPie, HiInbox, HiShoppingBag, HiUser, HiTable, HiDocumentText } from "react-icons/hi"; // Import HiDocumentText icon

import { GoOrganization } from "react-icons/go";
import { RiTeamFill } from "react-icons/ri";
import { SiGoogledocs } from "react-icons/si";
import { IoTime } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { FaCalendarAlt,FaSignOutAlt } from "react-icons/fa";
import { useUser } from '../../helper/UserContext';
import Cookies from 'js-cookie';
import logo from './images/logo.png' // Import the logo image

function Sidebar() {
  const { user } = useUser()

  const signout = () => {
    Cookies.remove("user")
    Cookies.remove("token")

    let signInPath = "/signin" // Default sign-in path

    if (user && user.role) {
      switch (user.role) {
        case "employee":
          signInPath = "/employee/signin"
          break
        case "recruiter":
        case "datamanager":
          signInPath = "/hr/signin";
          break;
        case "admin":
        case "superAdmin":
          signInPath = "/admin/signin";
          break;
        default:
          break
      }
    }

    window.location.href = signInPath
  }

  const renderSidebarItems = () => {
    if (!user) return null
    const { role } = user
    switch (role) {
      case "recruiter":
        return (
          <>
           <li>
              <a
                href="/calendar"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaCalendarAlt  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
             
                <span className="flex-1 ms-3 whitespace-nowrap">Calendar</span>
              </a>
            </li>
            <li>
              <a
                href="/jobapplicant"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiShoppingBag className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Job Applicants
                </span>
              </a>
            </li>
            <li>
              <a
                href="/recruit"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiUser className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Recruiting
                </span>
              </a>
            </li>
          

            <li>
              <a
                href="/jobs"  // Change this line to link to the Jobschema page
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiDocumentText className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /> {/* Change the icon here */}
                <span className="flex-1 ms-3 whitespace-nowrap">Jobs</span>
              </a>
            </li>


          </>
        )
      case "data_manager":
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
            <li>
              <a
                href="/teams"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <RiTeamFill className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Teams</span>
              </a>
            </li>
            <li>
              <a  href="/finance" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <CiBank className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Payroll</span>
              </a>
            </li>
            <li>
              <a
                href="/docs"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <SiGoogledocs className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Docs</span>
              </a>
            </li>
          </>
        );
      case 'employee':
        return (
          <>

        
          <li>
              <a
                href="/employee-team"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <RiTeamFill className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">My Team</span>
              </a>
            </li>
            <li>
              <a
                href="/time"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoTime className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Time</span>
              </a>
            </li>
            <li>
              <a
                href="/org"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <GoOrganization className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Org</span>
              </a>
            </li>
          </>
        )
      case "admin":
        return (
          <>
            <li>
              <a
                href="dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <GoOrganization className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Org</span>
              </a>
            </li>
            <li>
              <a
                href="/hr-list"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <GoOrganization className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Hr List</span>
              </a>
            </li>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex ">
      <aside className="top-0 left-0 z-40 w-34 overflow-y-auto bg-gray-50  dark:bg-gray-800">
        <div className="h-full px-3 py-4 ">
          <ul className="space-y-2 font-medium">
            <li className="flex flex-row gap-4 items-center">
              <img src={logo} className="w-10 py-2" alt="logo" />
              <h1 className="font-bold">Cora<span className="text-[#7b68ff]">HR</span></h1>

            </li>
            <li>
            <a
              href="dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <HiChartPie className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ms-3">Dashboard</span>
            </a>
          </li>

            {renderSidebarItems()}
            {user && (
              <>
              <li>
              <a
                href="/public-docs"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <SiGoogledocs className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Public Docs
                </span>
              </a>
            </li>
              <li>
                <span
                  onClick={signout}
                  className="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                  <FaSignOutAlt  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                  <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>

                </span>
              </li>
            </>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );

}

export default Sidebar
