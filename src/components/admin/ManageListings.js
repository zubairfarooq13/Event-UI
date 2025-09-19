import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaEdit, 
  FaTrash, 
  FaTimes, 
  FaSave,
  FaMapMarkerAlt,
  FaUsers,
  FaBuilding,
  FaUtensils,
  FaTree,
  FaHome
} from 'react-icons/fa';

const ManageListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [listingToDelete, setListingToDelete] = useState(null);

  // Mock listings data
  const [listings, setListings] = useState([
    {
      id: 1,
      name: 'Grand Palace Banquet Hall',
      type: 'Marquee',
      city: 'Karachi',
      vendor: 'Elite Events Co.',
      capacity: 500,
      pricePerDay: 25000,
      description: 'Luxurious banquet hall with modern amenities and elegant decor',
      amenities: ['Air Conditioning', 'Sound System', 'Catering Kitchen', 'Parking'],
      rating: 4.8,
      totalBookings: 45,
      status: 'Active',
      createdDate: '2025-08-15'
    },
    {
      id: 2,
      name: 'Rosewood Farmhouse',
      type: 'Farmhouse',
      city: 'Lahore',
      vendor: 'Green Valley Venues',
      capacity: 200,
      pricePerDay: 15000,
      description: 'Beautiful farmhouse surrounded by lush gardens, perfect for outdoor events',
      amenities: ['Swimming Pool', 'Garden', 'BBQ Area', 'Outdoor Seating'],
      rating: 4.6,
      totalBookings: 32,
      status: 'Active',
      createdDate: '2025-07-22'
    },
    {
      id: 3,
      name: 'Spice Garden Restaurant',
      type: 'Restaurant',
      city: 'Islamabad',
      vendor: 'Culinary Delights',
      capacity: 150,
      pricePerDay: 12000,
      description: 'Premium restaurant with private dining areas and exceptional cuisine',
      amenities: ['Private Dining', 'Live Kitchen', 'Valet Parking', 'Wi-Fi'],
      rating: 4.7,
      totalBookings: 67,
      status: 'Active',
      createdDate: '2025-06-10'
    },
    {
      id: 4,
      name: 'Royal Marquee Events',
      type: 'Marquee',
      city: 'Faisalabad',
      vendor: 'Royal Celebrations',
      capacity: 800,
      pricePerDay: 35000,
      description: 'Grand marquee setup with premium facilities for large celebrations',
      amenities: ['Stage Setup', 'Lighting', 'Sound System', 'Decoration'],
      rating: 4.5,
      totalBookings: 28,
      status: 'Active',
      createdDate: '2025-08-01'
    },
    {
      id: 5,
      name: 'Sunset Farmhouse Resort',
      type: 'Farmhouse',
      city: 'Multan',
      vendor: 'Country Retreats',
      capacity: 300,
      pricePerDay: 18000,
      description: 'Scenic farmhouse with lake view and modern facilities',
      amenities: ['Lake View', 'Boating', 'Gazebo', 'Fire Pit'],
      rating: 4.4,
      totalBookings: 21,
      status: 'Active',
      createdDate: '2025-07-05'
    },
    {
      id: 6,
      name: 'Urban Bistro & Lounge',
      type: 'Restaurant',
      city: 'Karachi',
      vendor: 'Metropolitan Dining',
      capacity: 120,
      pricePerDay: 10000,
      description: 'Modern bistro with rooftop seating and city views',
      amenities: ['Rooftop Seating', 'City View', 'Bar Service', 'Live Music'],
      rating: 4.3,
      totalBookings: 54,
      status: 'Suspended',
      createdDate: '2025-05-18'
    }
  ]);

  const listingTypes = ['all', 'Restaurant', 'Farmhouse', 'Marquee'];
  const cities = ['all', 'Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Multan'];

  // Filter listings
  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || listing.type === selectedType;
    const matchesCity = selectedCity === 'all' || listing.city === selectedCity;
    return matchesSearch && matchesType && matchesCity;
  });

  // Handle edit listing
  const handleEdit = (listing) => {
    setEditingListing({ ...listing });
    setShowEditModal(true);
  };

  // Handle save edit
  const handleSaveEdit = () => {
    setListings(prev => prev.map(listing => 
      listing.id === editingListing.id ? editingListing : listing
    ));
    setShowEditModal(false);
    setEditingListing(null);
  };

  // Handle delete click
  const handleDeleteClick = (listing) => {
    setListingToDelete(listing);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    setListings(prev => prev.filter(listing => listing.id !== listingToDelete.id));
    setShowDeleteModal(false);
    setListingToDelete(null);
  };

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Restaurant': return <FaUtensils className="w-4 h-4" />;
      case 'Farmhouse': return <FaTree className="w-4 h-4" />;
      case 'Marquee': return <FaHome className="w-4 h-4" />;
      default: return <FaBuilding className="w-4 h-4" />;
    }
  };

  // Get type color
  const getTypeColor = (type) => {
    switch (type) {
      case 'Restaurant': return 'bg-blue-100 text-blue-800';
      case 'Farmhouse': return 'bg-green-100 text-green-800';
      case 'Marquee': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Listings</h1>
        <p className="text-gray-600">View and manage all venue listings across the platform</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search listings or vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {listingTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-400" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {cities.map(city => (
                <option key={city} value={city}>
                  {city === 'all' ? 'All Cities' : city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{listings.length}</div>
          <div className="text-sm text-gray-600">Total Listings</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">{listings.filter(l => l.status === 'Active').length}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-yellow-600">{listings.filter(l => l.status === 'Suspended').length}</div>
          <div className="text-sm text-gray-600">Suspended</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{filteredListings.length}</div>
          <div className="text-sm text-gray-600">Filtered Results</div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listing Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">{listing.name}</div>
                      <div className="text-sm text-gray-500">{listing.vendor}</div>
                      <div className="text-xs text-gray-400">₹{listing.pricePerDay.toLocaleString()}/day</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(listing.type)}`}>
                      {getTypeIcon(listing.type)}
                      {listing.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="w-3 h-3 text-gray-400" />
                      {listing.city}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <FaUsers className="w-3 h-3 text-gray-400" />
                      {listing.capacity}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      listing.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(listing)}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <FaEdit className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(listing)}
                        className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 transition-colors"
                      >
                        <FaTrash className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{listing.name}</h3>
                <p className="text-sm text-gray-500">{listing.vendor}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                listing.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {listing.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getTypeColor(listing.type)}`}>
                  {getTypeIcon(listing.type)}
                  {listing.type}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <FaMapMarkerAlt className="w-3 h-3 text-gray-400" />
                {listing.city}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <FaUsers className="w-3 h-3 text-gray-400" />
                {listing.capacity} guests
              </div>
              <div className="text-sm font-medium text-gray-900">
                ₹{listing.pricePerDay.toLocaleString()}/day
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(listing)}
                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <FaEdit className="mr-1" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(listing)}
                className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                <FaTrash className="mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No listings found</div>
          <div className="text-gray-400 text-sm">
            {searchTerm || selectedType !== 'all' || selectedCity !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'No listings have been created yet'
            }
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Edit Listing</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Listing Name
                    </label>
                    <input
                      type="text"
                      value={editingListing.name}
                      onChange={(e) => setEditingListing({...editingListing, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={editingListing.type}
                      onChange={(e) => setEditingListing({...editingListing, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Restaurant">Restaurant</option>
                      <option value="Farmhouse">Farmhouse</option>
                      <option value="Marquee">Marquee</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <select
                      value={editingListing.city}
                      onChange={(e) => setEditingListing({...editingListing, city: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {cities.filter(city => city !== 'all').map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Capacity
                    </label>
                    <input
                      type="number"
                      value={editingListing.capacity}
                      onChange={(e) => setEditingListing({...editingListing, capacity: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price per Day (₹)
                  </label>
                  <input
                    type="number"
                    value={editingListing.pricePerDay}
                    onChange={(e) => setEditingListing({...editingListing, pricePerDay: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    value={editingListing.description}
                    onChange={(e) => setEditingListing({...editingListing, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={editingListing.status}
                    onChange={(e) => setEditingListing({...editingListing, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FaSave className="mr-2 inline" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && listingToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FaTrash className="text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Delete Listing</h3>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete{' '}
                <span className="font-medium text-gray-900">{listingToDelete.name}</span>?
                This action cannot be undone and will affect any existing bookings.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 transition-colors"
              >
                Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageListings;