import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Puntor() {
    const [puntor, setPuntor] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
          const result = await axios.get('http://localhost:3001/puntor');
          setPuntor(result.data);
        };
        fetchEmployees();
      }, []);

      return (
        <div>
          <h2>All Employees</h2>
          <ul>
            {puntor.map((employee) => (
              <li key={employee.id}>{employee.name}</li>
            ))}
          </ul>
        </div>
      );
    }

