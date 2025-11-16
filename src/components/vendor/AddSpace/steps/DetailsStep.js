import React, { useState, useEffect, useRef } from 'react';
import { PAKISTANI_CITIES, PAKISTANI_PROVINCES } from '../../../../constants/locations';

const DetailsStep = ({ data, onChange }) => {
  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Load Google Maps script
  useEffect(() => {
    if (showMap && !window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    } else if (window.google) {
      setMapLoaded(true);
    }
  }, [showMap]);

  // Initialize map when loaded
  useEffect(() => {
    if (mapLoaded && showMap && mapRef.current && !mapInstanceRef.current) {
      const lat = parseFloat(data.latitude) || 24.8607; // Default to Karachi
      const lng = parseFloat(data.longitude) || 67.0011;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
        mapTypeControl: true,
        streetViewControl: false,
      });

      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        draggable: true,
        title: 'Venue Location'
      });

      // Update coordinates when marker is dragged
      marker.addListener('dragend', () => {
        const position = marker.getPosition();
        onChange({
          latitude: position.lat().toString(),
          longitude: position.lng().toString()
        });
      });

      // Add click listener to map to move marker
      map.addListener('click', (e) => {
        const position = e.latLng;
        marker.setPosition(position);
        onChange({
          latitude: position.lat().toString(),
          longitude: position.lng().toString()
        });
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
    }
  }, [mapLoaded, showMap, data.latitude, data.longitude, onChange]);

  const handleShowMap = () => {
    setShowMap(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Address & Location</h1>
        <p className="text-gray-600">Provide the complete address details for your venue</p>
      </div>

      {/* Street Address */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">
          Street Address
        </label>
        <input
          type="text"
          value={data.street_address || ''}
          onChange={(e) => onChange({ street_address: e.target.value })}
          placeholder="Enter street address (e.g., 123 Main Street)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      {/* Street Address Line 2 */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">
          Street Address Line 2 <span className="text-gray-500 text-sm font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          value={data.street_address_line2 || ''}
          onChange={(e) => onChange({ street_address_line2: e.target.value })}
          placeholder="Apartment, suite, unit, building, floor, etc."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      {/* City and Postal Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            {PAKISTANI_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-base font-medium text-gray-900 mb-3">
            Postal Code / ZIP Code
          </label>
          <input
            type="text"
            value={data.postal_code || ''}
            onChange={(e) => onChange({ postal_code: e.target.value })}
            placeholder="Enter postal code"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Province */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">
          Province
        </label>
        <select
          value={data.province || ''}
          onChange={(e) => onChange({ province: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="">Select a province</option>
          {PAKISTANI_PROVINCES.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      {/* Contact Information */}
      <div className="border-t border-gray-200 pt-8 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">
              Email Address
            </label>
            <input
              type="email"
              value={data.business_email || ''}
              onChange={(e) => onChange({ business_email: e.target.value })}
              placeholder="info@yourspace.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">
              Phone Number
            </label>
            <input
              type="tel"
              value={data.business_phone || ''}
              onChange={(e) => onChange({ business_phone: e.target.value })}
              placeholder="+92 300 1234567"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Show Location on Map */}
      <div className="border-t border-gray-200 pt-8 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Show Your Location on Map</h2>
        <p className="text-sm text-gray-600 mb-4">
          Click on the map to set your exact venue location. You can drag the marker to fine-tune the position.
        </p>

        {/* Coordinates Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">
              Latitude <span className="text-gray-500 text-sm font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={data.latitude || ''}
              onChange={(e) => onChange({ latitude: e.target.value })}
              placeholder="24.8607"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">
              Longitude <span className="text-gray-500 text-sm font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={data.longitude || ''}
              onChange={(e) => onChange({ longitude: e.target.value })}
              placeholder="67.0011"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Map Toggle Button */}
        {!showMap && (
          <button
            type="button"
            onClick={handleShowMap}
            className="w-full md:w-auto px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            Open Map to Select Location
          </button>
        )}

        {/* Google Map */}
        {showMap && (
          <div className="mt-4">
            <div 
              ref={mapRef} 
              className="w-full h-[400px] rounded-lg border-2 border-gray-300"
              style={{ minHeight: '400px' }}
            />
            <p className="text-xs text-gray-500 mt-2">
              Click anywhere on the map or drag the marker to set your venue location.
            </p>
          </div>
        )}

        {!showMap && (
          <p className="text-xs text-gray-500 mt-2">
            Or enter coordinates manually. You can find them by searching your address on Google Maps.
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailsStep;
