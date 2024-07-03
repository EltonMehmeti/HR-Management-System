import React, { useState } from 'react'
import axios from 'axios';

export default function AddPuntor() {

const [name, setName] = useState('');
const [isActive, setIsActive]=useState(true);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/puntor', { name: name, isActive: isActive });
      alert('Employee added successfully');
    } catch (error) {
      alert('Error adding employee');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />
      <input
        type="checkbox"
        checked={isActive}
        onChange={(e) => setIsActive(e.target.checked)}
      />
      <button type="submit">Add Employee</button>
    </form>
  );
}

