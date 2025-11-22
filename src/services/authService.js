import apiClient, { setAuthToken, clearAuthData } from './apiClient';

// Authentication service class
class AuthService {
  // User/Customer Authentication
  async loginUser(credentials) {
    try {
      const response = await apiClient.post('/api/auth/user/login', credentials);
      
      // Handle the response structure from your backend
      if (response.data && response.data.data) {
        const { access_token, refresh_token, user } = response.data.data;
        
        // Set the auth token in localStorage for subsequent requests
        setAuthToken(access_token);
        
        return {
          success: true,
          data: { 
            token: access_token,
            refreshToken: refresh_token,
            user: user,
            role: user.role || 'customer'
          },
          message: response.data.message || 'Login successful'
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Login failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  // Vendor Authentication
  async loginVendor(credentials) {
    try {
      const response = await apiClient.post('/api/auth/vendor/login', credentials);
      
      // Handle the response structure from your backend
      if (response.data && response.data.data) {
        const { access_token, refresh_token, user } = response.data.data;
        
        // Set the auth token in localStorage for subsequent requests
        setAuthToken(access_token);
        
        return {
          success: true,
          data: { 
            token: access_token,
            refreshToken: refresh_token,
            user: user,
            role: user.role || 'vendor'
          },
          message: response.data.message || 'Vendor login successful'
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Vendor login failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  // Admin Authentication
  async loginAdmin(credentials) {
    try {
      const response = await apiClient.post('/api/auth/admin/login', credentials);
      
      // Handle the response structure from your backend
      if (response.data && response.data.data) {
        const { access_token, refresh_token, user } = response.data.data;
        
        // Set the auth token in localStorage for subsequent requests
        setAuthToken(access_token);
        
        return {
          success: true,
          data: { 
            token: access_token,
            refreshToken: refresh_token,
            user: user,
            role: user.role || 'admin'
          },
          message: response.data.message || 'Admin login successful'
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Admin login failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  async signupUser(userData) {
    try {
      const response = await apiClient.post('/api/auth/signup', userData);
      
      // Handle the response structure from your backend
      if (response.data && response.data.data) {
        const { access_token, refresh_token, user } = response.data.data;
        
        // Set the auth token in localStorage for subsequent requests
        setAuthToken(access_token);
        
        return {
          success: true,
          data: { 
            token: access_token,
            refreshToken: refresh_token,
            user: user,
            role: user.role || 'customer'
          },
          message: response.data.message || 'Account created successfully'
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Signup failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  // Vendor Authentication
  async signupVendor(vendorData) {
    try {
      const response = await apiClient.post('/api/auth/vendor/signup', vendorData);
      
      // Handle the response structure from your backend
      if (response.data && response.data.data) {
        const { access_token, refresh_token, user } = response.data.data;
        
        // Set the auth token in localStorage for subsequent requests
        setAuthToken(access_token);
        
        return {
          success: true,
          data: { 
            token: access_token,
            refreshToken: refresh_token,
            user: user,
            role: user.role || 'vendor'
          },
          message: response.data.message || 'Vendor account created successfully'
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Vendor signup failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  async logout() {
    try {
      // Call backend logout endpoint (optional)
      await apiClient.post('/api/auth/logout');
    } catch (error) {
      console.warn('Logout API call failed, but clearing local data anyway');
    } finally {
      // Always clear local auth data
      clearAuthData();
      return {
        success: true,
        message: 'Logged out successfully'
      };
    }
  }

  async refreshToken() {
    try {
      const response = await apiClient.post('/api/auth/refresh');
      
      // Handle the response structure from your backend
      if (response.data && response.data.data) {
        const { access_token, refresh_token, user } = response.data.data;
        
        // Set the new auth token in localStorage
        setAuthToken(access_token);
        
        return {
          success: true,
          data: { 
            token: access_token,
            refreshToken: refresh_token,
            user: user
          },
          message: response.data.message || 'Token refreshed successfully'
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Token refresh failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  async verifyToken() {
    try {
      const response = await apiClient.get('/api/auth/verify');
      return {
        success: true,
        data: response.data,
        message: 'Token is valid'
      };
    } catch (error) {
      clearAuthData();
      return {
        success: false,
        message: 'Token verification failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  // Password Reset
  async forgotPassword(email) {
    try {
      const response = await apiClient.post('/api/auth/forgot-password', { email });
      return {
        success: true,
        data: response.data,
        message: 'Password reset instructions sent to your email'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send reset instructions',
        error: error.response?.data?.errors || null
      };
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const response = await apiClient.post('/api/auth/reset-password', {
        token,
        password: newPassword
      });
      return {
        success: true,
        data: response.data,
        message: 'Password reset successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Password reset failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  // Profile Management
  async getProfile() {
    try {
      const response = await apiClient.get('/api/auth/profile');
      
      console.log('getProfile API response:', response.data);
      
      // Handle the response structure from your backend
      if (response.data && response.data.data) {
        // The user data is directly in response.data.data
        const userData = response.data.data;
        
        console.log('Extracted user data:', userData);
        
        return {
          success: true,
          data: { user: userData },
          message: response.data.message || 'Profile retrieved successfully'
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to retrieve profile',
        error: error.response?.data?.errors || null
      };
    }
  }

  async updateProfile(userData) {
    try {
      const response = await apiClient.put('/api/auth/profile', userData);
      
      // Handle the response structure from your backend
      if (response.data && response.data.data) {
        const { user } = response.data.data;
        
        return {
          success: true,
          data: { user },
          message: response.data.message || 'Profile updated successfully'
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Profile update failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  async changePassword(currentPassword, newPassword) {
    try {
      const response = await apiClient.put('/api/auth/change-password', {
        currentPassword,
        newPassword
      });
      return {
        success: true,
        data: response.data,
        message: 'Password changed successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Password change failed',
        error: error.response?.data?.errors || null
      };
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;