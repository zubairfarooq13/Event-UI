import React, { useState } from 'react';
import { 
  FaQuestionCircle, 
  FaTimes, 
  FaMousePointer,
  FaMobile,
  FaDesktop,
  FaSave
} from 'react-icons/fa';

const AvailabilityGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="Help & Guide"
      >
        <FaQuestionCircle className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">How to Use Availability Calendar</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Desktop Instructions */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <FaDesktop className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Desktop Calendar</h4>
              <p className="text-sm text-gray-600 mt-1">
                Click on any date in the monthly grid to toggle between available (green) and unavailable (red).
              </p>
            </div>
          </div>

          {/* Mobile Instructions */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <FaMobile className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Mobile View</h4>
              <p className="text-sm text-gray-600 mt-1">
                Scroll through dates and tap on each date card to set availability.
              </p>
            </div>
          </div>

          {/* Color Legend */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Color Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Available for booking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-600">Not available</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span className="text-sm text-gray-600">Not set yet</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                <span className="text-sm text-gray-600">Past dates (cannot change)</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Tips</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• You cannot change availability for past dates</li>
              <li>• Today's date is highlighted with a blue border</li>
              <li>• Remember to save your changes</li>
              <li>• Use the "Today" button to quickly navigate to current date</li>
            </ul>
          </div>

          {/* Save Reminder */}
          <div className="flex items-start gap-3 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <FaSave className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Don't Forget to Save!</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Your changes won't be permanent until you click the "Save Changes" button.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityGuide;