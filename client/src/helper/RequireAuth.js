// RequireAuth.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
const RequireAuth = ({ children }) => {
  const token = Cookies.get('token');
  if (!token) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/hr/signin" />;
  }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: window.location.pathname }} replace />
  );
};

export default RequireAuth;
