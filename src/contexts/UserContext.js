import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services';

// Create User Context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// User Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // Initialize user from token on app load
  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        // Verify token and get user data from backend
        const result = await authService.verifyToken();
        
        if (result.success && result.data) {
          const userData = result.data.user || result.data;
          setUser(userData);
          setUserRole(userData.role || 'customer');
          setIsAuthenticated(true);
        } else {
          // Token is invalid, clear it
          localStorage.removeItem('authToken');
          setUser(null);
          setUserRole(null);
          setIsAuthenticated(false);
        }
      }
    } catch (error) {
      console.error('Error initializing user:', error);
      // Clear invalid token
      localStorage.removeItem('authToken');
      setUser(null);
      setUserRole(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = (token, refreshToken, userData) => {
    // Validate that we have the required data
    if (!token || !userData) {
      console.error('Login failed: Missing token or user data', { token, userData });
      throw new Error('Invalid login data provided');
    }
    
    // Save only token to localStorage
    localStorage.setItem('authToken', token);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    
    // Save user data in memory (context state)
    setUser(userData);
    setUserRole(userData.role || 'customer');
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = async () => {
    try {
      // Call backend logout endpoint
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear token from localStorage
      localStorage.removeItem('authToken');
      
      // Clear user data from memory
      setUser(null);
      setUserRole(null);
      setIsAuthenticated(false);
    }
  };

  // Update user data in memory
  const updateUser = (updatedUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedUserData
    }));
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return userRole === role;
  };

  // Check if user is customer
  const isCustomer = () => hasRole('customer');

  // Check if user is vendor
  const isVendor = () => hasRole('vendor');

  // Check if user is admin
  const isAdmin = () => hasRole('admin');

  // Get user ID
  const getUserId = () => user?.id;

  // Get user name
  const getUserName = () => user?.name;

  // Get user email
  const getUserEmail = () => user?.email;

  // Get user phone
  const getUserPhone = () => user?.phone;

  // Get complete user object
  const getCurrentUser = () => user;

  // Context value
  const value = {
    // State
    user,
    isAuthenticated,
    loading,
    userRole,
    
    // Actions
    login,
    logout,
    updateUser,
    initializeUser,
    
    // Helper functions
    hasRole,
    isCustomer,
    isVendor,
    isAdmin,
    getUserId,
    getUserName,
    getUserEmail,
    getUserPhone,
    getCurrentUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;