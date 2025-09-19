import React from 'react';

const ListingCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      {/* Image Skeleton - Fixed Height */}
      <div className="h-48 bg-gray-200" />

      {/* Content Container - Fixed Height */}
      <div className="p-4 h-32 flex flex-col justify-between">
        {/* Title and Info Skeleton */}
        <div className="flex-1">
          {/* Title */}
          <div className="h-5 bg-gray-200 rounded mb-2" />
          
          {/* Location and Capacity */}
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-16" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-12" />
            </div>
          </div>
        </div>

        {/* Price and Button Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-24" />
          <div className="h-8 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
};

export default ListingCardSkeleton;