// RequireAuth.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUser } from './UserContext';
import Unauthorized from '../Layouts/Dashboard/components/Unauthorized';

const RequireAuth = ({ children, allowedRole }) => {
  const token = Cookies.get('token');
  const user = JSON.parse(Cookies.get('user'));
console.log(user);
  if (!token) {
    return <Navigate to="/hr/signin" />;
  }

  if (user.role !== allowedRole) {
    let role  = ""
    if(user.role === "employee")
      {
        role = "employee"
        return <Unauthorized  link={role} />
      }
    if(user.role === "recruiter" || user.role === "datamanger" ) 
      {
        role = "hr"
        return <Unauthorized  link={role} />
      }
    if(user.role === "admin"){
      role = "admin"
       return <Unauthorized  link={role} />
    } 
    if(user.role === "superAdmin")
      {
        role = "superAdmin"
        return <Unauthorized  link={role} />
      }
    return <Navigate to={`${role}/signin`} />;
  }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: window.location.pathname }} replace />
  );
};

export default RequireAuth;
