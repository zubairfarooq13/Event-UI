import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaBuilding, FaEnvelope, FaLock } from 'react-icons/fa';
import { authService } from '../../services';
import LandingHeader from '../common/headers/LandingHeader';

const VendorLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await authService.loginUser(formData);
      
      if (result.success) {
        // Redirect to vendor dashboard
        navigate('/vendor/dashboard');
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setError(`${provider} login will be available soon.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-md mx-auto">
          {/* Header with Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500 rounded-full mb-4">
              <FaBuilding className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Venue login
            </h1>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Social Login Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <FaGoogle className="text-red-500 mr-3" size={20} />
                <span className="font-medium text-gray-700">Log in with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" size={16} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" size={16} />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-left">
                <button
                  type="button"
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have a Venue Account?{' '}
                <button
                  onClick={() => navigate('/vendor/add-space')}
                  className="text-teal-600 hover:text-teal-700 font-semibold"
                >
                  List your venue with us
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
