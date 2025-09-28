import apiClient from './apiClient';

class VenueService {
  // Search venues with filters
  async searchVenues(filters = {}, page = 1, perPage = 20) {
    try {
      const queryParams = new URLSearchParams();
      
      // Always add all query parameters (even if empty)
      queryParams.append('category', filters.category || ''); // Venue Type
      queryParams.append('city', filters.city || '');
      queryParams.append('capacity', filters.capacity || ''); // Capacity (Guests)
      
      // Handle budget range - always add budget params
      if (filters.budget) {
        const budgetRange = filters.budget.split('-');
        if (budgetRange.length === 2) {
          queryParams.append('min_budget', budgetRange[0]);
          queryParams.append('max_budget', budgetRange[1]);
        } else {
          queryParams.append('min_budget', '');
          queryParams.append('max_budget', '');
        }
        queryParams.append('budget_range', filters.budget); // Budget Range (PKR)
      } else {
        queryParams.append('min_budget', '');
        queryParams.append('max_budget', '');
        queryParams.append('budget_range', '');
      }
      
      // Add pagination parameters
      queryParams.append('page', page.toString());
      queryParams.append('per_page', Math.min(perPage, 100).toString()); // Limit max per_page to 100
      
      const response = await apiClient.get(`/api/listings?${queryParams.toString()}`);
      
      return {
        success: true,
        data: response.data,
        message: 'Venues fetched successfully'
      };
    } catch (error) {
      console.error('Search venues error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to search venues',
        data: []
      };
    }
  }

  // Get all venues
  async getVenues(page = 1, perPage = 20) {
    try {
      const queryParams = new URLSearchParams();
      
      // Always add all query parameters (even if empty)
      queryParams.append('category', ''); // Venue Type
      queryParams.append('city', '');
      queryParams.append('min_budget', '');
      queryParams.append('max_budget', '');
      queryParams.append('budget_range', ''); // Budget Range (PKR)
      queryParams.append('capacity', ''); // Capacity (Guests)
      queryParams.append('page', page.toString());
      queryParams.append('per_page', Math.min(perPage, 100).toString()); // Limit max per_page to 100
      
      const response = await apiClient.get(`/api/listings?${queryParams.toString()}`);
      
      return {
        success: true,
        data: response.data,
        message: 'Venues fetched successfully'
      };
    } catch (error) {
      console.error('Get venues error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch venues',
        data: []
      };
    }
  }

  // Get venue by ID
  async getVenueById(venueId) {
    try {
      const response = await apiClient.get(`/api/listings/${venueId}`);
      
      return {
        success: true,
        data: response.data,
        message: 'Venue details fetched successfully'
      };
    } catch (error) {
      console.error('Get venue details error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch venue details',
        data: null
      };
    }
  }

  // Get venue categories
  async getCategories() {
    try {
      const response = await apiClient.get('/api/listings/categories');
      
      return {
        success: true,
        data: response.data,
        message: 'Categories fetched successfully'
      };
    } catch (error) {
      console.error('Get categories error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch categories',
        data: []
      };
    }
  }

  // Get featured venues
  async getFeaturedVenues(limit = 6) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('per_page', Math.min(limit, 100).toString());
      queryParams.append('featured', 'true'); // Add featured filter
      
      const response = await apiClient.get(`/api/listings?${queryParams.toString()}`);
      
      return {
        success: true,
        data: response.data,
        message: 'Featured venues fetched successfully'
      };
    } catch (error) {
      console.error('Get featured venues error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch featured venues',
        data: []
      };
    }
  }

  // Check venue availability
  async checkAvailability(venueId, date, duration = 1) {
    try {
      const response = await apiClient.post(`/api/listings/${venueId}/availability`, {
        date,
        duration
      });
      
      return {
        success: true,
        data: response.data,
        message: 'Availability checked successfully'
      };
    } catch (error) {
      console.error('Check availability error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to check availability',
        data: null
      };
    }
  }
}

const venueService = new VenueService();
export default venueService;