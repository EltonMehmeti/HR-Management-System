import React from 'react';
import RoleBasedComponent from '../../../helper/RoleBasedComponent';
import EmployeeStats from '../components/employeeStats/employeeStats';


const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Role-based rendering */}
      <RoleBasedComponent roles={['admin', 'data_manager']}>
        <div>Admin and Data Manager specific content</div>
      </RoleBasedComponent>
      
      <RoleBasedComponent roles={['employee']}>
        <div>Employee specific content</div>
        <EmployeeStats />
      </RoleBasedComponent>
      
      <RoleBasedComponent roles={['recruiter']}>
        {/* Employee statistics dashboard */}
       
      </RoleBasedComponent>

      <RoleBasedComponent roles={['data_manager']}>
        <div>Data specific content</div>
      </RoleBasedComponent>
    </div>
  );
};

export default Dashboard;
