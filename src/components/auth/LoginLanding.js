import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding } from 'react-icons/fa';
import LandingHeader from '../common/headers/LandingHeader';

const LoginLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Log in
          </h1>

          {/* Login Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* User Login Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6">
                <FaUser className="w-10 h-10 text-teal-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                User
              </h2>
              
              <p className="text-gray-600 mb-8">
                Find the perfect venue for your event.
              </p>
              
              <button
                onClick={() => navigate('/login/user')}
                className="w-full px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors mb-6"
              >
                User login
              </button>
              
              <div className="text-sm">
                <p className="text-gray-600 mb-2">Don't have a User Account?</p>
                <button
                  onClick={() => navigate('/signup/user')}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Sign up
                </button>
              </div>
            </div>

            {/* Venue Login Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6">
                <FaBuilding className="w-10 h-10 text-teal-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Venue
              </h2>
              
              <p className="text-gray-600 mb-8">
                Manage enquiries and edit your listings.
              </p>
              
              <button
                onClick={() => navigate('/login/vendor')}
                className="w-full px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors mb-6"
              >
                Venue login
              </button>
              
              <div className="text-sm">
                <p className="text-gray-600 mb-2">Don't have a Venue Account?</p>
                <button
                  onClick={() => navigate('/vendor/add-space')}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  List your venue with us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLanding;
