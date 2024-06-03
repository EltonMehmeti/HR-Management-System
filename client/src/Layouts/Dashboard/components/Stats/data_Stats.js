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
    <div className="flex min-h-screen w-full flex-col items-start justify-start bg-gray-50 py-6 sm:py-12">
      <div className="w-full max-w-6xl rounded-xl bg-white p-8 mx-auto" id="widget">
        <h6 className="text-xs text-gray-400">Employee Stats</h6>
        <div className="mt-2 text-xl font-semibold">
          <span>Total Employees: {stats.totalEmployees}</span>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xs text-gray-500">Total Leaves</div>
            <div className="text-xl font-bold">{stats.totalLeaves}</div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xs text-gray-500">Total Payments</div>
            <div className="text-xl font-bold">{stats.totalPayments}</div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xs text-gray-500">Total Teams</div>
            <div className="text-xl font-bold">{stats.totalTeams}</div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xs text-gray-500">Total Documents</div>
            <div className="text-xl font-bold">{stats.totalDocs}</div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xs text-gray-500">Average Payment</div>
            <div className="text-xl font-bold">${stats.averagePayment}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
