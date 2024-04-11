import React, { useEffect, useState } from "react"
import axios from "axios"
import { useModal } from "react-hooks-use-modal"
import { useUser } from "../../../../helper/UserContext"

const Team = () => {
  const [teams, setTeams] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [leaderId, setLeaderId] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [employees, setEmployees] = useState([])
  const { token } = useUser()

  const [CreateModal, openCreate, closeCreate, isOpenCreate] = useModal(
    "root",
    {
      preventScroll: true,
      closeOnOverlayClick: true,
    }
  )

  const [EditModal, openEdit, closeEdit, isOpenEdit] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: true,
  })

  const fetchEmployees = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.get("http://localhost:3001/employee", config)
      setEmployees(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (token) {
      fetchEmployees()
    }
  }, [token])
  useEffect(() => {
    fetchTeams()
  }, [])

  const fetchTeams = async () => {
    try {
      const response = await axios.get("http://localhost:3001/team")
      console.log("Fetched Teams:", response.data)
      setTeams(response.data)
    } catch (error) {
      console.error("Error fetching teams:", error)
    }
  }

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:3001/team", {
        name,
        description,
        leaderId,
      })
      setName("")
      setDescription("")
      setLeaderId("")
      fetchTeams()
      closeCreate()
    } catch (error) {
      console.error("Error creating team:", error)
    }
  }

  const handleEdit = team => {
    setName(team.name)
    setDescription(team.description)
    setLeaderId(team.leaderId)
    setEditingId(team.id)
    openEdit()
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/team/${editingId}`, {
        name,
        description,
        leaderId,
      })
      setName("")
      setDescription("")
      setLeaderId("")
      setEditingId(null)
      fetchTeams()
      closeEdit()
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
        onClick={openCreate}
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
              Team Leader
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
                {team.teamLeader?.name || "No leader assigned"}
              </td>
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
      <CreateModal>
        <div className="overflow-auto rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Create Team
          </h3>
          <form
            onSubmit={e => {
              e.preventDefault()
              handleCreate()
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="team-name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                id="team-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Team Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="team-description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="team-description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="A brief description of the team"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="team-leader"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Team Leader
              </label>
              <select
                id="team-leader"
                value={leaderId}
                onChange={e => setLeaderId(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value="">Select a Leader</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={closeCreate}
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Create Team
              </button>
            </div>
          </form>
        </div>
      </CreateModal>
      <EditModal>
        <div className="overflow-auto rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Edit Team
          </h3>
          <form
            onSubmit={e => {
              e.preventDefault()
              handleUpdate()
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="team-name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                id="team-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Team Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="team-description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="team-description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="A brief description of the team"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="team-leader"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Team Leader
              </label>
              <select
                id="team-leader"
                value={leaderId}
                onChange={e => setLeaderId(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value="">Select a Leader</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={closeEdit}
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Edit Team
              </button>
            </div>
          </form>
        </div>
      </EditModal>
    </div>
  )
}

export default Team
