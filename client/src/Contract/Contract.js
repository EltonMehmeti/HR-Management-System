import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Contract() {
  const [contracts, setContracts] = useState([]);
  const [puntorID, setPuntorID] = useState('');
  const [startDate, setStartDate] = useState('');
  const [editingContract, setEditingContract] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    puntorID: ''
  });

  const fetchContracts = async (filter) => {
    try {
      let result;
      if (filter) {
        if (filter.type === 'puntorID') {
          result = await axios.get(`http://localhost:3001/contract/puntor/${filter.value}`);
        } else if (filter.type === 'startDate') {
          const formattedDate = filter.value.split('-').join('/');
          result = await axios.get(`http://localhost:3001/contract/startdate/${formattedDate}`);
        }
      } else {
        result = await axios.get('http://localhost:3001/contract');
      }
      setContracts(result.data);
    } catch (error) {
      console.error('Error fetching contracts:', error);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleFilterByPuntorID = () => {
    if (puntorID) {
      fetchContracts({ type: 'puntorID', value: puntorID });
    }
  };

  const handleFilterByStartDate = () => {
    if (startDate) {
      fetchContracts({ type: 'startDate', value: startDate });
    }
  };

  const handleEditClick = (contract) => {
    setEditingContract(contract);
    setFormData({
      name: contract.name,
      startDate: contract.startDate.split('T')[0], // Format date for input field
      puntorID: contract.puntorID
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateContract = async () => {
    try {
      const result = await axios.put(`http://localhost:3001/contract/${editingContract.id}`, formData);
      setEditingContract(null);
      fetchContracts();
    } catch (error) {
      console.error('Error updating contract:', error);
    }
  };

  return (
    <div>
      <h2>All Contracts</h2>
      <div>
        <input
          type="text"
          placeholder="Filter by Puntor ID"
          value={puntorID}
          onChange={(e) => setPuntorID(e.target.value)}
        />
        <button onClick={handleFilterByPuntorID}>Filter</button>
      </div>
      <div>
        <input
          type="date"
          placeholder="Filter by Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <button onClick={handleFilterByStartDate}>Filter</button>
      </div>
      <ul>
        {contracts.map((contract) => (
          <li key={contract.id}>
            {contract.name}: {new Date(contract.startDate).toLocaleDateString()}
            <button onClick={() => handleEditClick(contract)}>Edit</button>
          </li>
        ))}
      </ul>
      {editingContract && (
        <div>
          <h2>Edit Contract</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>Puntor ID:</label>
              <input
                type="text"
                name="puntorID"
                value={formData.puntorID}
                onChange={handleFormChange}
              />
            </div>
            <button onClick={handleUpdateContract}>Update Contract</button>
            <button onClick={() => setEditingContract(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
