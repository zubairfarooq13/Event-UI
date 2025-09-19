import React from 'react';
import { FaBox, FaPlus, FaEdit, FaTrash, FaUsers, FaRupeeSign } from 'react-icons/fa';

const VendorPackages = () => {
  // Dummy packages data
  const packages = [
    {
      id: 1,
      name: 'Wedding Premium',
      description: 'Complete wedding package with decoration, catering, and photography',
      price: 500000,
      capacity: 500,
      features: ['Decoration', 'Catering', 'Photography', 'Music System', 'Lighting']
    },
    {
      id: 2,
      name: 'Birthday Special',
      description: 'Perfect package for birthday celebrations',
      price: 75000,
      capacity: 100,
      features: ['Basic Decoration', 'Sound System', 'Cake Table Setup']
    },
    {
      id: 3,
      name: 'Corporate Event',
      description: 'Professional setup for corporate events and meetings',
      price: 150000,
      capacity: 200,
      features: ['AV Equipment', 'Professional Setup', 'Catering', 'WiFi']
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Packages</h1>
          <p className="text-gray-600 mt-1">Manage your event packages</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <FaPlus size={16} />
          Add Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <FaBox className="text-primary-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <FaEdit size={14} />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-500">
                  <FaTrash size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaRupeeSign size={14} />
                  <span className="text-sm">Price</span>
                </div>
                <span className="font-semibold text-gray-900">PKR {pkg.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUsers size={14} />
                  <span className="text-sm">Capacity</span>
                </div>
                <span className="font-semibold text-gray-900">{pkg.capacity} guests</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
              <div className="flex flex-wrap gap-2">
                {pkg.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorPackages;