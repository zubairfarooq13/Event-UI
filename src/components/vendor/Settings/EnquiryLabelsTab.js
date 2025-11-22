import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTag } from 'react-icons/fa';

const EnquiryLabelsTab = () => {
  const [labels, setLabels] = useState([
    { id: 1, name: 'Hot Lead', color: '#EF4444' },
    { id: 2, name: 'Follow Up', color: '#F59E0B' },
    { id: 3, name: 'Quote Sent', color: '#3B82F6' },
    { id: 4, name: 'Confirmed', color: '#10B981' }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState({ name: '', color: '#3B82F6' });

  const handleAddLabel = () => {
    if (newLabel.name.trim()) {
      setLabels([...labels, { ...newLabel, id: Date.now() }]);
      setNewLabel({ name: '', color: '#3B82F6' });
      setIsAdding(false);
    }
  };

  const handleDeleteLabel = (id) => {
    if (window.confirm('Are you sure you want to delete this label?')) {
      setLabels(labels.filter(label => label.id !== id));
    }
  };

  const colors = [
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', 
    '#8B5CF6', '#EC4899', '#6B7280', '#14B8A6'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Enquiry labels</h1>
        <p className="text-gray-600 mt-1">
          Create custom labels to organize and categorize your enquiries.
        </p>
      </div>

      {/* Add Label Button */}
      <div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
        >
          <FaPlus size={14} />
          Add Label
        </button>
      </div>

      {/* Labels List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {/* Add New Label Form */}
          {isAdding && (
            <div className="p-4 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={newLabel.name}
                    onChange={(e) => setNewLabel({ ...newLabel, name: e.target.value })}
                    placeholder="Label name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewLabel({ ...newLabel, color })}
                      className={`w-8 h-8 rounded-full border-2 ${
                        newLabel.color === color ? 'border-gray-900' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddLabel}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setNewLabel({ name: '', color: '#3B82F6' });
                    }}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Existing Labels */}
          {labels.map((label) => (
            <div key={label.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: label.color }}
                  />
                  <span className="text-sm font-medium text-gray-900">{label.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaEdit className="text-gray-400" size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteLabel(label.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTrash className="text-red-400" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {labels.length === 0 && !isAdding && (
            <div className="p-12 text-center">
              <FaTag className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500">No labels created yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Click "Add Label" to create your first label
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryLabelsTab;
