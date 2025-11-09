import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const PricingStep = ({ data, onChange }) => {
  const [newPricing, setNewPricing] = useState({
    pricing_type: 'hourly',
    price: '',
    min_hours: '',
    description: ''
  });

  const [newPackage, setNewPackage] = useState({
    name: '',
    description: '',
    price: '',
    duration_hours: '',
    max_guests: '',
    features: []
  });

  const [newFeature, setNewFeature] = useState('');

  const pricingTypes = [
    { value: 'hourly', label: 'Per Hour' },
    { value: 'half_day', label: 'Half Day (4 hours)' },
    { value: 'full_day', label: 'Full Day (8 hours)' },
    { value: 'per_person', label: 'Per Person' },
    { value: 'custom', label: 'Custom' }
  ];

  const addPricing = () => {
    if (newPricing.price) {
      const pricingList = [...(data.pricing || []), newPricing];
      onChange({ pricing: pricingList });
      setNewPricing({
        pricing_type: 'hourly',
        price: '',
        min_hours: '',
        description: ''
      });
    }
  };

  const removePricing = (index) => {
    const pricingList = (data.pricing || []).filter((_, i) => i !== index);
    onChange({ pricing: pricingList });
  };

  const addPackage = () => {
    if (newPackage.name && newPackage.price) {
      const packageList = [...(data.packages || []), newPackage];
      onChange({ packages: packageList });
      setNewPackage({
        name: '',
        description: '',
        price: '',
        duration_hours: '',
        max_guests: '',
        features: []
      });
    }
  };

  const removePackage = (index) => {
    const packageList = (data.packages || []).filter((_, i) => i !== index);
    onChange({ packages: packageList });
  };

  const addFeatureToPackage = () => {
    if (newFeature.trim()) {
      setNewPackage({
        ...newPackage,
        features: [...newPackage.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const removeFeatureFromPackage = (index) => {
    setNewPackage({
      ...newPackage,
      features: newPackage.features.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Pricing</h1>
        <p className="text-gray-600">Set your pricing and packages</p>
      </div>

      {/* Standard Pricing */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Standard Pricing
        </h3>
        
        {/* Added Pricing List */}
        {(data.pricing || []).length > 0 && (
          <div className="space-y-3 mb-6">
            {data.pricing.map((pricing, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">
                      Rs {pricing.price}
                    </span>
                    <span className="text-gray-600">
                      {pricingTypes.find(t => t.value === pricing.pricing_type)?.label}
                    </span>
                    {pricing.min_hours && (
                      <span className="text-sm text-gray-500">
                        (Min {pricing.min_hours} hours)
                      </span>
                    )}
                  </div>
                  {pricing.description && (
                    <p className="text-sm text-gray-600 mt-1">{pricing.description}</p>
                  )}
                </div>
                <button
                  onClick={() => removePricing(index)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add New Pricing */}
        <div className="border border-gray-300 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pricing Type
              </label>
              <select
                value={newPricing.pricing_type}
                onChange={(e) => setNewPricing({ ...newPricing, pricing_type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {pricingTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (Rs)
              </label>
              <input
                type="number"
                min="0"
                value={newPricing.price}
                onChange={(e) => setNewPricing({ ...newPricing, price: e.target.value })}
                placeholder="Enter price"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {newPricing.pricing_type === 'hourly' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Hours
                </label>
                <input
                  type="number"
                  min="1"
                  value={newPricing.min_hours}
                  onChange={(e) => setNewPricing({ ...newPricing, min_hours: e.target.value })}
                  placeholder="Minimum booking hours"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            )}

            <div className={newPricing.pricing_type === 'hourly' ? '' : 'md:col-span-2'}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <input
                type="text"
                value={newPricing.description}
                onChange={(e) => setNewPricing({ ...newPricing, description: e.target.value })}
                placeholder="Additional pricing details"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={addPricing}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <FaPlus size={14} />
            <span>Add Pricing Option</span>
          </button>
        </div>
      </div>

      {/* Packages */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Packages (Optional)
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Create packages to offer bundled services at special rates
        </p>

        {/* Added Packages List */}
        {(data.packages || []).length > 0 && (
          <div className="space-y-4 mb-6">
            {data.packages.map((pkg, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                    <p className="text-2xl font-bold text-teal-600 mt-1">Rs {pkg.price}</p>
                  </div>
                  <button
                    onClick={() => removePackage(index)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <FaTrash />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  {pkg.duration_hours && <span>⏱️ {pkg.duration_hours} hours</span>}
                  {pkg.max_guests && <span>👥 Up to {pkg.max_guests} guests</span>}
                </div>
                {pkg.features.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-teal-600 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add New Package */}
        <div className="border border-gray-300 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Name
              </label>
              <input
                type="text"
                value={newPackage.name}
                onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                placeholder="e.g., Wedding Package, Corporate Package"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newPackage.description}
                onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                placeholder="Describe what's included in this package"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Price (Rs)
              </label>
              <input
                type="number"
                min="0"
                value={newPackage.price}
                onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                placeholder="Total package price"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (Hours)
              </label>
              <input
                type="number"
                min="1"
                value={newPackage.duration_hours}
                onChange={(e) => setNewPackage({ ...newPackage, duration_hours: e.target.value })}
                placeholder="Package duration"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Guests
              </label>
              <input
                type="number"
                min="1"
                value={newPackage.max_guests}
                onChange={(e) => setNewPackage({ ...newPackage, max_guests: e.target.value })}
                placeholder="Maximum number of guests"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Package Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Package Features
            </label>
            {newPackage.features.length > 0 && (
              <ul className="mb-3 space-y-2">
                {newPackage.features.map((feature, index) => (
                  <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{feature}</span>
                    <button
                      onClick={() => removeFeatureFromPackage(index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      <FaTrash size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addFeatureToPackage()}
                placeholder="e.g., Complimentary drinks, DJ included"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                onClick={addFeatureToPackage}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          <button
            onClick={addPackage}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <FaPlus size={14} />
            <span>Add Package</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingStep;
