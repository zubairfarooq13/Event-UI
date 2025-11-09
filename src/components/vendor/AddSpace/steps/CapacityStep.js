import React from 'react';

const CapacityStep = ({ data, onChange }) => {
  const capacityTypes = [
    { key: 'standing', label: 'Standing', icon: '🧍' },
    { key: 'dining', label: 'Dining (Seated)', icon: '🍽️' },
    { key: 'theatre', label: 'Theatre Style', icon: '🎭' },
    { key: 'boardroom', label: 'Boardroom', icon: '💼' },
    { key: 'classroom', label: 'Classroom', icon: '📚' },
    { key: 'reception', label: 'Reception', icon: '🥂' }
  ];

  const handleCapacityChange = (key, value) => {
    const capacities = { ...(data.capacities || {}) };
    capacities[key] = value;
    onChange({ capacities });
    
    // Update main capacity with the maximum value
    const maxCapacity = Math.max(...Object.values(capacities).filter(v => v).map(v => parseInt(v) || 0));
    if (maxCapacity > 0) {
      onChange({ capacity: maxCapacity });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Capacity</h1>
        <p className="text-gray-600">How many guests can your space accommodate?</p>
      </div>

      {/* Maximum Capacity */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">
          Maximum Capacity
        </label>
        <input
          type="number"
          min="1"
          value={data.capacity || ''}
          onChange={(e) => onChange({ capacity: e.target.value })}
          placeholder="Enter maximum capacity"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-2">
          The total maximum number of guests your space can accommodate
        </p>
      </div>

      {/* Capacity by Layout */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Capacity by Layout Type
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Specify capacities for different seating arrangements (optional but recommended)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capacityTypes.map((type) => (
            <div key={type.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="mr-2">{type.icon}</span>
                {type.label}
              </label>
              <input
                type="number"
                min="0"
                value={(data.capacities || {})[type.key] || ''}
                onChange={(e) => handleCapacityChange(type.key, e.target.value)}
                placeholder={`${type.label} capacity`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <span className="text-blue-600 text-xl">ℹ️</span>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Capacity Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Standing:</strong> Cocktail parties, networking events</li>
              <li>• <strong>Dining:</strong> Seated meals with tables</li>
              <li>• <strong>Theatre:</strong> Rows of chairs facing forward</li>
              <li>• <strong>Boardroom:</strong> Meeting room style</li>
              <li>• <strong>Classroom:</strong> Training sessions with tables</li>
              <li>• <strong>Reception:</strong> Mix of standing and seated areas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapacityStep;
