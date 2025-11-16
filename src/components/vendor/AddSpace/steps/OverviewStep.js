import React from 'react';
import { FaBuilding, FaDoorOpen, FaUsers, FaGlobeAmericas, FaTree, FaLeaf } from 'react-icons/fa';

const OverviewStep = ({ data, onChange }) => {
  const spaceTypes = [
    {
      id: 'whole_venue',
      icon: <FaBuilding className="w-8 h-8 text-gray-600" />,
      title: 'Whole venue',
      description: 'The entire venue exclusively for the customer.'
    },
    {
      id: 'private_space',
      icon: <FaDoorOpen className="w-8 h-8 text-gray-600" />,
      title: 'Private space within the venue',
      description: 'A space within the venue that is exclusively reserved for a specific group or individual.'
    },
    {
      id: 'semi_private',
      icon: <FaUsers className="w-8 h-8 text-gray-600" />,
      title: 'Semi-private area within the space',
      description: 'An area that is partially secluded or separated from the rest of the space, but is not completely private.'
    },
    {
      id: 'shared_space',
      icon: <FaGlobeAmericas className="w-8 h-8 text-gray-600" />,
      title: 'Shared space',
      description: 'A non-exclusive, common area with open access for everyone.'
    },
    {
      id: 'private_outdoor',
      icon: <FaTree className="w-8 h-8 text-gray-600" />,
      title: 'Private outdoor space',
      description: 'An outdoor area that is exclusively reserved for the use of a specific group or individual.'
    },
    {
      id: 'semi_private_outdoor',
      icon: <FaLeaf className="w-8 h-8 text-gray-600" />,
      title: 'Semi-private outdoor space',
      description: 'An outdoor area that is partially separated from the rest of the space, but is not completely private.'
    }
  ];

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

  const handleSpaceTypeSelect = (typeId) => {
    onChange({ space_type: typeId });
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

      {/* Space Type */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-2">
          What part of the venue does this space represent?
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Let your customers know whether the space is private or will be shared with other guests.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {spaceTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleSpaceTypeSelect(type.id)}
              className={`relative p-6 rounded-lg border-2 transition-all text-left hover:border-teal-300 ${
                data.space_type === type.id
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {type.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {type.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {type.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    data.space_type === type.id
                      ? 'border-teal-500 bg-teal-500'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {data.space_type === type.id && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">
          Venue Description
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
    </div>
  );
};

export default OverviewStep;
