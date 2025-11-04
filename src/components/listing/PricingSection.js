import React from 'react';
import { FaClock } from 'react-icons/fa';

const PricingSection = ({ pricing = [] }) => {
  const defaultPricing = pricing.length > 0 ? pricing : [
    { day: 'Monday', hours: '8:00 – 2:00', price: '£70–£100', type: 'hire fee per hour' },
    { day: 'Tuesday', hours: '8:00 – 2:00', price: '£70–£100', type: 'hire fee per hour' },
    { day: 'Wednesday', hours: '8:00 – 2:00', price: '£70–£100', type: 'hire fee per hour' },
    { day: 'Thursday', hours: '8:00 – 2:00', price: '£70–£100', type: 'hire fee per hour' },
    { day: 'Friday', hours: '8:00 – 2:00', price: '£70–£100', type: 'hire fee per hour' },
    { day: 'Saturday', hours: '8:00 – 2:00', price: '£70–£100', type: 'hire fee per hour' },
    { day: 'Sunday', hours: '8:00 – 2:00', price: '£70–£100', type: 'hire fee per hour' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Prices</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-sm text-blue-900">
          Prices may vary depending on your specific requirements. For the best offer, enquire today.
        </p>
      </div>

      <div className="space-y-3">
        {defaultPricing.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3">
              <FaClock className="text-gray-400" size={16} />
              <div>
                <div className="font-semibold text-gray-900">{item.day}</div>
                <div className="text-sm text-gray-600">{item.hours}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">from {item.price}</div>
              <div className="text-xs text-gray-600">{item.type}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
