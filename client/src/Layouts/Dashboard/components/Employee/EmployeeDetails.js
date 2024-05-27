import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../../../helper/UserContext";
import { PaperClipIcon } from "@heroicons/react/20/solid";

function EmployeeDetails() {
  const { id } = useParams();
  const { token } = useUser();
  const [employee, setEmployee] = useState(null);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch employee details
        const resEmployee = await axios.get(
          `http://localhost:3001/employee/${id}`,
          config
        );
        
        const employeeData = resEmployee.data;
        const imageFilename = employeeData.image ? employeeData.image.split(/[\\/]/).pop() : '';
        const imageURL = `http://localhost:3001/uploads/${imageFilename}`;

        setEmployee({
          ...employeeData,
          imageURL: imageURL,
        });

        // Fetch manager details if employee has a manager
        if (employeeData.reportsTo) {
          const resManager = await axios.get(
            `http://localhost:3001/employee/${employeeData.reportsTo}`,
            config
          );
          const managerData = resManager.data;
          const managerImageFilename = managerData.image ? managerData.image.split(/[\\/]/).pop() : '';
          const managerImageURL = `http://localhost:3001/uploads/${managerImageFilename}`;

          setManager({
            ...managerData,
            imageURL: managerImageURL,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchEmployeeDetails();
  }, [id, token]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-20">
      <div className="flex">
        <img
          className="w-40 h-40 bg-gray-300 rounded-full mb-4"
          src={employee.imageURL}
          alt=""
        />
        <div className="ml-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {employee.name}
          </h5>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-slate-500">
            {employee.jobTitle || "Unknown Job Title"}
          </h5>
          <p className="mb-1 font-normal text-gray-700">
            Location: {employee.location || "Unknown Location"}
          </p>
        </div>
      </div>
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Employee Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Reports to
          </p>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex">
            {manager ? (
              <>
                <img
                  className="h-12 w-12 rounded-full ring-2 ring-white"
                  src={manager.imageURL}
                  alt="Manager image"
                />
                <h2 className="pl-6 mt-3">{manager.name}</h2>
              </>
            ) : (
              <h2>No Manager</h2>
            )}
          </dd>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Employee ID:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700">
                    {employee.id}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Full name:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700">
                    {employee.name}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Email address:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700">
                    {employee.email}
                  </dd>
                </div>
              </div>
            </div>

            <div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Job Title:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700">
                    {employee.jobTitle || 'Unknown Job Title'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Site:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700">
                    {employee.location || 'Unknown Location'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Salary expectation:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700">
                    $120,000
                  </dd>
                </div>
              </div>
            </div>

            <div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Start Date:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700">
                    {employee.createdAt}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Leave requests:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700">
                    {employee.leaveRequests ? employee.leaveRequests.length : 0}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Is Manager:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700">
                    {employee.isManager ? 'Yes' : 'No'}
                  </dd>
                </div>
              </div>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                About
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {employee.about || 'No additional information available.'}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Attachments
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200"
                >
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          resume_back_end_developer.pdf
                        </span>
                        <span className="flex-shrink-0 text-gray-400">
                          2.4mb
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Download
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          coverletter_back_end_developer.pdf
                        </span>
                        <span className="flex-shrink-0 text-gray-400">
                          4.5mb
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Download
                      </a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
