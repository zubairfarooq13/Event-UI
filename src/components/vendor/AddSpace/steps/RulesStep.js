import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const RulesStep = ({ data, onChange }) => {
  const [newRule, setNewRule] = useState('');
  const [newAllowedEvent, setNewAllowedEvent] = useState('');

  const commonEvents = [
    'Wedding',
    'Wedding Reception',
    'Birthday Party',
    'Corporate Event',
    'Conference',
    'Seminar',
    'Workshop',
    'Product Launch',
    'Networking Event',
    'Anniversary',
    'Engagement',
    'Baby Shower',
    'Bridal Shower',
    'Cocktail Party',
    'Gala Dinner',
    'Charity Event',
    'Graduation Party',
    'Music Concert',
    'Fashion Show',
    'Art Exhibition'
  ];

  const toggleAllowedEvent = (event) => {
    const currentEvents = data.allowed_events || [];
    const newEvents = currentEvents.includes(event)
      ? currentEvents.filter(e => e !== event)
      : [...currentEvents, event];
    onChange({ allowed_events: newEvents });
  };

  const addCustomEvent = () => {
    if (newAllowedEvent.trim()) {
      const currentEvents = data.allowed_events || [];
      if (!currentEvents.includes(newAllowedEvent.trim())) {
        onChange({ allowed_events: [...currentEvents, newAllowedEvent.trim()] });
      }
      setNewAllowedEvent('');
    }
  };

  const removeAllowedEvent = (event) => {
    const currentEvents = data.allowed_events || [];
    onChange({ allowed_events: currentEvents.filter(e => e !== event) });
  };

  const addHouseRule = () => {
    if (newRule.trim()) {
      const currentRules = data.house_rules || [];
      onChange({ house_rules: [...currentRules, newRule.trim()] });
      setNewRule('');
    }
  };

  const removeHouseRule = (index) => {
    const currentRules = data.house_rules || [];
    onChange({ house_rules: currentRules.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Rules & Policies</h1>
        <p className="text-gray-600">Set guidelines for using your space</p>
      </div>

      {/* Allowed Events */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Allowed Event Types
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Select the types of events that can be hosted at your space
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {commonEvents.map((event) => (
            <button
              key={event}
              onClick={() => toggleAllowedEvent(event)}
              className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all ${
                (data.allowed_events || []).includes(event)
                  ? 'border-teal-600 bg-teal-50 text-teal-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {event}
            </button>
          ))}
        </div>

        {/* Custom Event Types */}
        {(data.allowed_events || []).filter(e => !commonEvents.includes(e)).length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Custom Event Types</h4>
            <div className="flex flex-wrap gap-2">
              {(data.allowed_events || [])
                .filter(e => !commonEvents.includes(e))
                .map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 bg-teal-50 border border-teal-200 rounded-full"
                  >
                    <span className="text-sm text-teal-700">{event}</span>
                    <button
                      onClick={() => removeAllowedEvent(event)}
                      className="text-teal-600 hover:text-teal-700"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <input
            type="text"
            value={newAllowedEvent}
            onChange={(e) => setNewAllowedEvent(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomEvent()}
            placeholder="Add custom event type"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            onClick={addCustomEvent}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* House Rules */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          House Rules
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Specify any rules guests should follow when using your space
        </p>

        {(data.house_rules || []).length > 0 && (
          <div className="space-y-3 mb-4">
            {(data.house_rules || []).map((rule, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg group"
              >
                <span className="text-teal-600 mt-1">•</span>
                <span className="flex-1 text-gray-700">{rule}</span>
                <button
                  onClick={() => removeHouseRule(index)}
                  className="text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <input
            type="text"
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addHouseRule()}
            placeholder="e.g., No smoking indoors, Clean up after use"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            onClick={addHouseRule}
            className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            <FaPlus size={14} />
            <span>Add Rule</span>
          </button>
        </div>

        {/* Common Rules Examples */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">💡 Common house rules:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• No smoking inside the venue</li>
            <li>• Music must end by 11 PM</li>
            <li>• Maximum capacity must be respected</li>
            <li>• No outside catering without permission</li>
            <li>• Venue must be returned to original condition</li>
            <li>• Security deposit required</li>
          </ul>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Cancellation Policy
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Explain your cancellation and refund policy
        </p>

        <textarea
          value={data.cancellation_policy || ''}
          onChange={(e) => onChange({ cancellation_policy: e.target.value })}
          placeholder="e.g., Full refund if cancelled 30 days before event. 50% refund if cancelled 14 days before. No refund within 7 days of event."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />

        {/* Policy Examples */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">📋 Sample cancellation policies:</h4>
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <strong>Flexible:</strong> Full refund up to 24 hours before the event
            </div>
            <div>
              <strong>Moderate:</strong> Full refund if cancelled 7 days before, 50% refund within 3-7 days, no refund within 3 days
            </div>
            <div>
              <strong>Strict:</strong> 50% refund if cancelled 30 days before, 25% refund within 14-30 days, no refund within 14 days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesStep;
