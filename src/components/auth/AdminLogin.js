import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaGoogle, FaFacebook, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { authService } from '../../services';

// Validation schema
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const AdminLogin = ({ onLogin, onSwitchToSignup }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form setup
  const form = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Handle login form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Login using auth service
      const result = await authService.loginAdmin(data);
      
      console.log('Login result:', result);
      
      if (result.success) {
        console.log('Login successful, passing data:', result.data);
        // Call the onLogin callback to update authentication state
        onLogin(result.data);
        
        // Reset form after successful login
        form.reset();
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');
    
    try {
      // For now, we'll show a message that social login needs backend integration
      // In a real app, this would redirect to OAuth providers
      setError(`${provider} login will be available once backend integration is complete.`);
      
      // Future implementation:
      // window.location.href = `${process.env.REACT_APP_API_URL}/auth/${provider.toLowerCase()}`;
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  {...form.register('email')}
                  type="email"
                  placeholder="Enter your email address"
                  className={`input-field ${form.formState.errors.email ? 'error' : ''}`}
                  disabled={isLoading}
                />
              </div>
              {form.formState.errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...form.register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`input-field pr-10 ${form.formState.errors.password ? 'error' : ''}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !form.formState.isValid}
              className="btn-primary flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>



          {/* Switch to Signup */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?
              {' '}
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="text-primary-600 hover:text-primary-700 font-medium"
                disabled={isLoading}
              >
                Sign up
              </button>
            </p>
          </div>

          {/* Social Login Options */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
              className="btn-secondary flex items-center justify-center"
            >
              <FaGoogle className="mr-2 text-red-500" />
              Login with Google
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('Facebook')}
              disabled={isLoading}
              className="btn-secondary flex items-center justify-center"
            >
              <FaFacebook className="mr-2 text-blue-600" />
              Login with Facebook
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <a href="/terms" className="text-primary-600 hover:text-primary-700">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary-600 hover:text-primary-700">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;