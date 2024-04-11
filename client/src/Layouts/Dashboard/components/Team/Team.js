import React, { useEffect, useState } from "react"
import axios from "axios"

const Team = () => {
  const [teams, setTeams] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [leaderId, setLeaderId] = useState("")
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchTeams()
  }, [])

  const fetchTeams = async () => {
    try {
      const response = await axios.get("http://localhost:3001/team")
      setTeams(response.data)
    } catch (error) {
      console.error("Error fetching teams:", error)
    }
  }

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:3001/team", { name, description })
      setName("")
      setDescription("")
      setLeaderId("")
      fetchTeams()
    } catch (error) {
      console.error("Error creating team:", error)
    }
  }

  const handleEdit = team => {
    setName(team.name)
    setDescription(team.description)
    setEditingId(team.id)
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/team/${editingId}`, {
        name,
        description,
      })
      setName("")
      setDescription("")
      setLeaderId("")
      setEditingId(null)
      fetchTeams()
    } catch (error) {
      console.error("Error updating team:", error)
    }
  }

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:3001/team/${id}`)
      fetchTeams()
    } catch (error) {
      console.error("Error deleting team:", error)
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <button
        type="button"
        class="flex items-center justify-center text-white m-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      >
        <svg
          class="h-4 w-4 mr-2"
          fill="currentColor"
          viewbox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          />
        </svg>
        Create a Team
      </button>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Description
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {teams.map(team => (
            <tr key={team.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-normal text-gray-900">
                {team.name}
              </td>
              <td className="px-6 py-4">{team.description}</td>
              <td className="px-6 py-4">
                <div className="flex">
                  <a
                    onClick={() => handleEdit(team)}
                    className="cursor-pointer mr-3 text-indigo-600 hover:text-indigo-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-6 w-6"
                      x-tooltip="tooltip"
                    >
                      {" "}
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </a>

                  <a
                    onClick={() => handleDelete(team.id)}
                    className="cursor-pointer text-red-600 hover:text-red-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-6 w-6"
                      x-tooltip="tooltip"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Team
