import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:3001/data_stats/stats');
      return response.data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Statistics Dashboard</h1>
      <ul>
        <li>Total Employees: {stats.totalEmployees}</li>
        <li>Total Leaves: {stats.totalLeaves}</li>
        <li>Total Payments: {stats.totalPayments}</li>
        <li>Total Teams: {stats.totalTeams}</li>
        <li>Total Documents: {stats.totalDocs}</li>
        <li>Average Payment: {stats.averagePayment}</li>
      </ul>
    </div>
  );
};

export default Stats;
