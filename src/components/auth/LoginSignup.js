import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaGoogle, FaFacebook, FaSpinner } from 'react-icons/fa';

// Validation schemas
const phoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number'),
});

const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .required('OTP is required')
    .length(4, 'OTP must be 4 digits')
    .matches(/^\d{4}$/, 'OTP must contain only numbers'),
});

const LoginSignup = ({ onLogin }) => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  
  const otpRefs = useRef([]);

  // Form for phone number
  const phoneForm = useForm({
    resolver: yupResolver(phoneSchema),
    mode: 'onChange',
  });

  // Form for OTP
  const otpForm = useForm({
    resolver: yupResolver(otpSchema),
    mode: 'onChange',
  });

  // Handle phone form submission
  const onPhoneSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      if (Math.random() > 0.2) {
        setPhoneNumber(data.phone);
        setStep('otp');
        setResendTimer(30);
      } else {
        throw new Error('Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(-1); // Only take the last digit
    setOtpValues(newOtpValues);
    
    // Auto-focus next input
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
    
    // Update form value
    otpForm.setValue('otp', newOtpValues.join(''));
  };

  // Handle OTP input key down
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP form submission
  const onOtpSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate random success/failure for demo
      if (Math.random() > 0.3) {
        // Create user data object
        const userData = {
          phone: phoneNumber,
          loginTime: new Date().toISOString()
        };
        
        // Call the onLogin callback to update authentication state
        onLogin(userData);
        
        // Reset form after successful login
        setStep('phone');
        setOtpValues(['', '', '', '']);
        phoneForm.reset();
        otpForm.reset();
      } else {
        throw new Error('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate random success/failure for demo
      if (Math.random() > 0.2) {
        // Create user data object for social login
        const userData = {
          provider: provider,
          loginTime: new Date().toISOString()
        };
        
        // Call the onLogin callback to update authentication state
        onLogin(userData);
      } else {
        throw new Error(`${provider} login failed. Please try again.`);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP timer
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Handle resend OTP
  const handleResendOtp = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendTimer(30);
      setOtpValues(['', '', '', '']);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {step === 'phone' ? 'Welcome Back' : 'Verify Your Number'}
            </h1>
            <p className="text-gray-600 text-sm">
              {step === 'phone' 
                ? 'Enter your phone number to get started' 
                : `We've sent a 4-digit code to ${phoneNumber}`
              }
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Phone Number Step */}
          {step === 'phone' && (
            <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    {...phoneForm.register('phone')}
                    type="tel"
                    placeholder="Enter your 10-digit phone number"
                    className={`input-field ${phoneForm.formState.errors.phone ? 'error' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {phoneForm.formState.errors.phone && (
                  <p className="mt-2 text-sm text-red-600">
                    {phoneForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !phoneForm.formState.isValid}
                className="btn-primary flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </button>
            </form>
          )}

          {/* OTP Verification Step */}
          {step === 'otp' && (
            <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Enter OTP
                </label>
                <div className="flex justify-center space-x-3 mb-4">
                  {otpValues.map((value, index) => (
                    <input
                      key={index}
                      ref={el => otpRefs.current[index] = el}
                      type="text"
                      maxLength={1}
                      value={value}
                      onChange={e => handleOtpChange(index, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(index, e)}
                      className={`otp-input ${value ? 'filled' : ''}`}
                      disabled={isLoading}
                    />
                  ))}
                </div>
                {otpForm.formState.errors.otp && (
                  <p className="text-sm text-red-600 text-center">
                    {otpForm.formState.errors.otp.message}
                  </p>
                )}
              </div>

              {/* Resend OTP */}
              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend OTP in {resendTimer}s
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isLoading || !otpForm.formState.isValid}
                  className="btn-primary flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Login'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setError('');
                    setOtpValues(['', '', '', '']);
                  }}
                  className="btn-secondary"
                  disabled={isLoading}
                >
                  Change Phone Number
                </button>
              </div>
            </form>
          )}

          {/* Social Login Options */}
          {step === 'phone' && (
            <>
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
            </>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{' '}
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

export default LoginSignup;