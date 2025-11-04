import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../common/Header';
import ListingCard from './ListingCard';
import { venueService } from '../../services';

const ListingsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get search filters from URL parameters or localStorage
        const filters = {};
        if (searchParams.get('city')) filters.city = searchParams.get('city');
        if (searchParams.get('eventType')) filters.eventType = searchParams.get('eventType');
        if (searchParams.get('budget')) filters.budget = searchParams.get('budget');
        if (searchParams.get('capacity')) filters.capacity = searchParams.get('capacity');
        
        // If no URL params, try localStorage (from search form)
        if (Object.keys(filters).length === 0) {
          const storedFilters = localStorage.getItem('searchFilters');
          if (storedFilters) {
            Object.assign(filters, JSON.parse(storedFilters));
          }
        }

        // Call the backend API
        const result = await venueService.searchVenues(filters, 1, 20);
        
        if (result.success) {
          // Transform the data to match ListingCard expectations
          const venueData = result.data?.data?.listings || [];
          const transformedListings = venueData.map((venue) => ({
            id: venue.id,
            name: venue.name || venue.business_name || 'Unnamed Venue',
            city: venue.city || venue.location || 'Unknown City',
            capacity: venue.capacity || venue.max_capacity || 100,
            price: venue.min_price || venue.price || venue.base_price || 50000,
            photo: venue.photos?.[0] || venue.photo || venue.image || 'https://placehold.co/400x300/3B82F6/FFFFFF?text=Venue'
          }));
          
          setListings(transformedListings);
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
  }, [searchParams]);

  const handleViewDetails = (id) => {
    navigate(`/venues/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-7xl pt-20">
        
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