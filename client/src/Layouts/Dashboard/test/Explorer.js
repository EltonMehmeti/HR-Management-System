import React, { useState, useEffect } from "react"
import axios from "axios"

const Explorer = () => {
  const [name, setName] = useState("")
  const [nationality, setNationality] = useState("")
  const [planets, setPlanets] = useState([])
  const [message, setMessage] = useState("")
  const [id, setId] = useState(null) // State to track the planet ID being edited

  // Fetch planets on component mount
  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get("http://localhost:3001/explorer") // Adjust the API endpoint as per your backend
        setPlanets(response.data)
      } catch (error) {
        console.error("Error fetching planets:", error)
      }
    }
    fetchPlanets()
  }, [])

  // Handle form submission for adding or updating a planet
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // Determine whether to add or update based on whether the planet has an ID
      if (!id) {
        const response = await axios.post("http://localhost:3001/explorer", {
            name,
            nationality,
        }) // Adjust the API endpoint as per your backend
        setPlanets([...planets, response.data])
        setMessage("Planet added successfully!")
      } else {
        const response = await axios.put(`http://localhost:3001/explorer/${id}`, {
            name,
            nationality,
        }) // Adjust the API endpoint as per your backend
        const updatedPlanets = planets.map(planet =>
          planet.id === id ? response.data : planet
        )
        setPlanets(updatedPlanets)
        setMessage("Planet updated successfully!")
        setId(null) // Clear the id state after update
      }
      // Clear form inputs
      setName("")
      setNationality("")
    } catch (error) {
      console.error("Error adding/updating planet:", error)
      setMessage("Failed to add/update planet")
    }
  }

  // Handle planet edit click
  const handleDeletePlanet = async id => {
    try {
      await axios.delete(`http://localhost:3001/explorer/${id}`) // Adjust the API endpoint as per your backend
      setMessage("Planet deleted successfully!")
    } catch (error) {
      console.error("Error deleting planet:", error)
      setMessage("Failed to delete planet")
    }
  }


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add/Update Planet</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Name:
            <input
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="type">
            description:
            <input
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
              type="text"
              id="type"
              value={nationality}
              onChange={e => setNationality(e.target.value)}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {id ? "Update Planet" : "Add Planet"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Planets List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm font-semibold uppercase border-b">
              <th className="py-2 px-3">ID</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">nationality</th>

              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {planets.map(planet => (
              <tr key={planet.id} className="border-b hover:bg-gray-100">
                <td className="py-4 px-6 text-center">{planet.id}</td>
                <td className="py-4 px-6 text-center">{planet.name}</td>
                <td className="py-4 px-6 text-center">{planet.nationality}</td>

                <td className="py-4 px-6 text-center">
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeletePlanet(planet.id)}
                  >
                    Delete
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Explorer