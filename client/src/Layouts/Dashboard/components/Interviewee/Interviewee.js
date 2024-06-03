import React, { useEffect, useState } from "react"
import axios from "axios"
import { useUser } from "../../../../helper/UserContext"

const Interviewees = () => {
  const [interviewees, setInterviewees] = useState([])
  const { token } = useUser()

  const fetchInterviewees = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.get("http://localhost:3001/interviewee", config)
      setInterviewees(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (token) {
      fetchInterviewees()
    }
  }, [token])

  return (
    <div className="m-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {interviewees.map(interviewee => (
          <div
            key={interviewee.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="rounded-full bg-gray-300 h-10 w-10 flex items-center justify-center">
                  {interviewee.name[0]}
                </div>
                <h2 className="text-xl font-semibold ml-3">
                  {interviewee.name}
                </h2>
              </div>
              <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-sm">
                {interviewee.status.replace("_", " ")}
              </span>
            </div>
            <p className="text-gray-600 mb-1">
              <strong>Email:</strong> {interviewee.email}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Phone:</strong> {interviewee.phone}
            </p>
            <p className="text-gray-600">
              <strong>Job Title:</strong> {interviewee.jobTitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Interviewees
