import React from 'react';

const DetailsStep = ({ data, onChange }) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Details</h1>
        <p className="text-gray-600">Tell us more about your space</p>
      </div>

      {/* Venue Name (Business Name) */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">
          Business/Venue Official Name
        </label>
        <input
          type="text"
          value={data.venue_name || ''}
          onChange={(e) => onChange({ venue_name: e.target.value })}
          placeholder="Enter official business name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-2">
          This will be displayed on your listing
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">
          Description
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Describe your space, its unique features, and what makes it special for events.
        </p>
        <textarea
          value={data.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Tell guests about your space... Include details about the atmosphere, amenities, parking, accessibility, and what makes it perfect for events."
          rows={10}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-2">
          {(data.description || '').length} characters
        </p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-base font-medium text-gray-900 mb-3">
            Business Phone
          </label>
          <input
            type="tel"
            value={data.business_phone || ''}
            onChange={(e) => onChange({ business_phone: e.target.value })}
            placeholder="+92 300 1234567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-gray-900 mb-3">
            Business Email
          </label>
          <input
            type="email"
            value={data.business_email || ''}
            onChange={(e) => onChange({ business_email: e.target.value })}
            placeholder="info@yourspace.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
