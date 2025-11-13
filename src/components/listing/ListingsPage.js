import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import Header from '../common/Header';
import ListingCard from './ListingCard';
import { spaceService } from '../../services';
import LandingHeader from '../landing/LandingHeader';
import VenueFilters from './VenueFilters';

const ListingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Dummy card that always displays
  const dummyCard = {
    id: 'dummy-1',
    name: 'Sample Event Space',
    city: 'Karachi',
    capacity: 200,
    price: 75000,
    photo: 'https://images.unsplash.com/photo-1519167758481-83f29da8fd49?w=800&auto=format&fit=crop'
  };
  
  const [listings, setListings] = useState([dummyCard]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilters, setCurrentFilters] = useState({});

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Check if search results were passed from HeroSection
        const passedResults = location.state?.searchResults;
        
        if (passedResults) {
          console.log('Using pre-loaded search results from HeroSection');
          
          // Transform the passed data to match ListingCard expectations
          const venueData = passedResults?.data?.spaces || passedResults?.spaces || [];
          const transformedListings = venueData.map((venue) => ({
            id: venue.id || venue.space_id,
            name: venue.venue_name || venue.name || 'Unnamed Venue',
            city: venue.city || venue.location || 'Unknown City',
            capacity: venue.capacity || venue.max_capacity || 100,
            price: venue.pricing?.[0]?.price || venue.price || venue.base_price || 50000,
            photo: venue.photos?.[0]?.photo_url || venue.photo || venue.image || 'https://placehold.co/400x300/3B82F6/FFFFFF?text=Venue'
          }));
          
          // Always include dummy card along with real results
          setListings([dummyCard, ...transformedListings]);
          
          // Store current filters from URL params
          setCurrentFilters({
            eventType: searchParams.get('eventType') || '',
            location: searchParams.get('city') || '',
            guests: searchParams.get('capacity') || '',
            date: searchParams.get('date') || '',
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || '',
          });
          
          setLoading(false);
          return; // Skip API call since we have results
        }
        
        // No pre-loaded results, fetch from API
        console.log('No pre-loaded results, fetching from API');
        
        // Get search filters from URL parameters or localStorage
        const filters = {};
        if (searchParams.get('city')) filters.city = searchParams.get('city');
        if (searchParams.get('eventType')) filters.eventType = searchParams.get('eventType');
        if (searchParams.get('budget')) filters.budget = searchParams.get('budget');
        if (searchParams.get('capacity')) filters.capacity = searchParams.get('capacity');
        if (searchParams.get('minPrice')) filters.minPrice = searchParams.get('minPrice');
        if (searchParams.get('maxPrice')) filters.maxPrice = searchParams.get('maxPrice');
        if (searchParams.get('date')) filters.date = searchParams.get('date');
        
        // If no URL params, try localStorage (from search form)
        if (Object.keys(filters).length === 0) {
          const storedFilters = localStorage.getItem('searchFilters');
          if (storedFilters) {
            Object.assign(filters, JSON.parse(storedFilters));
          }
        }

        // Store current filters for the filter component
        setCurrentFilters({
          eventType: filters.eventType || searchParams.get('eventType') || '',
          location: filters.city || searchParams.get('city') || '',
          guests: filters.capacity || searchParams.get('capacity') || '',
          date: filters.date || searchParams.get('date') || '',
          minPrice: filters.minPrice || searchParams.get('minPrice') || '',
          maxPrice: filters.maxPrice || searchParams.get('maxPrice') || '',
        });

        // Call the backend API using spaceService
        const result = await spaceService.searchSpaces(filters, 1, 20);
        
        if (result.success) {
          // Transform the data to match ListingCard expectations
          const venueData = result.data?.data?.spaces || result.data?.spaces || [];
          const transformedListings = venueData.map((venue) => ({
            id: venue.id || venue.space_id,
            name: venue.venue_name || venue.name || 'Unnamed Venue',
            city: venue.city || venue.location || 'Unknown City',
            capacity: venue.capacity || venue.max_capacity || 100,
            price: venue.pricing?.[0]?.price || venue.price || venue.base_price || 50000,
            photo: venue.photos?.[0]?.photo_url || venue.photo || venue.image || 'https://placehold.co/400x300/3B82F6/FFFFFF?text=Venue'
          }));
          
          // Always include dummy card along with real results
          setListings([dummyCard, ...transformedListings]);
        } else {
          setError('Failed to load venues');
        }
      } catch (err) {
        console.error('Error fetching venues:', err);
        setError('Failed to load venues');
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [searchParams, location.state]);

  const handleViewDetails = (id) => {
    navigate(`/venues/${id}`);
  };

  const handleFilterChange = (newFilters) => {
    // Update URL search params
    const params = new URLSearchParams();
    if (newFilters.eventType) params.set('eventType', newFilters.eventType);
    if (newFilters.location) params.set('city', newFilters.location);
    if (newFilters.guests) params.set('capacity', newFilters.guests);
    if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice);
    if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice);
    if (newFilters.date) params.set('date', newFilters.date);
    
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />
      <VenueFilters 
        onFilterChange={handleFilterChange}
        initialFilters={currentFilters}
      />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Venues</h1>
          {!loading && !error && (
            <p className="text-gray-600">
              {listings.length > 0 
                ? `${listings.length} venue${listings.length === 1 ? '' : 's'} found`
                : 'No venues match your criteria'
              }
            </p>
          )}
        </div>

        {error ? (
          <div className="text-center py-8">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading venues...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {listings && listings.length > 0 ? (
              listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onViewDetails={handleViewDetails}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">🏢</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No venues found</h2>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all venues.</p>
                <button
                  onClick={() => {
                    localStorage.removeItem('searchFilters');
                    window.location.reload();
                  }}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  View All Venues
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;