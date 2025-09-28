import React from 'react';
import { 
  FaUtensils, 
  FaBirthdayCake, 
  FaTree, 
  FaBuilding
} from 'react-icons/fa';

const categories = [
  {
    id: 'restaurants',
    name: 'Restaurants',
    icon: FaUtensils,
    color: 'from-orange-400 to-red-500',
    count: '1,200+',
  },
  {
    id: 'birthday',
    name: 'Birthday Packages',
    icon: FaBirthdayCake,
    color: 'from-pink-400 to-purple-500',
    count: '350+',
  },
  {
    id: 'farmhouses',
    name: 'Farmhouses',
    icon: FaTree,
    color: 'from-green-400 to-emerald-500',
    count: '180+',
  },
  {
    id: 'marquees',
    name: 'Marquees',
    icon: FaBuilding,
    color: 'from-blue-400 to-indigo-500',
    count: '95+',
  },
];

const CategoryBrowser = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our wide selection of venue types to find the perfect match for your event
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  selectedCategory === category.id 
                    ? 'ring-4 ring-primary-500 ring-opacity-50 scale-105' 
                    : ''
                }`}
              >
                <div className={`bg-gradient-to-br ${category.color} p-6 text-white h-32 sm:h-40`}>
                  <div className="flex flex-col justify-between h-full">
                    <IconComponent className="h-8 w-8 sm:h-10 sm:w-10" />
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base mb-1">{category.name}</h3>
                      <p className="text-xs sm:text-sm opacity-90">{category.count} venues</p>
                    </div>
                  </div>
                </div>
                
                {/* Selection indicator */}
                {selectedCategory === category.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryBrowser;