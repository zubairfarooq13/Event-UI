import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const CompanyDetailsTab = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    country: user?.country || 'Canada',
    state: '',
    companyName: user?.businessName || '',
    salesTaxStatus: 'not-registered'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to update company details
    alert('Company details updated successfully!');
  };

  const countries = [
    'Canada',
    'United States',
    'United Kingdom',
    'Pakistan',
    'Australia',
    'India'
  ];

  const canadianStates = [
    { code: 'AB', name: 'Alberta' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'NT', name: 'Northwest Territories' },
    { code: 'NU', name: 'Nunavut' },
    { code: 'ON', name: 'Ontario' },
    { code: 'PE', name: 'Prince Edward Island' },
    { code: 'QC', name: 'Quebec' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'YT', name: 'Yukon' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Company details</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-gray-500"
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-gray-500"
          >
            <option value="">Select a state</option>
            {canadianStates.map((state) => (
              <option key={state.code} value={state.code}>
                {state.code} - {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Sales Tax Registration Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sales tax registration status{' '}
            <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="salesTaxStatus"
                value="registered"
                checked={formData.salesTaxStatus === 'registered'}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-700">
                My company is <span className="font-medium">registered</span> for sales tax.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="salesTaxStatus"
                value="not-registered"
                checked={formData.salesTaxStatus === 'not-registered'}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-700">
                My company is <span className="font-medium">not registered</span> for sales tax.
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyDetailsTab;
