import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  loading = false, 
  disabled = false, 
  fullWidth = false,
  className = '',
  icon: Icon,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 disabled:bg-primary-400',
    secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary-500 disabled:bg-gray-100',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 disabled:border-primary-300',
    ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500 disabled:text-primary-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400',
  };

  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = (disabled || loading) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';

  const combinedClassName = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${widthClass}
    ${disabledClass}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      className={combinedClassName}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin mr-2" />
          Loading...
        </>
      ) : (
        <>
          {Icon && <Icon className="mr-2" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;