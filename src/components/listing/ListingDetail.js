import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaUsers,
  FaStar,
  FaWifi,
  FaParking,
  FaUtensils,
  FaMusic,
  FaCheckCircle,
  FaTimesCircle,
  FaPhone,
  FaEnvelope,
  FaShare,
  FaHeart
} from 'react-icons/fa';
import Header from '../common/Header';
import { venueService } from '../../services';

const ListingDetail = ({ onBookingRequest }) => {
  const { id: vendorId } = useParams();
  const navigate = useNavigate();
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch vendor details on component mount
  useEffect(() => {
    const fetchVendorDetails = async () => {
      if (!vendorId) {
        setError('Vendor ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const result = await venueService.getVenueById(vendorId);

        if (result.success) {
          // Transform the data to match component expectations using correct backend field names
          const vendorData = result.data.data;
          const transformedData = {
            id: vendorData.id,
            name: vendorData.name,
            location: vendorData.location,
            city: vendorData.city,
            capacity: vendorData.capacity,
            description: vendorData.description,
            photos: vendorData.photos || [],
            rating: vendorData.rating || 4.5,
            reviewCount: vendorData.total_reviews || 0,
            type: vendorData.type,
            priceRange: vendorData.price_range,
            amenities: vendorData.amenities || [],
            isAvailable: vendorData.is_active && vendorData.status === 'approved',
            vendor: {
              name: vendorData.name, // Using venue name as vendor name
              phone: vendorData.business_phone,
              email: vendorData.business_email,
              experience: '5+ years' // Default since not provided
            },
            packages: vendorData.packages || []
          };

          setListingData(transformedData);
        } else {
          setError(result.error || 'Failed to load vendor details');
        }
      } catch (err) {
        console.error('Error fetching vendor details:', err);
        setError('Failed to load vendor details');
      } finally {
        setLoading(false);
      }
    };

    fetchVendorDetails();
  }, [vendorId]);

  // Handle back navigation
  const handleBackClick = () => {
    navigate('/venues');
  };

  // Dummy function for booking request
  const handleRequestBooking = (packageId = null) => {
    if (!listingData) return;

    const message = packageId
      ? `Booking request for ${listingData.name} - Package ID: ${packageId}`
      : `Booking request for ${listingData.name}`;

    console.log(message);

    // If onBookingRequest prop is provided, call it (for navigation)
    if (onBookingRequest) {
      onBookingRequest(packageId);
    } else {
      alert(`${message}\n\nWe'll contact you shortly to discuss your requirements!`);
    }
  };

  // Carousel navigation
  const nextImage = () => {
    if (!listingData?.photos) return;
    setCurrentImageIndex((prev) =>
      prev === listingData.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!listingData?.photos) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? listingData.photos.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Loading venue details...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Venue</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleBackClick}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Back to Venues
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!listingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">🏢</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Venue Not Found</h2>
            <p className="text-gray-600 mb-6">The venue you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={handleBackClick}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Back to Venues
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <Header />
      
      {/* Sub-header with Back Button */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackClick}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <FaChevronLeft className="mr-2" />
              Back to Search
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
              >
                <FaHeart className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
                <FaShare className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo Carousel */}
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <div className="relative h-64 sm:h-80 md:h-96">
                <img
                  src={listingData.photos?.[currentImageIndex] || 'https://placehold.co/400x300/3B82F6/FFFFFF?text=Venue'}
                  alt={`${listingData.name}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                {listingData.photos && listingData.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                    >
                      <FaChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                    >
                      <FaChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {listingData.photos && listingData.photos.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {listingData.photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Image Counter */}
                {listingData.photos && listingData.photos.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {listingData.photos.length}
                  </div>
                )}
              </div>
            </div>

            {/* Venue Information */}
            <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {listingData.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{listingData.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaUsers className="mr-2" />
                    <span>{listingData.capacity} guests</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="flex items-center justify-end md:justify-start">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold">{listingData.rating}</span>
                    <span className="text-gray-600 ml-1">({listingData.reviewCount} reviews)</span>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                    listingData.isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {listingData.isAvailable ? (
                      <>
                        <FaCheckCircle className="mr-1" />
                        Available
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className="mr-1" />
                        Not Available
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About this venue</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {listingData.description}
                </p>

                <h4 className="text-md font-semibold text-gray-900 mb-3">Amenities</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {listingData.amenities && listingData.amenities.length > 0 ? (
                    listingData.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <FaCheckCircle className="mr-2 text-primary-600" />
                        <span>{amenity}</span>
                      </div>
                    ))
                  ) : (
                    // Default amenities if none provided
                    [
                      { name: "Free WiFi", icon: FaWifi },
                      { name: "Parking Available", icon: FaParking },
                      { name: "Catering Service", icon: FaUtensils },
                      { name: "Sound System", icon: FaMusic },
                    ].map((amenity, index) => {
                      const IconComponent = amenity.icon;
                      return (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <IconComponent className="mr-2 text-primary-600" />
                          <span>{amenity.name}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Packages Section */}
            <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {listingData.packages && listingData.packages.length > 0 ? (
                  listingData.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                        selectedPackage === pkg.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{pkg.title || pkg.name}</h3>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary-600">{pkg.price || 'Contact for pricing'}</div>
                          <div className="text-sm text-gray-500">per event</div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                      {pkg.features && (
                        <ul className="space-y-2">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRequestBooking(pkg.id);
                        }}
                        className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                      >
                        Select Package
                      </button>
                    </div>
                  ))
                ) : (
                  // Default packages if none provided by API
                  [
                    {
                      id: 1,
                      title: "Basic Package",
                      description: "Perfect for intimate gatherings. Includes basic decoration, sound system, and seating arrangement.",
                      price: "PKR 25,000",
                      features: ["Basic Decoration", "Sound System", "Seating for 100", "4 Hours Duration"]
                    },
                    {
                      id: 2,
                      title: "Premium Package",
                      description: "Ideal for medium-sized events. Enhanced decoration, catering options, and extended venue access.",
                      price: "PKR 65,000",
                      features: ["Premium Decoration", "Catering Service", "Seating for 250", "6 Hours Duration", "Photography"]
                    },
                    {
                      id: 3,
                      title: "Luxury Package",
                      description: "The ultimate celebration experience. Full-service planning, gourmet catering, and premium amenities.",
                      price: "PKR 1,25,000",
                      features: ["Luxury Decoration", "Gourmet Catering", "Seating for 500", "Full Day Access", "Photography & Videography", "Event Coordinator"]
                    }
                  ].map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                        selectedPackage === pkg.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{pkg.title}</h3>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary-600">{pkg.price}</div>
                          <div className="text-sm text-gray-500">per event</div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRequestBooking(pkg.id);
                        }}
                        className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                      >
                        Select Package
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-32">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Vendor</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{listingData.vendor.name}</h4>
                  <p className="text-sm text-gray-600">{listingData.vendor.experience} in event management</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaPhone className="mr-3 text-primary-600" />
                    <span>{listingData.vendor.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaEnvelope className="mr-3 text-primary-600" />
                    <span>{listingData.vendor.email}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Quick Stats</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Response Rate:</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response Time:</span>
                      <span className="font-medium">Within 2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Bookings:</span>
                      <span className="font-medium">500+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Request Booking Button (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
        <button
          onClick={() => handleRequestBooking()}
          disabled={!listingData.isAvailable}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {listingData.isAvailable ? 'Request Booking' : 'Currently Unavailable'}
        </button>
      </div>

      {/* Inline Request Booking Button (Desktop) */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Book?</h3>
          <p className="text-gray-600 mb-4">Get in touch with the vendor to discuss your requirements and finalize booking details.</p>
          <button
            onClick={() => handleRequestBooking()}
            disabled={!listingData.isAvailable}
            className="bg-primary-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {listingData.isAvailable ? 'Request Booking' : 'Currently Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;