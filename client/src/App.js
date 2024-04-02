import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Layouts/Dashboard/pages/Dashboard';
import './index.css';
import Signup from './components/auth/Employee/Signup';
import Login from './components/auth/Employee/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee/signup" element={<Signup />} />
        <Route path="/employee/login" element={<Login/>} />

        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
