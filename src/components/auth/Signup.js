import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { authService } from '../../services';
import LandingHeader from '../landing/LandingHeader';

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
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
      const result = await authService.signupUser(formData);
      
      if (result.success) {
        // Redirect to user enquiries page
        navigate('/user/enquiries');
      } else {
        setError(result.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    setError(`${provider} signup will be available soon.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-md mx-auto">
          {/* Header with Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500 rounded-full mb-4">
              <FaUser className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              User sign up
            </h1>
          </div>

          {/* Signup Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Social Signup Buttons */}
            <div className="space-y-3 mb-6">
              <button
                type="button"
                onClick={() => handleSocialSignup('Facebook')}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <FaFacebook className="text-blue-600 mr-3" size={20} />
                <span className="font-medium text-gray-700">Sign up with Facebook</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialSignup('Google')}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <FaGoogle className="text-red-500 mr-3" size={20} />
                <span className="font-medium text-gray-700">Sign up with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Field */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" size={16} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                    disabled={isLoading}
                  />
                </div>
              </div>

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
                    placeholder="Email - watch out for typos"
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
                    placeholder="Create a password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Marketing Checkbox */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptMarketing"
                  checked={acceptMarketing}
                  onChange={(e) => setAcceptMarketing(e.target.checked)}
                  className="w-4 h-4 mt-1 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label htmlFor="acceptMarketing" className="ml-3 text-sm text-gray-600">
                  I'd like to receive marketing promotions, special offers and inspiration from Tagvenue. I can opt out at any time.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing up...' : 'Sign up'}
              </button>
            </form>

            {/* Terms and Privacy */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By continuing you are creating an account and accepting our{' '}
                <a href="/terms" className="text-teal-600 hover:text-teal-700">
                  Terms and Conditions
                </a>
                ,{' '}
                <a href="/privacy" className="text-teal-600 hover:text-teal-700">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/cancellation" className="text-teal-600 hover:text-teal-700">
                  Cancellation and Refund Policy
                </a>
                .
              </p>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have a User Account?{' '}
                <button
                  onClick={() => navigate('/login/user')}
                  className="text-teal-600 hover:text-teal-700 font-semibold"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;