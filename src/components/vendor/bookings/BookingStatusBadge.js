import React from 'react';
import { FaCheck, FaTimes, FaClock } from 'react-icons/fa';

const BookingStatusBadge = ({ status, size = 'default' }) => {
  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200',
          icon: FaCheck,
          iconColor: 'text-green-600',
          label: 'Confirmed'
        };
      case 'pending':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-200',
          icon: FaClock,
          iconColor: 'text-yellow-600',
          label: 'Pending'
        };
      case 'rejected':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-200',
          icon: FaTimes,
          iconColor: 'text-red-600',
          label: 'Rejected'
        };
      case 'cancelled':
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200',
          icon: FaTimes,
          iconColor: 'text-gray-600',
          label: 'Cancelled'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200',
          icon: FaClock,
          iconColor: 'text-gray-600',
          label: 'Unknown'
        };
    }
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case 'small':
        return {
          container: 'px-2 py-1 text-xs',
          icon: 'w-2 h-2'
        };
      case 'large':
        return {
          container: 'px-4 py-2 text-sm',
          icon: 'w-4 h-4'
        };
      default:
        return {
          container: 'px-3 py-1 text-xs',
          icon: 'w-3 h-3'
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = getSizeClasses(size);
  const Icon = config.icon;

  return (
    <div className={`
      inline-flex items-center gap-1.5 rounded-full font-medium border
      ${config.bgColor} ${config.textColor} ${config.borderColor}
      ${sizeClasses.container}
    `}>
      <Icon className={`${config.iconColor} ${sizeClasses.icon} flex-shrink-0`} />
      <span className="capitalize">{config.label}</span>
    </div>
  );
};

export default BookingStatusBadge;