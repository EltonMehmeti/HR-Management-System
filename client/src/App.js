import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Layouts/Dashboard/pages/Dashboard';
import './index.css';

import EmpSignin from './components/auth/Employee/Signin';
import EmployeeList from './Layouts/Dashboard/components/Employee/EmployeeList';
import DashboardLayout from './Layouts/Dashboard/DashboardLayout';
import JobApplicantList from './Layouts/Dashboard/pages/JobApplicantList';

import HrSignin from './components/auth/HR/Signin';
import HrSignup from './components/auth/HR/Signup';
import { UserProvider } from './helper/UserContext';
import RequireAuth from './helper/RequireAuth';
import EmployeeDetails from './Layouts/Dashboard/components/Employee/EmployeeDetails';
import Interviews from './Layouts/Dashboard/components/Interview/Interviews';
import Team from "./Layouts/Dashboard/components/Team/Team"

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/employee/signin" element={<EmpSignin />} />
          <Route path="/teams" element={<Team />} />

          <Route path="/hr/signin" element={<HrSignin />} />
          <Route path="/hr/signup" element={<HrSignup />} />

          {/* DashboardLayout will contain nested routes */}

          <Route path="/" element={<DashboardLayout />}>
            <Route element={<RequireAuth />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="employee" element={<EmployeeList />} />
              <Route path="jobApplicant" element={<JobApplicantList />} />

              <Route path="/employee/:id" element={<EmployeeDetails />} />
              <Route path="/recruit" element={<Interviews />} />
              
            </Route>
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
