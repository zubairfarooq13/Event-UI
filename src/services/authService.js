import apiClient, { setAuthData, clearAuthData, getUserRole } from './apiClient';

// Authentication service class
class AuthService {
  // User/Customer Authentication
  async loginUser(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      // Save auth data
      setAuthData(token, 'customer', user);
      
      return {
        success: true,
        data: { token, user, role: 'customer' },
        message: 'Login successful'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  async signupUser(userData) {
    try {
      const response = await apiClient.post('/auth/signup', userData);
      const { token, user } = response.data;
      
      // Save auth data
      setAuthData(token, 'customer', user);
      
      return {
        success: true,
        data: { token, user, role: 'customer' },
        message: 'Account created successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  // Vendor Authentication
  async loginVendor(credentials) {
    try {
      const response = await apiClient.post('/auth/vendor/login', credentials);
      const { token, vendor } = response.data;
      
      // Save auth data
      setAuthData(token, 'vendor', vendor);
      
      return {
        success: true,
        data: { token, user: vendor, role: 'vendor' },
        message: 'Login successful'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  async signupVendor(vendorData) {
    try {
      const response = await apiClient.post('/auth/vendor/signup', vendorData);
      const { token, vendor } = response.data;
      
      return {
        success: true,
        data: { token, user: vendor, role: 'vendor' },
        message: 'Vendor registration successful. Please wait for approval.'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Vendor signup failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  // Admin Authentication
  async loginAdmin(credentials) {
    try {
      const response = await apiClient.post('/auth/admin/login', credentials);
      const { token, admin } = response.data;
      
      // Save auth data
      setAuthData(token, 'admin', admin);
      
      return {
        success: true,
        data: { token, user: admin, role: 'admin' },
        message: 'Admin login successful'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Admin login failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  // Common Authentication Methods
  async logout() {
    try {
      // Call backend logout endpoint (optional)
      await apiClient.post('/auth/logout');
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
      const response = await apiClient.post('/auth/refresh');
      const { token, user } = response.data;
      const currentRole = getUserRole();
      
      // Update auth data with new token
      setAuthData(token, currentRole, user);
      
      return {
        success: true,
        data: { token, user },
        message: 'Token refreshed successfully'
      };
    } catch (error) {
      // If refresh fails, clear auth data
      clearAuthData();
      return {
        success: false,
        message: 'Token refresh failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  async verifyToken() {
    try {
      const response = await apiClient.get('/auth/verify');
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
      const response = await apiClient.post('/auth/forgot-password', { email });
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
      const response = await apiClient.post('/auth/reset-password', {
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
  async updateProfile(userData) {
    try {
      const response = await apiClient.put('/auth/profile', userData);
      const { user } = response.data;
      const currentRole = getUserRole();
      const currentToken = localStorage.getItem('authToken');
      
      // Update stored user data
      setAuthData(currentToken, currentRole, user);
      
      return {
        success: true,
        data: { user },
        message: 'Profile updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Profile update failed',
        error: error.response?.data?.errors || null
      };
    }
  }

  async changePassword(currentPassword, newPassword) {
    try {
      const response = await apiClient.put('/auth/change-password', {
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

  // OTP Verification
  async sendOTP(phone) {
    try {
      const response = await apiClient.post('/auth/send-otp', { phone });
      return {
        success: true,
        data: response.data,
        message: 'OTP sent successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send OTP',
        error: error.response?.data?.errors || null
      };
    }
  }

  async verifyOTP(phone, otp) {
    try {
      const response = await apiClient.post('/auth/verify-otp', { phone, otp });
      return {
        success: true,
        data: response.data,
        message: 'OTP verified successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'OTP verification failed',
        error: error.response?.data?.errors || null
      };
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;