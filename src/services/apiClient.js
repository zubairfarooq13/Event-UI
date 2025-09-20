import axios from 'axios';

// Base URL for the backend API
const BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

// Create Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging (remove in production)
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
      data: config.data,
      params: config.params,
    });
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // Log successful response for debugging (remove in production)
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data,
    });
    
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      console.error(`❌ API Error: ${status}`, {
        url: error.config?.url,
        message: data?.message || error.message,
        data: data,
      });
      
      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - token expired or invalid
          localStorage.removeItem('authToken');
          localStorage.removeItem('userRole');
          localStorage.removeItem('userData');
          
          // Redirect to login if not already there
          if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/admin')) {
            window.location.href = '/login';
          }
          break;
          
        case 403:
          // Forbidden - insufficient permissions
          console.error('Access denied: Insufficient permissions');
          break;
          
        case 404:
          // Not found
          console.error('Resource not found');
          break;
          
        case 422:
          // Validation error
          console.error('Validation error:', data?.errors || data?.message);
          break;
          
        case 500:
          // Server error
          console.error('Internal server error');
          break;
          
        default:
          console.error(`HTTP Error ${status}:`, data?.message || error.message);
      }
    } else if (error.request) {
      // Network error - no response received
      console.error('❌ Network Error: No response from server', {
        url: error.config?.url,
        timeout: error.code === 'ECONNABORTED' ? 'Request timeout' : 'Network issue',
      });
    } else {
      // Something else happened
      console.error('❌ Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Helper function to get auth header
export const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper function to check if user is authenticated (token only)
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

// Helper function to get auth token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to clear auth data (token only)
export const clearAuthData = () => {
  localStorage.removeItem('authToken');
};

// Helper function to set auth token
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

export default apiClient;