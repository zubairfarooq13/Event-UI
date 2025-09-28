import React from 'react';
import { FaBuilding, FaMapMarkerAlt, FaUsers, FaStar } from 'react-icons/fa';

const statsData = [
  {
    icon: FaBuilding,
    value: '1,825+',
    label: 'Total Venues',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
  {
    icon: FaMapMarkerAlt,
    value: '50+',
    label: 'Cities',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: FaUsers,
    value: '25k+',
    label: 'Happy Customers',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: FaStar,
    value: '4.8★',
    label: 'Average Rating',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

const QuickStats = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our growing community of satisfied customers who found their perfect venues with us
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="group text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Booking</h3>
            <p className="text-gray-600">Your payments and personal information are always protected</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Venues</h3>
            <p className="text-gray-600">All venues are personally verified by our expert team</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600">Get help whenever you need it from our dedicated support team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;