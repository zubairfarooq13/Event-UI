import apiClient from './apiClient';

/**
 * Enquiry Service
 * Handles all API calls related to enquiries and messaging between users and vendors
 */

const enquiryService = {
  // ==================== CUSTOMER ENQUIRY ENDPOINTS ====================
  
  /**
   * Create a new enquiry
   * @param {Object} enquiryData - The enquiry data
   * @param {string} enquiryData.vendor_id - Vendor UUID (required)
   * @param {string} enquiryData.subject - Subject line (required, max 200 chars)
   * @param {string} enquiryData.initial_message - Initial message (required)
   * @param {string} [enquiryData.space_id] - Space UUID (optional)
   * @param {string} [enquiryData.event_date] - Event date in YYYY-MM-DD format (optional)
   * @param {number} [enquiryData.guest_count] - Number of guests (optional)
   * @param {string} [enquiryData.budget_range] - Budget range, e.g., '500000-800000' (optional)
   * @param {string} [enquiryData.priority] - Priority level: 'low', 'normal', 'high', 'urgent' (optional, default: 'normal')
   * @returns {Promise} API response with enquiry details
   */
  createEnquiry: async (enquiryData) => {
    try {
      const response = await apiClient.post('/api/enquiries', enquiryData);
      return response.data;
    } catch (error) {
      console.error('Error creating enquiry:', error);
      throw error;
    }
  },

  /**
   * Get all enquiries for the authenticated customer
   * @param {Object} params - Query parameters (status, page, per_page)
   * @returns {Promise} API response with enquiries list
   */
  getCustomerEnquiries: async (params = {}) => {
    try {
      const response = await apiClient.get('/api/enquiries', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching customer enquiries:', error);
      throw error;
    }
  },

  /**
   * Get a specific enquiry by ID
   * @param {string|number} enquiryId - The enquiry ID
   * @returns {Promise} API response with enquiry details
   */
  getEnquiryById: async (enquiryId) => {
    try {
      const response = await apiClient.get(`/api/enquiries/${enquiryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching enquiry details:', error);
      throw error;
    }
  },

  /**
   * Update enquiry status (customer side)
   * @param {string|number} enquiryId - The enquiry ID
   * @param {string} status - New status (pending, ongoing, confirmed, declined, cancelled, completed)
   * @returns {Promise} API response
   */
  updateEnquiryStatus: async (enquiryId, status) => {
    try {
      const response = await apiClient.put(`/api/enquiries/${enquiryId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating enquiry status:', error);
      throw error;
    }
  },

  /**
   * Cancel an enquiry
   * @param {string|number} enquiryId - The enquiry ID
   * @returns {Promise} API response
   */
  cancelEnquiry: async (enquiryId) => {
    try {
      const response = await apiClient.delete(`/api/enquiries/${enquiryId}`);
      return response.data;
    } catch (error) {
      console.error('Error cancelling enquiry:', error);
      throw error;
    }
  },

  // ==================== MESSAGING ENDPOINTS ====================

  /**
   * Get all messages for a specific enquiry
   * @param {string|number} enquiryId - The enquiry ID
   * @returns {Promise} API response with messages list
   */
  getEnquiryMessages: async (enquiryId) => {
    try {
      const response = await apiClient.get(`/api/enquiries/${enquiryId}/messages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching enquiry messages:', error);
      throw error;
    }
  },

  /**
   * Send a message in an enquiry
   * @param {string|number} enquiryId - The enquiry ID
   * @param {string} message - The message text
   * @returns {Promise} API response
   */
  sendMessage: async (enquiryId, message) => {
    try {
      const response = await apiClient.post(`/api/enquiries/${enquiryId}/messages`, { message });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  /**
   * Mark messages as read in an enquiry
   * @param {string|number} enquiryId - The enquiry ID
   * @returns {Promise} API response
   */
  markMessagesAsRead: async (enquiryId) => {
    try {
      const response = await apiClient.put(`/api/enquiries/${enquiryId}/messages/mark-read`);
      return response.data;
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  },

  /**
   * Get unread message count for customer
   * @returns {Promise} API response with unread count
   */
  getUnreadCount: async () => {
    try {
      const response = await apiClient.get('/api/enquiries/unread-count');
      return response.data;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw error;
    }
  },

  // ==================== ATTACHMENT ENDPOINTS ====================

  /**
   * Upload an attachment to an enquiry
   * @param {string|number} enquiryId - The enquiry ID
   * @param {File} file - The file to upload
   * @returns {Promise} API response
   */
  uploadAttachment: async (enquiryId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiClient.post(
        `/api/enquiries/${enquiryId}/attachments`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error uploading attachment:', error);
      throw error;
    }
  },

  /**
   * Get all attachments for an enquiry
   * @param {string|number} enquiryId - The enquiry ID
   * @returns {Promise} API response with attachments list
   */
  getAttachments: async (enquiryId) => {
    try {
      const response = await apiClient.get(`/api/enquiries/${enquiryId}/attachments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching attachments:', error);
      throw error;
    }
  },

  /**
   * Delete an attachment
   * @param {string|number} enquiryId - The enquiry ID
   * @param {string|number} attachmentId - The attachment ID
   * @returns {Promise} API response
   */
  deleteAttachment: async (enquiryId, attachmentId) => {
    try {
      const response = await apiClient.delete(`/api/enquiries/${enquiryId}/attachments/${attachmentId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting attachment:', error);
      throw error;
    }
  },

  // ==================== VENDOR ENQUIRY ENDPOINTS ====================

  /**
   * Get all enquiries for the authenticated vendor
   * @param {Object} params - Query parameters (status, page, per_page, venue_id)
   * @returns {Promise} API response with vendor enquiries list
   */
  getVendorEnquiries: async (params = {}) => {
    try {
      const response = await apiClient.get('/api/enquiries/vendor', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching vendor enquiries:', error);
      throw error;
    }
  },

  /**
   * Get vendor enquiry by ID
   * @param {string|number} enquiryId - The enquiry ID
   * @returns {Promise} API response with enquiry details
   */
  getVendorEnquiryById: async (enquiryId) => {
    try {
      const response = await apiClient.get(`/api/enquiries/vendor/${enquiryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vendor enquiry details:', error);
      throw error;
    }
  },

  /**
   * Update vendor enquiry status
   * @param {string|number} enquiryId - The enquiry ID
   * @param {string} status - New status
   * @returns {Promise} API response
   */
  updateVendorEnquiryStatus: async (enquiryId, status) => {
    try {
      const response = await apiClient.put(`/api/enquiries/vendor/${enquiryId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating vendor enquiry status:', error);
      throw error;
    }
  },

  /**
   * Get unread enquiry count for vendor
   * @returns {Promise} API response with unread count
   */
  getVendorUnreadCount: async () => {
    try {
      const response = await apiClient.get('/api/enquiries/vendor/unread-count');
      return response.data;
    } catch (error) {
      console.error('Error fetching vendor unread count:', error);
      throw error;
    }
  },

  // ==================== SEARCH AND FILTER ENDPOINTS ====================

  /**
   * Search enquiries (customer side)
   * @param {string} query - Search query
   * @param {Object} filters - Additional filters
   * @returns {Promise} API response with search results
   */
  searchEnquiries: async (query, filters = {}) => {
    try {
      const response = await apiClient.get('/api/enquiries/search', {
        params: { query, ...filters }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching enquiries:', error);
      throw error;
    }
  },

  /**
   * Search vendor enquiries
   * @param {string} query - Search query
   * @param {Object} filters - Additional filters
   * @returns {Promise} API response with search results
   */
  searchVendorEnquiries: async (query, filters = {}) => {
    try {
      const response = await apiClient.get('/api/enquiries/vendor/search', {
        params: { query, ...filters }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching vendor enquiries:', error);
      throw error;
    }
  },

  // ==================== STATISTICS ENDPOINTS (for future use) ====================

  /**
   * Get enquiry statistics for customer
   * @returns {Promise} API response with statistics
   */
  getCustomerStatistics: async () => {
    try {
      const response = await apiClient.get('/api/enquiries/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching customer statistics:', error);
      throw error;
    }
  },

  /**
   * Get enquiry statistics for vendor
   * @returns {Promise} API response with statistics
   */
  getVendorStatistics: async () => {
    try {
      const response = await apiClient.get('/api/enquiries/vendor/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching vendor statistics:', error);
      throw error;
    }
  },

  // ==================== NOTIFICATION ENDPOINTS (for future use) ====================

  /**
   * Get enquiry notifications
   * @returns {Promise} API response with notifications
   */
  getNotifications: async () => {
    try {
      const response = await apiClient.get('/api/enquiries/notifications');
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  /**
   * Mark notification as read
   * @param {string|number} notificationId - The notification ID
   * @returns {Promise} API response
   */
  markNotificationAsRead: async (notificationId) => {
    try {
      const response = await apiClient.put(`/api/enquiries/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },
};

export default enquiryService;
