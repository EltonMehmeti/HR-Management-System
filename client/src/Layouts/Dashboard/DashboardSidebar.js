import React from 'react';
import { HiChartPie, HiInbox, HiShoppingBag, HiUser, HiTable } from "react-icons/hi";
import { GoOrganization } from "react-icons/go";
import { RiTeamFill } from "react-icons/ri";

import { useUser } from '../../helper/UserContext';
import Cookies from 'js-cookie';
import logo from './images/logo2.png'
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
                href="/recruit"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiUser className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Recruiting</span>
              </a>
            </li>
            <li>
              <a
                href="/jobapplicant"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiShoppingBag className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Job Applicants</span>
              </a>
            </li>
          </>
        );
      case 'data_manager':
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
          </>
        );
      case 'employee':
        return (
          <>
          <li>
            <a
              href="dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <HiChartPie className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ms-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <GoOrganization  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ms-3">Org</span>
            </a>
          </li>
          </>

        );
      default:
        return null;
    }
  };

  return (
    <div className="flex">
<aside className="top-0 left-0 z-40 w-34 overflow-y-auto bg-gray-50 dark:bg-gray-800">
    <div className="h-full px-3 py-4">
          <ul className="space-y-2 font-medium">
            <li className="flex flex-row gap-4 items-center">
              <img src="/static/media/logo2.b170189c90789401638e.png" className="w-10 py-2" alt="logo" />
              <h1 className="font-bold">Cora<span className="text-[#7b68ff]">HR</span></h1>
            </li>
            <li>
  <a
    href="/calendar"
    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
  >
    <img
      width={20}
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiB0ZXh0LWluZGlnby02MDAgbWF4LWgtNSBtYXgtdy01IiBhcmlhLWhpZGRlbj0idHJ1ZSI+PHBhdGggZD0iTTEyLjc1IDEyLjc1YS43NS43NSAwIDEgMS0xLjUgMCAuNzUuNzUgMCAwIDEgMS41IDBaTTcuNSAxNS43NWEuNzUuNzUgMCAxIDAgMC0xLjUuNzUuNzUgMCAwIDEgMS41IDBaTTguMjUgMTcuMjVhLjc1Ljc1IDAgMSAxLTEuNSAwIC43NS43NSAwIDAgMSAxLjUgMFpNOS43NSAxNS43NWEuNzUuNzUgMCAxIDAgMC0xLjUuNzUuNzUgMCAwIDAgMCAxLjVaTTguMjUgMTcuMjVhLjc1Ljc1IDAgMSAxLTEuNSAwIC43NS43NSAwIDAgMSAxLjUgMFpNMTAuNSAxNy4yNWEuNzUuNzUgMCAxIDEtMS41IDAgLjc1Ljc1IDAgMCAxIDEuNSAwWk0xMi43NSAxNS43NWEuNzUuNzUgMCAxIDAtMS41IDAgLjc1Ljc1IDAgMCAxIDAgMS41WiIgY2xpcC1ydWxlPSJldmVub2RkIj48L3BhdGg+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNi43NSAyLjI1QS43NS43NSAwIDAgMSA3LjUgM3YxLjVoOVo3LjVhLjc1Ljc1IDAgMCAxIDAgMyAwIDEgMSAydjEuNWg5VjNhLjc1Ljc1IDAgMCAxIC43NS0uNzV6TTExLjI1IDE1Ljc1YS43NS43NSAwIDEgMSAxLjUgMCAuNzUuNzUgMCAwIDEgMS41IDBaTTE0LjI1IDE1Ljc1YS43NS43NSAwIDEgMC0xLjUuNzUuNzUgMCAwIDAgMS41Wk0xNSAxMi43NWEuNzUuNzUgMCAxIDAtMS41IDAgLjc1Ljc1IDAgMCAxIDEuNSAwWk0xNi41IDEzLjVhLjc1Ljc1IDAgMSAwIDAtMS41Ljc1Ljc1IDAgMCAwIDAgMS41WiI+PC9wYXRoPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTYuNzUgMi4yNUEuNzUuNzUgMCAwIDEgNy41IDN2MS41aDlWM0EuNzUuNzUgMCAwIDEgMTggM3YxLjVoLjc1YTMgMyAwIDAgMSAzIDN2MTEuMjVhMyAzIDAgMCAxLTMgM0g1LjI1YTMgMyAwIDAgMS0zLTNWNy41YTMgMyAwIDAgMSAzLTNINlYzYS43NS43NSAwIDAgMSAuNzUtLjc1Wm0xMy41IDlhMS41IDEuNSAwIDAgMC0xLjUtMS41SDUuMjVhMS41IDEuNSAwIDAgMC0xLjUgMS41djcuNWExLjUgMS41IDAgMCAwIDEuNSAxLjVoMTMuNWExLjUgMS41IDAgMCAwIDEuNS0xLjV2LTcuNVoiIGNsaXAtcnVsZT0iZXZlbm9kZCI+PC9wYXRoPjwvc3ZnPg=="
      alt="Calendar Icon"
    />
    <span className="flex-1 ms-3 whitespace-nowrap">Calendar</span>
  </a>
</li>

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
    </div>
    
  );
}

export default Sidebar;
