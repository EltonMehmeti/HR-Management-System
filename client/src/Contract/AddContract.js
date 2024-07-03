import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function AddContract() {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [puntorID, setPuntorID] = useState('');
    const [puntor, setpuntor] = useState([]);
  
    useEffect(() => {
        const fetchEmployees = async () => {
          const result = await axios.get('http://localhost:3001/puntor');
          setpuntor(result.data);
        };
        fetchEmployees();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:3001/contract', { name: name, startDate: startDate, puntorID: puntorID });
          alert('Contract added successfully');
        } catch (error) {
          alert('Error adding contract');
        }
      };
      return (
        <form onSubmit={handleSubmit}>
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
            onChange={(e) => setPuntorID(e.target.value)}
          >
            <option value="">Select Employee</option>
            {puntor.map((employee) => (
              <option key={employee.id} value={employee.id}>{employee.id}</option>
            ))}
          </select>
          <button type="submit">Add Contract</button>
        </form>
      );
    }
