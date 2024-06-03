import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Layouts/Dashboard/pages/Dashboard"
import "./index.css"


import EmpSignin from "./Layouts/auth/Employee/Signin";
import HrSignin from "./Layouts/auth/HR/Signin";
import HrSignup from "./Layouts/auth/HR/Signup";
import SuperAdminSignin from "./Layouts/auth/SuperAdmin/SuperAdminSignin";

import EmployeeList from "./Layouts/Dashboard/components/Employee/EmployeeList";
import EmployeeDetails from "./Layouts/Dashboard/components/Employee/EmployeeDetails";
import DashboardLayout from "./Layouts/Dashboard/DashboardLayout";
import Interviews from "./Layouts/Dashboard/components/Interview/Interviews";
import Team from "./Layouts/Dashboard/components/Team/Team";
import Calendar from "./Layouts/Dashboard/components/Calendar";
import JobApplicantList from "./Layouts/Dashboard/pages/JobApplicantList";
import HRList from "./Layouts/Dashboard/components/SuperAdmin/HR/HRList";
import OrgChart from "./Layouts/Dashboard/components/Org/OrgChart";
import Payroll from "./Layouts/Dashboard/components/Finance/Payroll";
import Docs from "./Layouts/Dashboard/components/Docs/Docs";
import PublicDocs from "./Layouts/Dashboard/components/Docs/PublicDocs";
import Job from "./Layouts/Dashboard/components/Job/Job";
import EmployeeTeam from "./Layouts/Dashboard/components/EmployeeTeam/EmployeeTeam";
import Time from "./Layouts/Dashboard/components/Leaves/Time";
import Leaves from "./Layouts/Dashboard/components/Leaves/Leaves";
import Interviewee from "./Layouts/Dashboard/components/Interviewee/Interviewee"

import { UserProvider } from "./helper/UserContext";
import RequireAuth from "./helper/RequireAuth";


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
            <Route element={<RequireAuth allowedRoles={["data_manager"]} />}>
              <Route path="teams" element={<Team />} />
              <Route path="employee" element={<EmployeeList />} />
              <Route path="employee/:id" element={<EmployeeDetails />} />
              <Route path="finance" element={<Payroll />} />
              <Route path="docs" element={<Docs />} />
              <Route path="/leaves" element={<Leaves />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={["admin"]} />}>
              <Route path="hr-list" element={<HRList />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={["recruiter"]} />}>
              <Route path="jobApplicant" element={<JobApplicantList />} />
              <Route path="recruit" element={<Interviews />} />
              <Route path="jobs" element={<Job />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="interviewee" element={<Interviewee />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={["employee"]} />}>
              <Route path="org" element={<OrgChart />} />
              <Route path="employee-team" element={<EmployeeTeam />} />
              <Route path="time" element={<Time />} />
            </Route>

          </Route>
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
