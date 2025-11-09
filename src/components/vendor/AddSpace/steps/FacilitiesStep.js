import React from 'react';

const FacilitiesStep = ({ data, onChange }) => {
  const generalFacilities = [
    'WiFi',
    'Parking',
    'Air Conditioning',
    'Heating',
    'Disabled Access',
    'Outdoor Space',
    'Natural Light',
    'Projector',
    'Screen',
    'Stage',
    'Dance Floor',
    'Tables',
    'Chairs',
    'Kitchen Facilities',
    'Toilets',
    'Changing Rooms',
    'Storage Space',
    'Reception Area',
    'Cloakroom',
    'Lift/Elevator'
  ];

  const cateringDrinks = [
    'In-house Catering',
    'External Catering Allowed',
    'Bar Facilities',
    'Licensed Bar',
    'Bring Your Own Drinks',
    'Tea/Coffee Facilities',
    'Kitchen Available',
    'Halal Options',
    'Vegetarian Options',
    'Vegan Options'
  ];

  const musicSound = [
    'PA System',
    'Microphones',
    'DJ Equipment',
    'Live Music Allowed',
    'Piano',
    'Drum Kit',
    'Mixing Desk',
    'Stage Lighting',
    'Mood Lighting',
    'Sound Limiter'
  ];

  const toggleFacility = (category, facility) => {
    const currentList = data[category] || [];
    const newList = currentList.includes(facility)
      ? currentList.filter(f => f !== facility)
      : [...currentList, facility];
    onChange({ [category]: newList });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Facilities</h1>
        <p className="text-gray-600">Select all amenities available at your space</p>
      </div>

      {/* General Facilities */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          General Facilities
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {generalFacilities.map((facility) => (
            <button
              key={facility}
              onClick={() => toggleFacility('facilities', facility)}
              className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all ${
                (data.facilities || []).includes(facility)
                  ? 'border-teal-600 bg-teal-50 text-teal-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {facility}
            </button>
          ))}
        </div>
      </div>

      {/* Catering & Drinks */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Catering & Drinks
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {cateringDrinks.map((facility) => (
            <button
              key={facility}
              onClick={() => toggleFacility('catering_drinks', facility)}
              className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all ${
                (data.catering_drinks || []).includes(facility)
                  ? 'border-teal-600 bg-teal-50 text-teal-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {facility}
            </button>
          ))}
        </div>
      </div>

      {/* Music & Sound */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Music & Sound Equipment
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {musicSound.map((facility) => (
            <button
              key={facility}
              onClick={() => toggleFacility('music_sound', facility)}
              className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all ${
                (data.music_sound || []).includes(facility)
                  ? 'border-teal-600 bg-teal-50 text-teal-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {facility}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Facility */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-base font-medium text-gray-900 mb-3">
          Add Custom Facility
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Don't see what you're looking for? Add your own facilities.
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter facility name"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                toggleFacility('facilities', e.target.value.trim());
                e.target.value = '';
              }
            }}
          />
          <button
            onClick={(e) => {
              const input = e.target.previousElementSibling;
              if (input.value.trim()) {
                toggleFacility('facilities', input.value.trim());
                input.value = '';
              }
            }}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesStep;
