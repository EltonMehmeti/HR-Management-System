import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUser } from './UserContext';
import Unauthorized from '../Layouts/Dashboard/components/Unauthorized';

const RequireAuth = ({ children, allowedRole }) => {
  const token = Cookies.get('token');
  let user = null;

  try {
    user = JSON.parse(Cookies.get('user'));
  } catch (error) {
    console.error('Error parsing user data:', error);
    return <Navigate to="/hr/signin" />;
  }

  if (!token) {
    return <Navigate to="/hr/signin" />;
  }

  // Role comparison using switch-case
  let role;
  switch (user.role) {
    case "employee":
      role = "employee";
      break;
    case "recruiter":
    case "datamanager":
      role = "hr";
      break;
    case "admin":
      role = user.role; 
      break;
    default:
      role = "hr"; 
      break;
  }

  if (user.role !== allowedRole) {
    return <Unauthorized link={role} />;
  }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: window.location.pathname }} replace />
  );
};

export default RequireAuth;
