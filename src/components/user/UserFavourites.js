import React from 'react';
import UserHeader from './UserHeader';
import { FaHeart } from 'react-icons/fa';

const UserFavourites = () => {
  // Sample data - replace with API call
  const favourites = [];

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            My Favourites
          </h1>

          {favourites.length === 0 ? (
            <div className="text-center py-16">
              <FaHeart className="mx-auto text-gray-300 mb-4" size={64} />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No favourites yet
              </h2>
              <p className="text-gray-500">
                Start exploring venues and save your favorites here
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Favourite venue cards will go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFavourites;
