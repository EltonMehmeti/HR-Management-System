import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Layouts/Dashboard/pages/Dashboard';
import './index.css';

import EmpSignup from './components/auth/Employee/Signup';
import EmpSignin from './components/auth/Employee/Signin';
import HrSignin from './Layouts/Dashboard/pages/Signin';
import HrSignup from './Layouts/Dashboard/pages/Signup';
import EmployeeList from './Layouts/Dashboard/pages/EmployeeList';
import DashboardLayout from './Layouts/Dashboard/DashboardLayout';
import JobApplicantList from './Layouts/Dashboard/pages/JobApplicantList';


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/employee/signup" element={<EmpSignup />} />
        <Route path="/employee/signin" element={<EmpSignin/>} />

        {/* Add more routes here if needed */}
        <Route path="/hr/signin" element={<HrSignin />} />
        <Route path="/hr/signup" element={<HrSignup />} />
        
         {/* DashboardLayout will contain nested routes */}
         <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employee" element={<EmployeeList />} />
          <Route path="jobApplicant" element={<JobApplicantList />} />
         
        </Route>
       
       
      </Routes>
    </Router>
  );
}

export default App;
