import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaEye, FaTrash, FaCheckCircle, FaExclamationCircle, FaBuilding } from 'react-icons/fa';
import VendorHeader from './VendorHeader';

const VendorSpacesList = () => {
  const navigate = useNavigate();
  
  // Dummy data - replace with API call
  const [spaces, setSpaces] = useState([
    {
      id: 1,
      name: 'Grand Marquee Hall',
      type: 'Banquet Hall',
      capacity: 500,
      status: 'active',
      completionPercentage: 100,
      image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c0f8?w=400',
      location: 'Lahore, Punjab',
      price: 150000
    },
    {
      id: 2,
      name: 'Garden Lawn Paradise',
      type: 'Outdoor Venue',
      capacity: 300,
      status: 'active',
      completionPercentage: 85,
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400',
      location: 'Karachi, Sindh',
      price: 100000
    },
    {
      id: 3,
      name: 'Royal Ballroom',
      type: 'Wedding Hall',
      capacity: 400,
      status: 'draft',
      completionPercentage: 60,
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400',
      location: 'Islamabad, ICT',
      price: 200000
    }
  ]);

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700 border-green-200',
      draft: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      inactive: 'bg-gray-100 text-gray-700 border-gray-200'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getCompletionColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompletionIcon = (percentage) => {
    if (percentage >= 90) return <FaCheckCircle className="text-green-600" size={20} />;
    return <FaExclamationCircle className="text-yellow-600" size={20} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <div className="pt-16 p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Venues</h1>
          <p className="text-gray-600 mt-1">
            Manage your venue listings and update their information
          </p>
        </div>
        <button
          onClick={() => navigate('/vendor/add-space')}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
        >
          <FaPlus size={16} />
          Add New Space
        </button>
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <div
            key={space.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* Image */}
            <div className="relative h-48 bg-gray-200">
              <img
                src={space.image}
                alt={space.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                {getStatusBadge(space.status)}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {space.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{space.location}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">{space.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium text-gray-900">{space.capacity} guests</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Starting Price:</span>
                  <span className="font-medium text-gray-900">
                    PKR {space.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Completion Status */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getCompletionIcon(space.completionPercentage)}
                    <span className="text-sm font-medium text-gray-700">
                      Profile Completion
                    </span>
                  </div>
                  <span className={`text-sm font-bold ${getCompletionColor(space.completionPercentage)}`}>
                    {space.completionPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      space.completionPercentage >= 90
                        ? 'bg-green-600'
                        : space.completionPercentage >= 70
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                    }`}
                    style={{ width: `${space.completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/vendor/edit-space/${space.id}`)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                >
                  <FaEdit size={14} />
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/listing/${space.id}`)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <FaEye size={14} />
                  View
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this space?')) {
                      setSpaces(spaces.filter(s => s.id !== space.id));
                    }
                  }}
                  className="px-3 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {spaces.length === 0 && (
        <div className="text-center py-12">
          <FaBuilding size={64} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No venues added yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start by adding your first venue to get bookings
          </p>
          <button
            onClick={() => navigate('/vendor/add-space')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            <FaPlus size={16} />
            Add Your First Space
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default VendorSpacesList;
