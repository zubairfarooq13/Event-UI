import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthContainer = ({ onLogin }) => {
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'signup'

  const handleSwitchToSignup = () => {
    setCurrentView('signup');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleLogin = (userData) => {
    onLogin(userData);
  };

  const handleSignup = (userData) => {
    // After successful signup, user is automatically logged in
    onLogin(userData);
  };

  if (currentView === 'signup') {
    return (
      <Signup 
        onSignup={handleSignup}
        onSwitchToLogin={handleSwitchToLogin}
      />
    );
  }

  return (
    <Login 
      onLogin={handleLogin}
      onSwitchToSignup={handleSwitchToSignup}
    />
  );
};

export default AuthContainer;