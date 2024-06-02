import React from 'react';
import { useUser } from './UserContext';

const RoleBasedComponent = ({ roles, children }) => {
  const { user } = useUser();

  if (!roles.includes(user?.role)) {
    return null;
  }

  return children;
};

export default RoleBasedComponent;
