import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services';
import ROLES from '../constants/roles';
import { getRoleFromToken, isTokenValid } from '../utils/tokenUtils';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [role, setRole] = useState(localStorage.getItem('userRole'));

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      const storedRole = localStorage.getItem('userRole');
      
      if (storedToken && storedUser) {
        try {
          // Validate token is still valid
          if (isTokenValid(storedToken)) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setToken(storedToken);
            setRole(storedRole || parsedUser.role || getRoleFromToken(storedToken));
          } else {
            // Token expired, clear auth data
            console.warn('Stored token is expired');
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            localStorage.removeItem('userRole');
          }
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          localStorage.removeItem('userRole');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Common function to handle authentication success
  const handleAuthSuccess = (access_token, userData, userRole) => {
    const finalRole = userRole || userData.role || ROLES.CUSTOMER;
    
    setToken(access_token);
    setUser(userData);
    setRole(finalRole);
    
    localStorage.setItem('authToken', access_token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userRole', finalRole);
  };

  // Generic login function that accepts role-specific parameters
  const login = async (email, password, userRole = ROLES.CUSTOMER) => {
    try {
      let result;
      
      // Call appropriate service method based on role
      switch (userRole) {
        case ROLES.ADMIN:
          result = await authService.loginAdmin({ email, password });
          break;
        case ROLES.VENDOR:
          result = await authService.loginVendor({ email, password });
          break;
        case ROLES.CUSTOMER:
        default:
          result = await authService.loginUser({ email, password });
          break;
      }

      if (result && result.success) {
        const { token: token, user: userData, role: role } = result.data;
        handleAuthSuccess(token, userData, role || userRole);
      }

      return result;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Login failed'
      };
    }
  };

  // Generic signup function that accepts role-specific parameters
  const register = async (userData, userRole = ROLES.CUSTOMER) => {
    try {
      let result;
      
      // Call appropriate service method based on role
      switch (userRole) {
        case ROLES.VENDOR:
          result = await authService.signupVendor(userData);
          break;
        case ROLES.CUSTOMER:
        default:
          result = await authService.signupUser(userData);
          break;
      }
      
      if (result && result.success) {
        const { token: access_token, user: userInfo, role: responseRole } = result.data;
        handleAuthSuccess(access_token, userInfo, responseRole || userRole);
      }
      
      return result;
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        error: error.message || 'Registration failed'
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      setRole(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
    }
  };

  const updateUser = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update role if it changed
    if (updatedUserData.role && updatedUserData.role !== role) {
      setRole(updatedUserData.role);
      localStorage.setItem('userRole', updatedUserData.role);
    }
  };

  const updateProfile = async (profileData) => {
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return { success: true, data: updatedUser };
  };

  // Role checking helper methods
  const hasRole = (requiredRole) => {
    return role === requiredRole;
  };

  const isCustomer = () => hasRole(ROLES.CUSTOMER);
  const isVendor = () => hasRole(ROLES.VENDOR);
  const isAdmin = () => hasRole(ROLES.ADMIN);

  const value = {
    user,
    token,
    role,
    loading,
    login,
    register,
    logout,
    updateProfile,
    updateUser,
    isAuthenticated: !!token,
    hasRole,
    isCustomer,
    isVendor,
    isAdmin,
    contextLogout: logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};