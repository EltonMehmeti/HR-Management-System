import React, { useEffect, useState } from "react";
import axios from "axios";
import { useModal } from "react-hooks-use-modal";
import { useUser } from "../../../../helper/UserContext";

const Docs = () => {
  const { token } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    filePath: null,
    status: "private", // Assuming default status is private
  });
  const [docs, setDocs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [CreateModal, openCreate, closeCreate] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: true,
  });

  const [EditModal, openEdit, closeEdit, isOpenEdit] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: true,
  });

  const fetchDocs = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("http://localhost:3001/docs", config);
      setDocs(response.data);
    } catch (error) {
      console.error("Error fetching docs:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDocs();
    }
  }, [token]);

  console.log(docs);

  // Search functionality
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredDocs = docs.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleChange = event => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = event => {
    const file = event.target.files[0]
    setFormData({ ...formData, filePath: file })
  }

  const handleCreate = async () => {
    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("filePath", formData.filePath)
      formDataToSend.append("status", formData.status)

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }

      await axios.post("http://localhost:3001/docs", formDataToSend, config)
      fetchDocs()
      closeCreate()
    } catch (error) {
      console.error("Error creating document:", error)
    }
  }

  const handleEdit = doc => {
    // Set the formData state to the values of the document being edited
    setFormData({
      name: doc.name,
      filePath: doc.filePath,
      status: doc.status,
    })
    setEditingId(doc.id)
    // Open the edit modal
    openEdit()
  }

  const handleUpdate = async () => {
    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("filePath", formData.filePath)
      formDataToSend.append("status", formData.status)

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }

      await axios.put(
        `http://localhost:3001/docs/${editingId}`, // Replace docId with the ID of the document being edited
        formDataToSend,
        config
      )
      setEditingId(null)
      fetchDocs()

      // After successful update, close the edit modal and fetch the updated list of documents
      closeEdit()
    } catch (error) {
      console.error("Error updating document:", error)
    }
  }

  const handleDelete = async id => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.delete(`http://localhost:3001/docs/${id}`, config)

      // After successful deletion, fetch the updated list of documents
      fetchDocs()
    } catch (error) {
      console.error("Error deleting document:", error)
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <div className="flex flex-row justify-between items-center">

      <button
        onClick={openCreate}
        type="button"
        className="flex items-center justify-center text-white m-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      >
        <svg
          className="h-4 w-4 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          />
        </svg>
        Create a Document
      </button>
        <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input
             value={searchQuery}
             onChange={handleSearch}
        type="search" id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
    </div>

      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              File Path
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Status
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {docs.map(doc => (
            <tr key={doc.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {doc.name}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <a
                  href={`http://localhost:3001/uploads/documents/${doc.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Docs
                  </button>
                </a>
              </td>
              <td className="px-6 py-4font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {doc.status}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="flex">
                  <a
                    onClick={() => handleEdit(doc)}
                    className="cursor-pointer mr-2 text-indigo-600 hover:text-indigo-900"
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
                    onClick={() => handleDelete(doc.id)}
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
            Create Document
          </h3>
          <form
            onSubmit={e => {
              e.preventDefault()
              handleCreate()
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Document Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="filePath"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                File Path
              </label>
              <input
                id="filePath"
                type="file"
                name="filePath"
                onChange={handleFileChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
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
                Create Document
              </button>
            </div>
          </form>
        </div>
      </CreateModal>
      <EditModal>
        <div className="overflow-auto rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Edit Document
          </h3>
          <form
            onSubmit={e => {
              e.preventDefault()
              handleUpdate()
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="doc-name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                id="doc-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Document Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="doc-file-path"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                File Path
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="resume"
                type="file" // Change type to file for file input
                name="filePath"
                onChange={handleFileChange} // Use handleFileChange to update the file state
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="doc-status"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Status
              </label>
              <select
                id="doc-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={closeEdit}
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus
            :outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Edit Document
              </button>
            </div>
          </form>
        </div>
      </EditModal>
    </div>
  )
}

export default Docs
