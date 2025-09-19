import React, { useState } from 'react';
import LoginSignup from './components/auth/LoginSignup';
import HomeSearch from './components/home/HomeSearch';
import ListingDetail from './components/listing/ListingDetail';
import BookingFlow from './components/booking/BookingFlow';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'login', 'detail', or 'booking'

  return (
    <div className="App">
      {/* Simple Navigation - only show if not in booking flow */}
      {currentView !== 'booking' && (
        <div className="fixed top-4 right-4 z-50 flex flex-wrap gap-2">
          <button
            onClick={() => setCurrentView('home')}
            className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
              currentView === 'home'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-primary-600 hover:bg-primary-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentView('detail')}
            className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
              currentView === 'detail'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-primary-600 hover:bg-primary-50'
            }`}
          >
            Detail
          </button>
          <button
            onClick={() => setCurrentView('booking')}
            className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
              currentView === 'booking'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-primary-600 hover:bg-primary-50'
            }`}
          >
            Booking
          </button>
          <button
            onClick={() => setCurrentView('login')}
            className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
              currentView === 'login'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-primary-600 hover:bg-primary-50'
            }`}
          >
            Login
          </button>
        </div>
      )}

      {/* Render Current View */}
      {currentView === 'home' && <HomeSearch />}
      {currentView === 'detail' && <ListingDetail onBookingRequest={() => setCurrentView('booking')} />}
      {currentView === 'booking' && <BookingFlow onBack={() => setCurrentView('detail')} />}
      {currentView === 'login' && <LoginSignup />}
    </div>
  );
}

export default App;