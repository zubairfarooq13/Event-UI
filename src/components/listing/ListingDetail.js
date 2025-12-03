import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaHeart, FaShare } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';
import { spaceService } from '../../services';
import ImageGallery from './ImageGallery';
import BookingSidebar from './BookingSidebar';
import PricingSection from './PricingSection';
import AmenitiesSection from './AmenitiesSection';
import ReviewsSection from './ReviewsSection';
import PackagesSection from './PackagesSection';
import SmartHeader from '../common/headers/SmartHeader';
import { ALL_GENERAL_FACILITIES, ALL_CATERING_FACILITIES, ALL_MUSIC_FACILITIES } from '../../constants/facilities';

const ListingDetail = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpaceDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Check if it's the dummy card
        if (id === 'dummy-1') {
          // Set dummy venue data
          setVenue({
            id: 'dummy-1',
            name: 'Sample Event Space',
            venueName: 'Sample Venue Management',
            location: 'Main Boulevard, Gulberg III, Lahore',
            city: 'Karachi',
            rating: 4.8,
            reviewCount: 125,
            capacity: 200,
            images: [
              'https://images.unsplash.com/photo-1519167758481-83f29da8fd49?w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&auto=format&fit=crop',
            ],
            description: `Experience luxury and elegance at our premier event space. This stunning venue offers a perfect blend of modern amenities and classic charm, making it ideal for weddings, corporate events, and special celebrations.

With high ceilings, elegant décor, and state-of-the-art facilities, we provide everything you need to make your event unforgettable. Our professional team is dedicated to ensuring every detail is perfect.`,
            
            capacities: {
              standing: 250,
              dining: 200,
              theatre: 180,
              boardroom: 40,
              classroom: 120,
              reception: 220,
            },

            facilities: [
              { name: 'Free Wi-Fi', available: true },
              { name: 'Air Conditioning', available: true },
              { name: 'Parking', available: true },
              { name: 'Sound System', available: true },
              { name: 'Projector & Screen', available: true },
              { name: 'Stage', available: true },
            ],

            cateringDrinks: [
              { name: 'In-house Catering', available: true },
              { name: 'External Caterers Allowed', available: true },
              { name: 'Licensed Bar', available: true },
            ],

            musicSound: [
              { name: 'PA System', available: true },
              { name: 'Microphones', available: true },
              { name: 'DJ Equipment', available: true },
            ],

            rules: {
              allowedEvents: ['Weddings', 'Corporate Events', 'Birthday Parties', 'Conferences'],
              hostRules: [
                'No smoking indoors',
                'Music must end by 11 PM',
                'Respect venue property',
              ],
              cancellationPolicy: 'Full refund if cancelled 7 days before event.',
            },

            pricing: [
              { day: 'Hourly Rate', hours: 'Per hour', price: 'Rs 15,000', type: 'Base rate' },
              { day: 'Half Day', hours: '4 hours', price: 'Rs 50,000', type: 'Package rate' },
              { day: 'Full Day', hours: '8 hours', price: 'Rs 90,000', type: 'Package rate' },
            ],

            packages: [
              {
                id: 1,
                name: 'Basic Package',
                price: 'Rs 50,000',
                description: 'Perfect for small gatherings',
                features: ['Venue for 4 hours', 'Basic decoration', 'Seating for 100'],
                popular: false,
              },
              {
                id: 2,
                name: 'Premium Package',
                price: 'Rs 100,000',
                description: 'Ideal for medium events',
                features: ['Venue for 6 hours', 'Premium decoration', 'Seating for 200', 'Sound system'],
                popular: true,
              },
            ],

            host: {
              name: 'Sample Host',
              initials: 'SH',
              responseRate: '99%',
              responseTime: '1 hour',
              about: 'Professional event space host with years of experience.',
            },
          });
          setLoading(false);
          return;
        }
        
        const result = await spaceService.getSpaceById(id);
        
        if (result.success) {
          const spaceData = result.data?.data || result.data;
          
          // Transform API data to component format
          const transformedVenue = {
            id: spaceData.space_id || spaceData.id,
            name: spaceData.venue_name || spaceData.name || 'Unnamed Venue',
            venueName: spaceData.business_name || spaceData.venue_name,
            location: spaceData.address || spaceData.location || 'Unknown Location',
            city: spaceData.city,
            rating: spaceData.average_rating || 4.5,
            reviewCount: spaceData.total_reviews || 0,
            capacity: spaceData.capacity || 100,
            images: spaceData.photos?.map(p => p.photo_url || p) || [
              'https://placehold.co/800x600/3B82F6/FFFFFF?text=Venue+Image'
            ],
            description: spaceData.description || 'No description available.',
            
            capacities: spaceData.capacities?.reduce((acc, cap) => {
              acc[cap.capacity_type] = cap.capacity_value;
              return acc;
            }, {}) || {},

            facilities: (() => {
              const includedFacilities = spaceData.facilities?.filter(f => f.category === 'general').map(f => f.name) || [];
              
              return ALL_GENERAL_FACILITIES.map(facility => ({
                name: facility,
                available: includedFacilities.includes(facility),
              }));
            })(),

            cateringDrinks: (() => {
              const includedCatering = spaceData.facilities?.filter(f => f.category === 'catering').map(f => f.name) || [];
              
              return ALL_CATERING_FACILITIES.map(facility => ({
                name: facility,
                available: includedCatering.includes(facility),
              }));
            })(),

            musicSound: (() => {
              const includedMusic = spaceData.facilities?.filter(f => f.category === 'music').map(f => f.name) || [];
              
              return ALL_MUSIC_FACILITIES.map(facility => ({
                name: facility,
                available: includedMusic.includes(facility),
              }));
            })(),

            rules: {
              allowedEvents: Array.isArray(spaceData.allowed_events) 
                ? spaceData.allowed_events.map(e => typeof e === 'string' ? e : e.event_type || e.name || String(e))
                : [],
              hostRules: spaceData.rules?.filter(r => r.rule_type === 'house_rule').map(r => r.rule_text) || [],
              cancellationPolicy: spaceData.rules?.find(r => r.rule_type === 'cancellation_policy')?.rule_text || 'No cancellation policy specified.',
            },

            pricing: spaceData.pricing?.map(p => ({
              day: p.pricing_type || p.period_type || 'General',
              hours: 'Available',
              price: `Rs ${p.price?.toLocaleString() || '0'}`,
              type: p.description || `${p.pricing_type || 'rental'} fee`,
            })) || [],
            packages: spaceData.packages?.map(pkg => ({
              id: pkg.package_id || pkg.id,
              name: pkg.name,
              price: `Rs ${pkg.price?.toLocaleString() || '0'}`,
              description: pkg.description || '',
              features: Array.isArray(pkg.features) 
                ? pkg.features.map(f => typeof f === 'string' ? f : f.feature_text || f.name || String(f))
                : [],
              popular: pkg.is_popular || false,
            })) || [],

            host: {
              name: spaceData.vendor_name || 'Host',
              initials: (spaceData.vendor_name || 'H').substring(0, 2).toUpperCase(),
              responseRate: '99%',
              responseTime: '1 hour',
              about: `Your host at ${spaceData.venue_name || 'this venue'}.`,
            },
          };
          
          setVenue(transformedVenue);
        } else {
          setError(result.error || 'Failed to load space details');
        }
      } catch (err) {
        console.error('Error fetching space details:', err);
        setError('Failed to load space details');
      } finally {
        setLoading(false);
      }
    };

    fetchSpaceDetails();
  }, [id]);

  // Mock data fallback for development
  const mockVenue = {
    id: id,
    name: 'The Bedouin Tent Garden',
    venueName: "St Ethelburga's Centre",
    location: 'Bishopsgate, London',
    rating: 4.8,
    reviewCount: 399,
    capacity: 30,
    images: [
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: `Nestled in the heart of the City of London, The Bedouin Tent Garden offers a truly unique and enchanting setting for your special events. This stunning space combines traditional Bedouin tent styling with modern amenities, creating an unforgettable atmosphere for gatherings of all kinds.

The venue features beautiful fabric draping, comfortable seating arrangements, and a warm, inviting ambiance that transports guests to a different world while remaining in central London. Perfect for corporate events, private celebrations, and cultural gatherings.`,
    
    capacities: {
      standing: 30,
      dining: 30,
      theatre: 30,
      boardroom: 30,
      classroom: 25,
      reception: 40,
    },

    facilities: [
      { name: 'Free Wi-Fi', available: true, description: 'High-speed internet access throughout the venue' },
      { name: 'Kitchen Facilities', available: true, description: 'Fully equipped kitchen for catering' },
      { name: 'Air Conditioning', available: true },
      { name: 'Heating', available: true },
      { name: 'Natural Light', available: true, description: 'Large windows providing natural daylight' },
      { name: 'Disabled Access', available: true, description: 'Wheelchair accessible, ground level' },
      { name: 'Tables and Chairs', available: true },
      { name: 'Projector', available: true },
      { name: 'Sound System', available: true },
      { name: 'Microphone', available: true },
      { name: 'Parking', available: false, description: 'Public parking available nearby' },
      { name: 'Bar', available: true },
    ],

    cateringDrinks: [
      { name: 'External Caterers Allowed', available: true },
      { name: 'In-house Catering Available', available: true },
      { name: 'BYO Food Allowed', available: true, description: 'With prior arrangement' },
      { name: 'BYO Alcohol Allowed', available: true, description: 'Corkage fee may apply' },
      { name: 'Licensed Bar', available: true },
    ],

    musicSound: [
      { name: 'PA System', available: true },
      { name: 'Microphones', available: true },
      { name: 'DJ Equipment', available: false },
      { name: 'Live Music Allowed', available: true },
    ],

    rules: {
      allowedEvents: ['Birthday Parties', 'Corporate Events', 'Weddings', 'Workshops', 'Cultural Events', 'Networking Events'],
      hostRules: [
        'No smoking indoors',
        'Music must end by 11 PM',
        'Respect the venue and equipment',
        'Clean up after your event',
      ],
      cancellationPolicy: 'Free cancellation up to 7 days before the event. 50% refund for cancellations 3-7 days before. No refund for cancellations within 3 days.',
    },

    host: {
      name: 'James D.',
      initials: 'JD',
      responseRate: '99%',
      responseTime: '1 hour',
      about: 'James has been hosting events at St Ethelburga\'s Centre for over 5 years and is passionate about creating memorable experiences for all guests.',
    },
  };

  const handleRequestBooking = () => {
    console.log('Request booking clicked');
    // Implement booking logic
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleWishlist = () => {
    console.log('Add to wishlist');
    // Implement wishlist logic
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SmartHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading space details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SmartHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <Link 
              to="/venues"
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors inline-block"
            >
              Back to Venues
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SmartHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Space not found</p>
            <Link 
              to="/venues"
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors inline-block"
            >
              Back to Venues
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SmartHeader />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 mt-16">
        <div className="max-w-[1600px] mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-teal-600">Home</Link>
            <span>/</span>
            <Link to="/venues" className="hover:text-teal-600">Venues</Link>
            <span>/</span>
            <span className="text-gray-900">{venue.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <ImageGallery images={venue.images} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{venue.name}</h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-400" size={16} />
                      <span>{venue.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MdPeople className="text-gray-400" size={18} />
                      <span>Up to {venue.capacity} guests</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-teal-500" size={16} />
                      <span className="font-semibold text-gray-900">{venue.rating}</span>
                    </div>
                    <span className="text-gray-600">({venue.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleShare}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Share"
                  >
                    <FaShare className="text-gray-600" size={20} />
                  </button>
                  <button 
                    onClick={handleWishlist}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Add to wishlist"
                  >
                    <FaHeart className="text-gray-600" size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this space</h2>
              <div className="text-gray-600 text-[15px] leading-relaxed space-y-4">
                {venue.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <PricingSection pricing={venue.pricing} />

            {/* Packages & Offers */}
            <PackagesSection packages={venue.packages} />  

            {/* Catering & Drinks */}
            <AmenitiesSection 
              title="Catering and drinks" 
              amenities={venue.cateringDrinks}
            />

            {/* Facilities */}
            <AmenitiesSection 
              title="Facilities" 
              amenities={venue.facilities}
            />

            {/* Music & Sound Equipment */}
            <AmenitiesSection 
              title="Music & sound equipment" 
              amenities={venue.musicSound}
              showAllByDefault={true}
            />

            {/* Rules of the Space */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-5">Rules of the space</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-[15px]">Allowed events</h3>
                  <div className="flex flex-wrap gap-2">
                    {venue.rules.allowedEvents.map((event, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1.5 rounded-full text-sm text-gray-700">
                        {event}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-[15px]">House rules</h3>
                  <ul className="space-y-2">
                    {venue.rules.hostRules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600 text-[15px]">
                        <span className="text-teal-500 mt-1">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-[15px]">Cancellation policy</h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed">{venue.rules.cancellationPolicy}</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {/* <ReviewsSection rating={venue.rating} totalReviews={venue.reviewCount} /> */}

            {/* About the Venue
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About {venue.venueName}</h2>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                {venue.venueName} is a unique venue in the heart of London, dedicated to providing 
                exceptional spaces for memorable events. With a commitment to quality service and 
                attention to detail, we ensure every event is a success.
              </p>
            </div> */}

            {/* Meet Your Host */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-5">Meet your host</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-700 font-semibold text-xl">{venue.host.initials}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-base mb-2">{venue.host.name}</h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed">{venue.host.about}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Sidebar */}
          <div className="lg:col-span-1">
            <BookingSidebar 
              host={venue.host}
              responseRate={venue.host.responseRate}
              responseTime={venue.host.responseTime}
              onRequestBooking={handleRequestBooking}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;