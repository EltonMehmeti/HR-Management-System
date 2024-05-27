import React, { useEffect, useState } from "react"
import axios from "axios"
import docIcon from "../../images/doc.png"

const PublicDocs = () => {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    const fetchPublicDocs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/public-docs")
        setDocs(response.data)
      } catch (error) {
        console.error("Error fetching public documents:", error.message)
      }
    }

    fetchPublicDocs()
  }, [])

  return (
    <div className="min-h-screen bg-white-100   flex flex-col justify-center ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-10">
          Public Documents
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6 gap-4">
          {docs.map(doc => (
            <div
              key={doc.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
            >
              <img
                src={docIcon}
                alt="Document"
                className="w-full h-auto mx-auto mb-2"
              />
              <div className="text-center">
                <h2 className="text-lg font-bold">{doc.name}</h2>
              </div>
              <a
                href={`http://localhost:3001/uploads/documents/${doc.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 self-center"
              >
                View
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PublicDocs
