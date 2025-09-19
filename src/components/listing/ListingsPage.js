import React, { useState, useEffect } from 'react';
import { 
  FaFilter, 
  FaTimes, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaChevronLeft, 
  FaChevronRight,
  FaSearch
} from 'react-icons/fa';
import ListingCard from './ListingCard';
import ListingCardSkeleton from './ListingCardSkeleton';

// Dummy data for listings
const generateDummyListings = () => [
  {
    id: 1,
    name: "Royal Marquee",
    city: "Lahore",
    capacity: 500,
    price: 250000,
    photo: "https://placehold.co/400x300/3B82F6/FFFFFF?text=Royal+Marquee"
  },
  {
    id: 2,
    name: "Garden Paradise",
    city: "Karachi",
    capacity: 300,
    price: 180000,
    photo: "https://placehold.co/400x300/10B981/FFFFFF?text=Garden+Paradise"
  },
  {
    id: 3,
    name: "Elite Banquet Hall",
    city: "Islamabad",
    capacity: 800,
    price: 450000,
    photo: "https://placehold.co/400x300/8B5CF6/FFFFFF?text=Elite+Banquet"
  },
  {
    id: 4,
    name: "Sunset Farmhouse",
    city: "Lahore",
    capacity: 200,
    price: 120000,
    photo: "https://placehold.co/400x300/F59E0B/FFFFFF?text=Sunset+Farmhouse"
  },
  {
    id: 5,
    name: "Crystal Palace",
    city: "Karachi",
    capacity: 600,
    price: 350000,
    photo: "https://placehold.co/400x300/EF4444/FFFFFF?text=Crystal+Palace"
  },
  {
    id: 6,
    name: "Heritage Venue",
    city: "Lahore",
    capacity: 400,
    price: 280000,
    photo: "https://placehold.co/400x300/6366F1/FFFFFF?text=Heritage+Venue"
  },
  {
    id: 7,
    name: "Modern Events Hub",
    city: "Islamabad",
    capacity: 350,
    price: 220000,
    photo: "https://placehold.co/400x300/14B8A6/FFFFFF?text=Modern+Hub"
  },
  {
    id: 8,
    name: "Luxury Resort",
    city: "Murree",
    capacity: 150,
    price: 180000,
    photo: "https://placehold.co/400x300/F97316/FFFFFF?text=Luxury+Resort"
  },
  {
    id: 9,
    name: "Grand Ballroom",
    city: "Karachi",
    capacity: 1000,
    price: 600000,
    photo: "https://placehold.co/400x300/84CC16/FFFFFF?text=Grand+Ballroom"
  },
  {
    id: 10,
    name: "Rooftop Terrace",
    city: "Islamabad",
    capacity: 250,
    price: 150000,
    photo: "https://placehold.co/400x300/EC4899/FFFFFF?text=Rooftop+Terrace"
  },
  {
    id: 11,
    name: "Country Club",
    city: "Lahore",
    capacity: 450,
    price: 320000,
    photo: "https://placehold.co/400x300/6B7280/FFFFFF?text=Country+Club"
  },
  {
    id: 12,
    name: "Beachside Venue",
    city: "Karachi",
    capacity: 300,
    price: 240000,
    photo: "https://placehold.co/400x300/0EA5E9/FFFFFF?text=Beachside+Venue"
  }
];

const ListingsPage = ({ filters = {}, onViewDetails }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState(filters);
  
  const itemsPerPage = 9;
  const totalListings = generateDummyListings().length;
  const totalPages = Math.ceil(totalListings / itemsPerPage);

  // Simulate API call
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate occasional error for demo
        if (Math.random() < 0.1) {
          throw new Error('Failed to load listings. Please try again.');
        }
        
        const allListings = generateDummyListings();
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedListings = allListings.slice(startIndex, endIndex);
        
        setListings(paginatedListings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [currentPage]);

  // Handle navigation to listing details
  const handleViewDetails = (id) => {
    if (onViewDetails) {
      onViewDetails(id);
    } else {
      // Fallback for direct component usage
      console.log(`Navigate to listing details for ID: ${id}`);
      // In a real app with React Router:
      // navigate(`/listing/${id}`);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({});
    setCurrentPage(1);
  };

  // Check if any filters are active
  const hasActiveFilters = Object.keys(activeFilters).some(
    key => activeFilters[key] && activeFilters[key] !== ''
  );

  // Handle pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Format filter display
  const formatFilterValue = (key, value) => {
    switch (key) {
      case 'budget':
        return `PKR ${parseInt(value).toLocaleString()}`;
      case 'capacity':
        return `${value} guests`;
      case 'date':
        return new Date(value).toLocaleDateString();
      default:
        return value;
    }
  };

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header Section with Active Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Venues</h1>
            <p className="text-gray-600">
              {loading ? 'Loading...' : `${totalListings} venues available`}
            </p>
          </div>
          
          {/* Search and Filter Actions */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FaSearch className="text-gray-400" />
              <span className="hidden sm:inline">Search</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FaFilter className="text-gray-400" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              
              {Object.entries(activeFilters).map(([key, value]) => {
                if (!value) return null;
                
                return (
                  <div
                    key={key}
                    className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border text-sm"
                  >
                    <span className="capitalize font-medium text-gray-700">{key}:</span>
                    <span className="text-gray-600">{formatFilterValue(key, value)}</span>
                    <button
                      onClick={() => setActiveFilters(prev => ({ ...prev, [key]: '' }))}
                      className="text-gray-400 hover:text-gray-600 ml-1"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                );
              })}
              
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium border-l pl-3 ml-2"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <ListingCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8 border-t">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaChevronLeft size={14} />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage = 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1);
                  
                  if (!showPage) {
                    // Show ellipsis
                    if (page === 2 && currentPage > 4) {
                      return <span key={page} className="px-2 text-gray-400">...</span>;
                    }
                    if (page === totalPages - 1 && currentPage < totalPages - 3) {
                      return <span key={page} className="px-2 text-gray-400">...</span>;
                    }
                    return null;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="hidden sm:inline">Next</span>
                <FaChevronRight size={14} />
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && listings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏢</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No venues found</h2>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search criteria to find more venues.
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ListingsPage;