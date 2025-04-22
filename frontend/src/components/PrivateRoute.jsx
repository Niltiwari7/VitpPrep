import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ requiredRole }) => {
  const adminAuth = useSelector((state) => state.admin.isAuthenticated);
  const userAuth = useSelector((state) => state.user.isAuthenticated);
  const adminRole = useSelector((state) => state.admin.role); // corrected
  const userRole = useSelector((state) => state.user.role);   // corrected

  
  const isAdmin = adminAuth && adminRole === 'admin';
  const isUser = userAuth && userRole === 'user';

  
  // Admin has access to all routes
  if (isAdmin) return <Outlet />;

  // Users have access only if requiredRole is 'user'
  if (isUser && requiredRole === 'user') return <Outlet />;

  // If not authenticated
  return <Navigate to="/signin" replace />;
};

export default PrivateRoute;
