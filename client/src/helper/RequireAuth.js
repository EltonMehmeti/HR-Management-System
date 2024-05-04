// RequireAuth.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUser } from './UserContext';

const RequireAuth = ({ children, allowedRole }) => {
  const token = Cookies.get('token');
  const user = JSON.parse(Cookies.get('user'));
console.log(user);
  if (!token) {
    return <Navigate to="/hr/signin" />;
  }

  if (user.role !== allowedRole) {
    let role  = ""
    if(user.role === "employee") role = "employee"
    if(user.role === "recruiter" || user.role === "datamanger" ) role = "hr"
    if(user.role === "admin") role = "admin"
    return <Navigate to={`${role}/signin`} />;
  }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: window.location.pathname }} replace />
  );
};

export default RequireAuth;
