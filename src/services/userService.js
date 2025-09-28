import apiClient from './apiClient';

const userService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('/api/user/profile');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get profile'
      };
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/api/user/profile', profileData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update profile'
      };
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (file) => {
    try {
      const formData = new FormData();
      formData.append('profile_picture', file);

      const response = await apiClient.post('/api/user/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Upload profile picture error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to upload profile picture'
      };
    }
  },

  // Get user bookings
  getBookings: async () => {
    try {
      const response = await apiClient.get('/api/user/bookings');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Get bookings error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get bookings'
      };
    }
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    try {
      const response = await apiClient.put('/api/user/preferences', preferences);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Update preferences error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update preferences'
      };
    }
  }
};

export default userService;