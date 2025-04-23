import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ requiredRole }) => {
  const adminAuth = useSelector((state) => state.admin.isAuthenticated);
  const userAuth = useSelector((state) => state.user.isAuthenticated);
  const adminRole = useSelector((state) => state.admin.role);
  const userRole = useSelector((state) => state.user.role);

  // Check if the user is authenticated with the required role

  const isAuthorized =
    (requiredRole === 'admin' && adminAuth && adminRole === 'admin') ||
    (requiredRole === 'user' && userAuth && userRole === 'user');
  
    
  return isAuthorized ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
