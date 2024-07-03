import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateContract() {
  const [contracts, setContracts] = useState([]);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [puntorID, setEmployeeId] = useState('');
  const [selectedContractId, setSelectedContractId] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      const result = await axios.get('http://localhost:3000/contract');
      setContracts(result.data);
    };
    const fetchEmployees = async () => {
      const result = await axios.get('http://localhost:3000/puntor');
      setEmployees(result.data);
    };
    fetchContracts();
    fetchEmployees();
  }, []);

  const handleSelectChange = (e) => {
    const selectedContract = contracts.find((contract) => contract.id === parseInt(e.target.value));
    setSelectedContractId(selectedContract.Id);
    setName(selectedContract.name);
    setStartDate(selectedContract.startDate.slice(0, 10)); // Extracting only date part
    setEmployeeId(selectedContract.puntorID.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/contract/${selectedContractId}`, { name: name, tartDate: startDate, puntorID: parseInt(puntorID) });
      alert('Contract updated successfully');
    } catch (error) {
      alert('Error updating contract');
    }
  };

  return (
    <div>
      <h2>Update Contract</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedContractId}
          onChange={handleSelectChange}
        >
          <option value="">Select Contract</option>
          {contracts.map((contract) => (
            <option key={contract.Id} value={contract.Id}>{contract.Name}</option>
          ))}
        </select>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <select
          value={puntorID}
          onChange={(e) => setEmployeeId(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>{employee.name}</option>
          ))}
        </select>
        <button type="submit">Update Contract</button>
      </form>
    </div>
  );
}

export default UpdateContract;
