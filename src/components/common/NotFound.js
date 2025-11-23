import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaHome, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { getDefaultRedirectPath } from '../../constants/roles';

const NotFound = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4">
            <FaSearch className="text-blue-600 text-4xl" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        </div>

        {/* Message */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-gray-600 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500 text-sm">
            It might have been moved, deleted, or the URL might be incorrect.
          </p>
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

        {/* Suggestions */}
        {isAuthenticated && (
          <div className="mt-8 text-left bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Quick Links:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <button
                  onClick={() => navigate('/venues')}
                  className="text-teal-600 hover:text-teal-700 hover:underline"
                >
                  Browse Venues
                </button>
              </li>
              {role === 'customer' && (
                <>
                  <li>
                    <button
                      onClick={() => navigate('/user/enquiries')}
                      className="text-teal-600 hover:text-teal-700 hover:underline"
                    >
                      My Enquiries
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/user/favourites')}
                      className="text-teal-600 hover:text-teal-700 hover:underline"
                    >
                      My Favourites
                    </button>
                  </li>
                </>
              )}
              {role === 'vendor' && (
                <>
                  <li>
                    <button
                      onClick={() => navigate('/vendor/spaces')}
                      className="text-teal-600 hover:text-teal-700 hover:underline"
                    >
                      My Spaces
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/vendor/add-space')}
                      className="text-teal-600 hover:text-teal-700 hover:underline"
                    >
                      Add New Space
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? Contact our support team.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
