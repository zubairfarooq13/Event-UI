import React, { useState, useEffect } from 'react';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaCalendarCheck, 
  FaCalendarTimes,
  FaSave,
  FaUndo
} from 'react-icons/fa';
import AvailabilityStats from './AvailabilityStats';
import AvailabilityGuide from './AvailabilityGuide';

const AvailabilityCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availabilityData, setAvailabilityData] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize with some mock data
  useEffect(() => {
    const mockData = {
      '2025-09-20': true,  // available
      '2025-09-21': false, // unavailable
      '2025-09-22': true,
      '2025-09-25': false,
      '2025-09-28': true,
      '2025-09-30': false,
      '2025-10-01': true,
      '2025-10-05': false,
      '2025-10-10': true,
      '2025-10-15': false,
      '2025-10-20': true,
      '2025-10-25': false,
    };
    setAvailabilityData(mockData);
  }, []);

  // Get calendar dates for current month
  const getCalendarDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // First day of the calendar (might be from previous month)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // Generate all calendar dates
    const dates = [];
    const currentCalendarDate = new Date(startDate);
    
    // Generate 6 weeks (42 days) to ensure full calendar
    for (let i = 0; i < 42; i++) {
      dates.push(new Date(currentCalendarDate));
      currentCalendarDate.setDate(currentCalendarDate.getDate() + 1);
    }
    
    return dates;
  };

  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Check if date is in current month
  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth() && 
           date.getFullYear() === currentDate.getFullYear();
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if date is in the past
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Get availability status for a date
  const getAvailabilityStatus = (date) => {
    const dateStr = formatDate(date);
    return availabilityData[dateStr];
  };

  // Toggle availability for a date
  const toggleAvailability = (date) => {
    if (isPastDate(date)) return; // Can't change past dates
    
    const dateStr = formatDate(date);
    const currentStatus = availabilityData[dateStr];
    
    setAvailabilityData(prev => ({
      ...prev,
      [dateStr]: currentStatus === undefined ? false : !currentStatus
    }));
    
    setHasUnsavedChanges(true);
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Save changes
  const saveChanges = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setHasUnsavedChanges(false);
      alert('Availability updated successfully!');
    } catch (error) {
      console.error('Error saving availability:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Reset changes
  const resetChanges = () => {
    // In a real app, you'd reload from the server
    // For now, we'll just clear unsaved changes flag
    setHasUnsavedChanges(false);
    alert('Changes have been reset');
  };

  const calendarDates = getCalendarDates();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <AvailabilityStats availabilityData={availabilityData} />

      {/* Calendar Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Month Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Previous Month"
            >
              <FaChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-900 min-w-48 text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Next Month"
            >
              <FaChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToToday}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Today
            </button>
            
            {hasUnsavedChanges && (
              <>
                <button
                  onClick={resetChanges}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <FaUndo className="w-3 h-3" />
                  Reset
                </button>
                
                <button
                  onClick={saveChanges}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="w-3 h-3" />
                      Save Changes
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Unavailable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <span className="text-sm text-gray-600">Not Set</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
            <span className="text-sm text-gray-600">Past Date</span>
          </div>
        </div>
      </div>

      {/* Desktop Calendar */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {dayNames.map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-700 bg-gray-50">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {calendarDates.map((date, index) => {
            const dateStr = formatDate(date);
            const isAvailable = getAvailabilityStatus(date);
            const isCurrentMonthDate = isCurrentMonth(date);
            const isTodayDate = isToday(date);
            const isPast = isPastDate(date);

            return (
              <button
                key={index}
                onClick={() => toggleAvailability(date)}
                disabled={isPast}
                className={`
                  aspect-square p-2 border-r border-b border-gray-200 text-sm transition-colors
                  hover:bg-gray-50 disabled:cursor-not-allowed relative
                  ${!isCurrentMonthDate ? 'text-gray-400 bg-gray-50' : ''}
                  ${isTodayDate ? 'ring-2 ring-blue-500 ring-inset' : ''}
                  ${isPast ? 'bg-gray-100 text-gray-400' : ''}
                  ${isAvailable === true && isCurrentMonthDate && !isPast ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                  ${isAvailable === false && isCurrentMonthDate && !isPast ? 'bg-red-100 text-red-800 hover:bg-red-200' : ''}
                `}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className={`font-medium ${isTodayDate ? 'font-bold' : ''}`}>
                    {date.getDate()}
                  </span>
                  
                  {/* Status Indicator */}
                  {isCurrentMonthDate && !isPast && (
                    <div className="mt-1">
                      {isAvailable === true && (
                        <FaCalendarCheck className="w-3 h-3 text-green-600" />
                      )}
                      {isAvailable === false && (
                        <FaCalendarTimes className="w-3 h-3 text-red-600" />
                      )}
                    </div>
                  )}
                </div>
                
                {/* Today indicator */}
                {isTodayDate && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Calendar */}
      <div className="md:hidden bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="max-h-96 overflow-y-auto">
          <div className="space-y-2 p-4">
            {calendarDates
              .filter(date => isCurrentMonth(date))
              .map((date, index) => {
                const dateStr = formatDate(date);
                const isAvailable = getAvailabilityStatus(date);
                const isTodayDate = isToday(date);
                const isPast = isPastDate(date);

                return (
                  <button
                    key={index}
                    onClick={() => toggleAvailability(date)}
                    disabled={isPast}
                    className={`
                      w-full p-4 rounded-lg border-2 transition-colors text-left
                      ${isPast ? 'border-gray-200 bg-gray-50 cursor-not-allowed' : 'border-gray-200 hover:border-gray-300'}
                      ${isTodayDate ? 'ring-2 ring-blue-500' : ''}
                      ${isAvailable === true && !isPast ? 'border-green-500 bg-green-50' : ''}
                      ${isAvailable === false && !isPast ? 'border-red-500 bg-red-50' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-medium ${isPast ? 'text-gray-400' : 'text-gray-900'}`}>
                          {date.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        {isTodayDate && (
                          <div className="text-xs text-blue-600 font-medium">Today</div>
                        )}
                      </div>
                      
                      <div className="flex items-center">
                        {!isPast && (
                          <>
                            {isAvailable === true && (
                              <div className="flex items-center gap-2 text-green-600">
                                <FaCalendarCheck className="w-4 h-4" />
                                <span className="text-sm font-medium">Available</span>
                              </div>
                            )}
                            {isAvailable === false && (
                              <div className="flex items-center gap-2 text-red-600">
                                <FaCalendarTimes className="w-4 h-4" />
                                <span className="text-sm font-medium">Unavailable</span>
                              </div>
                            )}
                            {isAvailable === undefined && (
                              <div className="text-gray-400 text-sm">Not Set</div>
                            )}
                          </>
                        )}
                        {isPast && (
                          <div className="text-gray-400 text-sm">Past</div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-yellow-800 text-sm font-medium">
              You have unsaved changes. Don't forget to save your availability updates.
            </span>
          </div>
        </div>
      )}

      {/* Help Guide */}
      <AvailabilityGuide />
    </div>
  );
};

export default AvailabilityCalendar;