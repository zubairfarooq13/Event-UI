import React, { useState } from 'react';
import LoginSignup from './components/auth/LoginSignup';
import HomeSearch from './components/home/HomeSearch';
import ListingDetail from './components/listing/ListingDetail';
import ListingsPage from './components/listing/ListingsPage';
import BookingFlow from './components/booking/BookingFlow';
import ProfilePage from './components/profile/ProfilePage';
import VendorDashboard from './components/vendor/VendorDashboard';
import Header from './components/common/Header';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'listings', 'detail', 'booking', 'profile', or 'vendor'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [userType, setUserType] = useState('customer'); // 'customer' or 'vendor'

  // Handle successful login
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    // Check if user is vendor or customer (dummy logic for demo)
    const isVendor = userData.phone && userData.phone.startsWith('03'); // Simple demo logic
    setUserType(isVendor ? 'vendor' : 'customer');
    setCurrentView(isVendor ? 'vendor' : 'home'); // Redirect based on user type
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setUserType('customer');
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

  // If user is vendor, show vendor dashboard
  if (userType === 'vendor' && currentView === 'vendor') {
    return (
      <div className="App">
        <VendorDashboard onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header - show for all authenticated customer views */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onLogout={handleLogout}
        userType={userType}
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