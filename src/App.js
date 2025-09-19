import React, { useState } from 'react';
import LoginSignup from './components/auth/LoginSignup';
import HomeSearch from './components/home/HomeSearch';
import ListingDetail from './components/listing/ListingDetail';
import ListingsPage from './components/listing/ListingsPage';
import BookingFlow from './components/booking/BookingFlow';
import ProfilePage from './components/profile/ProfilePage';
import Header from './components/common/Header';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'listings', 'detail', 'booking', or 'profile'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedListingId, setSelectedListingId] = useState(null);

  // Handle successful login
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentView('home'); // Redirect to home after login
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentView('login');
  };

  // Handle view details navigation
  const handleViewDetails = (listingId) => {
    setSelectedListingId(listingId);
    setCurrentView('detail');
  };

  // Handle search from home page
  const handleSearchResults = (filters) => {
    setCurrentView('listings');
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return (
      <div className="App">
        <LoginSignup onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header - show for all authenticated views */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area - add top padding to account for fixed header */}
      <div className="main-content-area pt-16">
        {/* Render Current View */}
        {currentView === 'home' && <HomeSearch onSearch={handleSearchResults} />}
        {currentView === 'listings' && <ListingsPage onViewDetails={handleViewDetails} />}
        {currentView === 'detail' && (
          <ListingDetail 
            listingId={selectedListingId}
            onBookingRequest={() => setCurrentView('booking')} 
            onBack={() => setCurrentView('listings')}
          />
        )}
        {currentView === 'booking' && <BookingFlow onBack={() => setCurrentView('detail')} />}
        {currentView === 'profile' && <ProfilePage />}
      </div>
    </div>
  );
}

export default App;