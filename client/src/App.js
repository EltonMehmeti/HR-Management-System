import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Layouts/Dashboard/pages/Dashboard";
import "./index.css";

import EmpSignin from "./Layouts/auth/Employee/Signin";
import EmployeeList from "./Layouts/Dashboard/components/Employee/EmployeeList";
import DashboardLayout from "./Layouts/Dashboard/DashboardLayout";

import HrSignin from "./Layouts/auth/HR/Signin";
import HrSignup from "./Layouts/auth/HR/Signup";
import { UserProvider } from "./helper/UserContext";
import RequireAuth from "./helper/RequireAuth";
import EmployeeDetails from "./Layouts/Dashboard/components/Employee/EmployeeDetails";
import Interviews from "./Layouts/Dashboard/components/Interview/Interviews";
import Team from "./Layouts/Dashboard/components/Team/Team";
import Calendar from "./Layouts/Dashboard/components/Calendar";
import SuperAdminSignin from './Layouts/auth/SuperAdmin/SuperAdminSignin';
import JobApplicantList from './Layouts/Dashboard/pages/JobApplicantList';
import HRList from './Layouts/Dashboard/components/SuperAdmin/HR/HRList';
import OrgChart from './Layouts/Dashboard/components/Org/OrgChart';
import Payroll from './Layouts/Dashboard/components/Finance/Payroll';
import Docs from "./Layouts/Dashboard/components/Docs/Docs";
import PublicDocs from "./Layouts/Dashboard/components/Docs/PublicDocs";
import Job from "./Layouts/Dashboard/components/Job/Job";
import EmployeeTeam from './Layouts/Dashboard/components/EmployeeTeam/EmployeeTeam';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/employee/signin" element={<EmpSignin />} />
          <Route path="/admin/signin" element={<SuperAdminSignin />} />
          <Route path="/superadmin/signin" element={<SuperAdminSignin />} />
          <Route path="/hr/signin" element={<HrSignin />} />
          <Route path="/hr/signup" element={<HrSignup />} />

          <Route path="/" element={<DashboardLayout />}>
            <Route element={<RequireAuth />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route path="public-docs" element={<PublicDocs />} />
            <Route element={<RequireAuth allowedRoles={['data_manager']} />}>
              <Route path="teams" element={<Team />} />
              <Route path="employee" element={<EmployeeList />} />
              <Route path="employee/:id" element={<EmployeeDetails />} />
              <Route path="finance" element={<Payroll />} />
              <Route path="docs" element={<Docs />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={['admin']} />}>
              <Route path="hr-list" element={<HRList />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={['recruiter']} />}>
              <Route path="jobApplicant" element={<JobApplicantList />} />
              <Route path="recruit" element={<Interviews />} />
              <Route path="jobs" element={<Job />} />
              <Route path="calendar" element={<Calendar />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={['employee']} />}>
              <Route path="org" element={<OrgChart />} />
              <Route path="employee-team" element={<EmployeeTeam />} />
            </Route>@
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
