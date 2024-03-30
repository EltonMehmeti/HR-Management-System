import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Layouts/Dashboard/pages/Dashboard';
import './index.css';
import Signin from './Layouts/Dashboard/pages/Signin';
import Signup from './Layouts/Dashboard/pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Add more routes here if needed */}
        <Route path="/dashboard/signin" element={<Signin />} />
        <Route path="/dashboard/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
