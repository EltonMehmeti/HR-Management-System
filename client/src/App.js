import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Layouts/Dashboard/pages/Dashboard';
import './index.css';
import Signin from './Layouts/Dashboard/pages/Signin';
import Signup from './Layouts/Dashboard/pages/Signup';
import EmployeeList from './Layouts/Dashboard/pages/EmployeeList';

import DashboardLayout from './Layouts/Dashboard/DashboardLayout';


function App() {
  return (
    <Router>
      <Routes>
         {/* DashboardLayout will contain nested routes */}
         <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employee" element={<EmployeeList />} />
          <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        {/* Add more routes here if needed */}
      
       
      
       
      </Routes>
    </Router>
  );
}

export default App;
