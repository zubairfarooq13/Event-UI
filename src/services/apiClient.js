import axios from 'axios';
import { isTokenExpired, willExpireSoon } from '../utils/tokenUtils';

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

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(`${BASE_URL}/api/auth/refresh`, {
      refresh_token: refreshToken
    });

    if (response.data && response.data.data) {
      const { access_token, refresh_token: newRefreshToken } = response.data.data;
      
      localStorage.setItem('authToken', access_token);
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      }
      
      return access_token;
    }
    
    throw new Error('Invalid refresh response');
  } catch (error) {
    // Refresh failed, clear auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    throw error;
  }
};

// Request interceptor to add auth token and check expiration
apiClient.interceptors.request.use(
  async (config) => {
    // Get token from localStorage
    let token = localStorage.getItem('authToken');
    
    if (token) {
      // Check if token is expired or will expire soon
      if (isTokenExpired(token)) {
        console.warn('Token is expired, attempting refresh...');
        
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            token = await refreshAccessToken();
            isRefreshing = false;
            processQueue(null, token);
          } catch (error) {
            isRefreshing = false;
            processQueue(error, null);
            // Redirect to login
            if (!window.location.pathname.includes('/login')) {
              window.location.href = '/login';
            }
            return Promise.reject(error);
          }
        } else {
          // Wait for the current refresh to complete
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
          }).catch(error => {
            return Promise.reject(error);
          });
        }
      } else if (willExpireSoon(token, 5)) {
        // Token will expire in less than 5 minutes, refresh proactively
        console.log('Token expiring soon, refreshing proactively...');
        if (!isRefreshing) {
          isRefreshing = true;
          refreshAccessToken()
            .then(newToken => {
              isRefreshing = false;
              processQueue(null, newToken);
            })
            .catch(error => {
              isRefreshing = false;
              processQueue(error, null);
            });
        }
      }
      
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
  async (error) => {
    const originalRequest = error.config;
    
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
          // Try to refresh token once if not already retried
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            
            if (isRefreshing) {
              // Wait for the current refresh to complete
              return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
              }).then(token => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return apiClient(originalRequest);
              }).catch(err => {
                return Promise.reject(err);
              });
            }
            
            isRefreshing = true;
            
            try {
              const newToken = await refreshAccessToken();
              isRefreshing = false;
              processQueue(null, newToken);
              
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return apiClient(originalRequest);
            } catch (refreshError) {
              isRefreshing = false;
              processQueue(refreshError, null);
              
              // Clear auth data
              localStorage.removeItem('authToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
              localStorage.removeItem('userRole');
              
              // Redirect to login if not already there
              if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
              }
              
              return Promise.reject(refreshError);
            }
          }
          
          // If already retried, clear auth and redirect
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          localStorage.removeItem('userRole');
          
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
          break;
          
        case 403:
          // Forbidden - insufficient permissions
          console.error('Access denied: Insufficient permissions');
          // Optionally redirect to unauthorized page
          if (!window.location.pathname.includes('/unauthorized')) {
            window.location.href = '/unauthorized';
          }
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