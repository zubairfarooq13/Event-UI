import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'default', 
  shadow = 'default',
  rounded = 'default',
  hover = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'bg-white border border-gray-100';
  
  const paddings = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8',
  };

  const shadows = {
    none: '',
    small: 'shadow-sm',
    default: 'shadow-soft',
    large: 'shadow-lg',
  };

  const roundings = {
    none: '',
    small: 'rounded-lg',
    default: 'rounded-2xl',
    large: 'rounded-3xl',
  };

  const hoverClass = hover ? 'hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer' : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';

  const combinedClassName = `
    ${baseClasses}
    ${paddings[padding]}
    ${shadows[shadow]}
    ${roundings[rounded]}
    ${hoverClass}
    ${clickableClass}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div 
      className={combinedClassName} 
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;