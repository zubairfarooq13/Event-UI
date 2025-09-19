import React from 'react';
import { FaEdit, FaTrash, FaDollarSign } from 'react-icons/fa';

const PackageCard = ({ 
  package: pkg, 
  onEdit, 
  onDelete,
  isDeleting = false 
}) => {
  const handleEdit = () => {
    onEdit(pkg);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${pkg.title}"?`)) {
      onDelete(pkg.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Package Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
          {pkg.title}
        </h3>
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={handleEdit}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="Edit Package"
          >
            <FaEdit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
            title="Delete Package"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Package Description */}
      <div className="mb-4">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {pkg.description}
        </p>
      </div>

      {/* Package Price */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaDollarSign className="w-4 h-4 text-green-600" />
          <span className="text-2xl font-bold text-green-600">
            ${pkg.price.toLocaleString()}
          </span>
        </div>
        
        {/* Package Status or Additional Info */}
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {pkg.isActive ? 'Active' : 'Inactive'}
        </div>
      </div>

      {/* Package Features/Includes (if available) */}
      {pkg.features && pkg.features.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-700 mb-2">Includes:</p>
          <div className="flex flex-wrap gap-1">
            {pkg.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
            {pkg.features.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{pkg.features.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Loading State Overlay */}
      {isDeleting && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <span className="text-sm">Deleting...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageCard;