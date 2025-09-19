import React from 'react';
import { 
  FaCalendarCheck, 
  FaCalendarTimes, 
  FaCalendarAlt,
  FaChartLine
} from 'react-icons/fa';

const AvailabilityStats = ({ availabilityData }) => {
  // Calculate statistics
  const calculateStats = () => {
    const dates = Object.keys(availabilityData);
    const totalDatesSet = dates.length;
    const availableDates = dates.filter(date => availabilityData[date] === true).length;
    const unavailableDates = dates.filter(date => availabilityData[date] === false).length;
    
    // Get current month data
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const currentMonthDates = dates.filter(dateStr => {
      const date = new Date(dateStr);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
    
    const currentMonthAvailable = currentMonthDates.filter(date => availabilityData[date] === true).length;
    const currentMonthUnavailable = currentMonthDates.filter(date => availabilityData[date] === false).length;
    
    return {
      totalDatesSet,
      availableDates,
      unavailableDates,
      currentMonthTotal: currentMonthDates.length,
      currentMonthAvailable,
      currentMonthUnavailable,
      availabilityRate: totalDatesSet > 0 ? Math.round((availableDates / totalDatesSet) * 100) : 0
    };
  };

  const stats = calculateStats();
  const currentMonthName = new Date().toLocaleDateString('en-US', { month: 'long' });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Available */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Available</p>
            <p className="text-2xl font-bold text-green-600">{stats.availableDates}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <FaCalendarCheck className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>

      {/* Total Unavailable */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Unavailable</p>
            <p className="text-2xl font-bold text-red-600">{stats.unavailableDates}</p>
          </div>
          <div className="p-3 bg-red-100 rounded-lg">
            <FaCalendarTimes className="w-5 h-5 text-red-600" />
          </div>
        </div>
      </div>

      {/* This Month */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{currentMonthName} Available</p>
            <p className="text-2xl font-bold text-blue-600">{stats.currentMonthAvailable}</p>
            <p className="text-xs text-gray-500">of {stats.currentMonthTotal} set</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <FaCalendarAlt className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Availability Rate */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Availability Rate</p>
            <p className="text-2xl font-bold text-purple-600">{stats.availabilityRate}%</p>
            <p className="text-xs text-gray-500">of dates set</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <FaChartLine className="w-5 h-5 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityStats;