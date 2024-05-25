import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../../../helper/UserContext";
import { PaperClipIcon } from "@heroicons/react/20/solid";

function EmployeeDetails() {
  const { id } = useParams(); // Accessing route parameters using useParams hook
  const { token } = useUser();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(
          `http://localhost:3001/employee/${id}`,
          config
        );

        console.log("Response data:", res.data); // Debugging log

        // Extract the image filename from the response data
        const imageFilename = res.data.image.split(/[\\/]/).pop();

        console.log("Image filename:", imageFilename); // Debugging log

        // Construct the image URL
        const imageURL = `http://localhost:3001/uploads/${imageFilename}`;

        console.log("Image URL:", imageURL); // Debugging log

        // Update the state with the employee details including the image URL
        setEmployee({
          ...res.data,
          imageURL: imageURL,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchEmployeeDetails();
  }, [id, token]);

  if (!employee) {
    return <div>Loading...</div>; // Add loading indicator while fetching data
  }

  return (
    <div className=" p-20">
      <div className="flex">
        <img
          className="w-40 h-40 bg-gray-300 rounded-full mb-4"
          src={employee.imageURL}
          alt=""
        />
        <div className="ml-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {employee.name}
          </h5>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-slate-500 ">
            Front End Developer{" "}
          </h5>
          <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
            Location: Prishtinaa
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
            <img
              className=" h-12 w-12 rounded-full ring-2 ring-white"
              src={employee.imageURL}
              alt="Employee image"
            />
            <h2 className="pl-6 mt-3">Joe doe</h2>
          </dd>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">
                    Employee ID:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {employee.id}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">
                    Full name:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {employee.name}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">
                    Email address:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {employee.email}
                  </dd>
                </div>
              </div>
            </div>

            <div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">
                    Job Title:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Backend Developer
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">
                    Site:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Prishtina
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">
                    Salary expectation:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    $120,000
                  </dd>
                </div>
              </div>
            </div>

            <div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">
                   Start Date:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {employee.createdAt}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">
                    Leavs requests:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    2
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">
                    Is Manager:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    No
                  </dd>
                </div>
              </div>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                About
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
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
