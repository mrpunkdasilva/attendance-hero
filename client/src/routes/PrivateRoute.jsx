import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = () => {
  const { currentUser, loadingAuth } = useAuth();

  if (loadingAuth) {
    // Optionally, render a loading spinner here
    return null; // Or a simple div with "Loading..."
  }

  return currentUser ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;