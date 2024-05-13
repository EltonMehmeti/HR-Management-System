import axios from "axios"
import React, { useEffect, useState } from "react" // Import useState from React
import { useModal } from "react-hooks-use-modal"
import { useUser } from "../../../../../helper/UserContext"

const HRList = () => {
  const [HRList, setHRList] = useState([])
  const [role, setRole] = useState("")
  const [editingId, setEditingId] = useState(null)
  const { token } = useUser()

  const [EditModal, openEdit, closeEdit, isOpenEdit] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: true,
  })

  useEffect(() => {
    if (token) {
      fetchHRList()
    }
  }, [token])

  const fetchHRList = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.get(
        "http://localhost:3001/hrPersonnel",
        config
      )
      console.log("Fetched HrPersonnel:", response.data)
      setHRList(response.data)
    } catch (error) {
      console.error("Error fetching HrPersonnel:", error)
    }
  }

  const handleEdit = HRList => {
    setRole(HRList.role)
    setEditingId(HRList.id)
    openEdit()
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/hrPersonnel/${editingId}`, {
        role,
      })
      setRole("")
      setEditingId(null)
      fetchHRList()
      closeEdit()
    } catch (error) {
      console.error("Error updating HRList:", error)
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Email
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Role
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {HRList.map(HRList => (
            <tr key={HRList.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-normal text-gray-900">
                {HRList.name}
              </td>
              <td className="px-6 py-4">{HRList.email}</td>
              <td className="px-6 py-4">
                {HRList.role ? (
                  HRList.role
                ) : (
                  <p className="italic">Role not assigned</p>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex">
                  <a
                    onClick={() => handleEdit(HRList)}
                    className="cursor-pointer mr-3 text-indigo-600 hover:text-indigo-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                      x-tooltip="tooltip"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditModal>
        <div className="overflow-auto rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Assign Role
          </h3>
          <form
            onSubmit={e => {
              e.preventDefault()
              handleUpdate()
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="team-leader"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Role
              </label>
              <select
                id="role"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value="">Assign a Role</option>
                <option value="admin">Admin</option>
                <option value="data_manager">Data Manager</option>
                <option value="hr_personnel">HR Personnel</option>
                <option value="recruiter">Recruiter</option>
                <option value="employee">Employee</option>
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
                Save
              </button>
            </div>
          </form>
        </div>
      </EditModal>
    </div>
  )
}

export default HRList
