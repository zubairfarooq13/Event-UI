import React, { useState, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Calendar = ({ 
  selectedDate, 
  onDateSelect, 
  minDate = new Date(),
  maxDate = null,
  disabledDates = [],
  className = ''
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1) 
    : new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysCount = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysCount; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [currentMonth]);

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const isDateDisabled = (date) => {
    if (!date) return false;
    
    // Check if date is before minDate
    if (minDate && date < minDate) return true;
    
    // Check if date is after maxDate
    if (maxDate && date > maxDate) return true;
    
    // Check if date is in disabled dates array
    if (disabledDates.some(disabledDate => 
      date.toDateString() === disabledDate.toDateString()
    )) return true;

    return false;
  };

  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleDateClick = (date) => {
    if (!date || isDateDisabled(date)) return;
    onDateSelect(date);
  };

  const canNavigatePrev = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(currentMonth.getMonth() - 1);
    const lastDayOfPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0);
    return !minDate || lastDayOfPrevMonth >= minDate;
  };

  const canNavigateNext = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    const firstDayOfNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
    return !maxDate || firstDayOfNextMonth <= maxDate;
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          disabled={!canNavigatePrev()}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>
        
        <h2 className="text-lg font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        
        <button
          onClick={() => navigateMonth(1)}
          disabled={!canNavigateNext()}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((date, index) => {
          if (!date) {
            return <div key={index} className="h-10" />;
          }

          const isDisabled = isDateDisabled(date);
          const isSelected = isDateSelected(date);
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={isDisabled}
              className={`
                h-10 w-full rounded-lg text-sm font-medium transition-colors duration-200
                ${isSelected 
                  ? 'bg-primary-600 text-white' 
                  : isToday
                  ? 'bg-primary-50 text-primary-600 border border-primary-200'
                  : 'text-gray-700 hover:bg-gray-100'
                }
                ${isDisabled 
                  ? 'text-gray-300 cursor-not-allowed hover:bg-transparent' 
                  : 'cursor-pointer'
                }
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-primary-600 rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-primary-50 border border-primary-200 rounded"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-200 rounded"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;