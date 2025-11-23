import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaHome, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { getDefaultRedirectPath } from '../../constants/roles';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { role, isAuthenticated } = useAuth();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    if (isAuthenticated && role) {
      const defaultPath = getDefaultRedirectPath(role);
      navigate(defaultPath);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-4">
            <FaLock className="text-red-600 text-4xl" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-2">403</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Access Denied</h2>
        </div>

        {/* Message */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-gray-600 mb-4">
            You don't have permission to access this page. This area is restricted to authorized users only.
          </p>
          {isAuthenticated && role && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Current Role:</span> {role.charAt(0).toUpperCase() + role.slice(1)}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                You're logged in but don't have access to this resource.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
          >
            <FaHome className="mr-2" />
            {isAuthenticated ? 'Go to Dashboard' : 'Go to Home'}
          </button>

          <button
            onClick={handleGoBack}
            className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>If you believe you should have access to this page,</p>
          <p>please contact your administrator or support team.</p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
