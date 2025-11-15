import React from 'react';
import { FaCheck } from 'react-icons/fa';

const PackagesSection = ({ packages = [], type = 'venue' }) => {
  const defaultPackages = packages.length > 0 ? packages : [
    {
      id: 1,
      name: 'Basic Package',
      price: 'Rs 50,000',
      description: 'Perfect for intimate gatherings and small celebrations',
      features: [
        'Venue for 4 hours',
        'Basic decoration',
        'Seating for up to 100 guests',
        'Basic sound system',
        'Standard lighting',
      ],
      popular: false,
    },
    {
      id: 2,
      name: 'Premium Package',
      price: 'Rs 125,000',
      description: 'Ideal for medium to large events with enhanced amenities',
      features: [
        'Venue for 6 hours',
        'Premium decoration',
        'Seating for up to 250 guests',
        'Professional sound system',
        'Stage setup',
        'Photography (4 hours)',
        'Catering coordination',
      ],
      popular: true,
    },
    {
      id: 3,
      name: 'Luxury Package',
      price: 'Rs 250,000',
      description: 'Complete event solution with premium services',
      features: [
        'Venue for full day',
        'Luxury decoration & stage',
        'Seating for up to 500 guests',
        'Premium sound & lighting',
        'Photography & Videography',
        'Full catering service',
        'Dedicated event coordinator',
        'Valet parking',
      ],
      popular: false,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Packages & Offers</h2>
      <p className="text-sm text-gray-500 mb-6">Choose the perfect package for your event</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {defaultPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative border-2 rounded-lg p-6 transition-all hover:shadow-lg ${
              pkg.popular
                ? 'border-teal-500 bg-teal-50/30'
                : 'border-gray-200 hover:border-teal-200'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{pkg.name}</h3>
              <div className="mb-3">
                <span className="text-2xl font-bold text-gray-900">{pkg.price}</span>
                <span className="text-sm text-gray-500 ml-1">per event</span>
              </div>
              <p className="text-sm text-gray-600">{pkg.description}</p>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">What's included:</h4>
              <ul className="space-y-2">
                {pkg.features.map((feature, index) => {
                  // Check if feature is an object with 'name' and 'included' properties
                  const featureName = typeof feature === 'string' ? feature : feature.name;
                  const isIncluded = typeof feature === 'string' ? true : feature.included !== false;
                  
                  return (
                    <li key={index} className={`flex items-start gap-2 text-sm ${isIncluded ? 'text-gray-600' : 'text-gray-400'}`}>
                      <FaCheck className={`${isIncluded ? 'text-teal-500' : 'text-gray-300'} mt-0.5 flex-shrink-0`} size={14} />
                      <span className={isIncluded ? '' : 'line-through'}>{featureName}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
                pkg.popular
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50'
              }`}
            >
              Select Package
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Need a custom package?</span> Contact us to create a personalized package tailored to your specific requirements.
        </p>
      </div>
    </div>
  );
};

export default PackagesSection;
