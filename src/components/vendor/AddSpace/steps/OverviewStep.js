import React from 'react';

const OverviewStep = ({ data, onChange }) => {
  const popularTypes = [
    'Apartment / Penthouse',
    'Auditorium',
    'Blank Canvas',
    'Conference Centre',
    'Hall',
    'Hotel',
    'Meeting Centre',
    'Versatile Event Space',
    'Restaurant',
    'Banquet Hall',
    'Marquee',
    'Rooftop'
  ];

  const buildingTypes = [
    'Academic Venue / University Building',
    'Barn / Farm',
    'Boat',
    'Bowling Alley',
    'Castle',
    'Church',
    'Cinema',
    'Country House',
    'Film / Photo Studio',
    'Recording Studio',
    'Dance Studio',
    'Gallery',
    'Golf Club',
    'Historic Building',
    'Library',
    'Museum',
    'Open Air / Outdoor Venue',
    'Party Bus',
    'Railway Arch',
    'School Hall',
    'Stadium / Football Club',
    'Sports Hall',
    'Theatre',
    'Warehouse',
    'Coworking Space'
  ];

  const pakistaniCities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Bahawalpur',
    'Sargodha',
    'Sukkur',
    'Larkana',
    'Sheikhupura',
    'Jhang',
    'Rahim Yar Khan',
    'Gujrat',
    'Mardan',
    'Kasur',
    'Mingora',
    'Dera Ghazi Khan',
    'Sahiwal',
    'Nawabshah',
    'Okara',
    'Mirpur Khas'
  ];

  const handleVenueTypeToggle = (type) => {
    const currentTypes = data.venue_type || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    onChange({ venue_type: newTypes });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Overview</h1>
        <p className="text-gray-600">Let's start with the basics of your space</p>
      </div>

      {/* Venue Name */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">
          Venue name
        </label>
        <input
          type="text"
          value={data.name || ''}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Enter venue name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      {/* Venue Type */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-2">
          Venue type
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Select one or more options that best describe your venue.
        </p>

        {/* Popular */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Popular
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleVenueTypeToggle(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  (data.venue_type || []).includes(type)
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Building */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Building
          </h3>
          <div className="flex flex-wrap gap-2">
            {buildingTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleVenueTypeToggle(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  (data.venue_type || []).includes(type)
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* City */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">
          City
        </label>
        <select
          value={data.city || ''}
          onChange={(e) => onChange({ city: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="">Select a city</option>
          {pakistaniCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Location/Address */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">
          Full Address
        </label>
        <textarea
          value={data.location || ''}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="Enter complete address"
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default OverviewStep;
