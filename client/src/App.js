import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Layouts/Dashboard/pages/Dashboard';
import './index.css';
import EmpSignup from './components/auth/Employee/Signup';
import EmpSignin from './components/auth/Employee/Signin';
import HrSignin from './Layouts/Dashboard/pages/Signin';
import HrSignup from './Layouts/Dashboard/pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee/signup" element={<EmpSignup />} />
        <Route path="/employee/signin" element={<EmpSignin/>} />

        {/* Add more routes here if needed */}
        <Route path="/hr/signin" element={<HrSignin />} />
        <Route path="/hr/signup" element={<HrSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
