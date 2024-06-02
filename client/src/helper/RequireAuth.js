import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import Unauthorized from '../Layouts/Dashboard/components/Unauthorized';

const RequireAuth = ({ allowedRoles }) => {
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

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Unauthorized />;
  }

  return <Outlet />;
};

export default RequireAuth;
