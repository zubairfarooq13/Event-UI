import apiClient from './apiClient';

class SpaceService {
  /**
   * Create a new space
   * @param {Object} spaceData - The space data to submit
   * @returns {Promise<Object>} Response with success status and data
   */
  async createSpace(spaceData) {
    try {
      const response = await apiClient.post('/api/spaces/', spaceData);
      
      return {
        success: true,
        data: response.data,
        message: 'Space created successfully'
      };
    } catch (error) {
      console.error('Create space error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create space',
        details: error.response?.data?.errors || null,
        data: null
      };
    }
  }

  /**
   * Search spaces with filters
   * @param {Object} filters - Search filters (eventType, capacity, city)
   * @param {number} page - Page number
   * @param {number} perPage - Items per page
   * @returns {Promise<Object>} Response with search results
   */
  async searchSpaces(filters = {}, page = 1, perPage = 20) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add search filters
      if (filters.eventType) queryParams.append('eventType', filters.eventType);
      if (filters.capacity) queryParams.append('capacity', filters.capacity);
      if (filters.city) queryParams.append('city', filters.city);
      
      // Add pagination
      queryParams.append('page', page.toString());
      queryParams.append('per_page', Math.min(perPage, 100).toString());
      
      const response = await apiClient.get(`/api/spaces/search?${queryParams.toString()}`);
      
      return {
        success: true,
        data: response.data,
        message: 'Search results fetched successfully'
      };
    } catch (error) {
      console.error('Search spaces error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to search spaces',
        data: []
      };
    }
  }

  /**
   * Get all spaces for the current vendor
   * @param {number} page - Page number
   * @param {number} perPage - Items per page
   * @returns {Promise<Object>} Response with spaces list
   */
  async getVendorSpaces(page = 1, perPage = 20) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('per_page', Math.min(perPage, 100).toString());
      
      const response = await apiClient.get(`/api/spaces/?${queryParams.toString()}`);
      
      return {
        success: true,
        data: response.data,
        message: 'Spaces fetched successfully'
      };
    } catch (error) {
      console.error('Get vendor spaces error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch spaces',
        data: []
      };
    }
  }

  /**
   * Get a specific space by ID
   * @param {number|string} spaceId - The space ID
   * @returns {Promise<Object>} Response with space details
   */
  async getSpaceById(spaceId) {
    try {
      const response = await apiClient.get(`/api/spaces/${spaceId}`);
      
      return {
        success: true,
        data: response.data,
        message: 'Space details fetched successfully'
      };
    } catch (error) {
      console.error('Get space details error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch space details',
        data: null
      };
    }
  }

  /**
   * Update a space
   * @param {number|string} spaceId - The space ID
   * @param {Object} spaceData - Updated space data
   * @returns {Promise<Object>} Response with success status
   */
  async updateSpace(spaceId, spaceData) {
    try {
      const response = await apiClient.put(`/api/spaces/${spaceId}`, spaceData);
      
      return {
        success: true,
        data: response.data,
        message: 'Space updated successfully'
      };
    } catch (error) {
      console.error('Update space error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update space',
        details: error.response?.data?.errors || null,
        data: null
      };
    }
  }

  /**
   * Delete a space
   * @param {number|string} spaceId - The space ID
   * @returns {Promise<Object>} Response with success status
   */
  async deleteSpace(spaceId) {
    try {
      const response = await apiClient.delete(`/api/spaces/${spaceId}`);
      
      return {
        success: true,
        data: response.data,
        message: 'Space deleted successfully'
      };
    } catch (error) {
      console.error('Delete space error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete space',
        data: null
      };
    }
  }

  /**
   * Upload photos for a space
   * @param {number|string} spaceId - The space ID
   * @param {FormData} formData - FormData containing photos
   * @returns {Promise<Object>} Response with uploaded photo URLs
   */
  async uploadSpacePhotos(spaceId, formData) {
    try {
      const response = await apiClient.post(`/api/spaces/${spaceId}/photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return {
        success: true,
        data: response.data,
        message: 'Photos uploaded successfully'
      };
    } catch (error) {
      console.error('Upload space photos error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to upload photos',
        data: null
      };
    }
  }

  /**
   * Delete a space photo
   * @param {number|string} spaceId - The space ID
   * @param {number|string} photoId - The photo ID
   * @returns {Promise<Object>} Response with success status
   */
  async deleteSpacePhoto(spaceId, photoId) {
    try {
      const response = await apiClient.delete(`/api/spaces/${spaceId}/photos/${photoId}`);
      
      return {
        success: true,
        data: response.data,
        message: 'Photo deleted successfully'
      };
    } catch (error) {
      console.error('Delete space photo error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete photo',
        data: null
      };
    }
  }

  /**
   * Update space availability
   * @param {number|string} spaceId - The space ID
   * @param {Object} availabilityData - Availability data
   * @returns {Promise<Object>} Response with success status
   */
  async updateAvailability(spaceId, availabilityData) {
    try {
      const response = await apiClient.put(`/api/spaces/${spaceId}/availability`, availabilityData);
      
      return {
        success: true,
        data: response.data,
        message: 'Availability updated successfully'
      };
    } catch (error) {
      console.error('Update availability error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update availability',
        data: null
      };
    }
  }

  /**
   * Get space statistics
   * @param {number|string} spaceId - The space ID
   * @returns {Promise<Object>} Response with space statistics
   */
  async getSpaceStats(spaceId) {
    try {
      const response = await apiClient.get(`/api/spaces/${spaceId}/stats`);
      
      return {
        success: true,
        data: response.data,
        message: 'Statistics fetched successfully'
      };
    } catch (error) {
      console.error('Get space stats error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch statistics',
        data: null
      };
    }
  }
}

const spaceService = new SpaceService();
export default spaceService;
