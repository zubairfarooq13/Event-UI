import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getDefaultRedirectPath } from '../../constants/roles';

/**
 * RoleBasedRoute Component
 * Wraps routes that require specific role(s)
 * Redirects to:
 * - Login page if not authenticated
 * - Unauthorized page if authenticated but wrong role
 * - User's default dashboard if logged in with different role
 */
const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user's role is in the allowed roles list
  const hasRequiredRole = allowedRoles.includes(role);

  // If user doesn't have required role, redirect to their default dashboard or unauthorized page
  if (!hasRequiredRole) {
    // If user has a valid role but trying to access wrong section, 
    // redirect them to their appropriate dashboard
    if (role) {
      const defaultPath = getDefaultRedirectPath(role);
      // Only redirect to default dashboard if they're not already on it
      if (!location.pathname.startsWith(defaultPath.split('/').slice(0, 2).join('/'))) {
        return <Navigate to={defaultPath} replace />;
      }
    }
    
    // Otherwise, show unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has required role, render the protected content
  return children;
};

export default RoleBasedRoute;
