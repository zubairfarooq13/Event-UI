import React, { useState, useEffect } from 'react';
import AuthContainer from './components/auth/AuthContainer';
import HomeSearch from './components/home/HomeSearch';
import ListingDetail from './components/listing/ListingDetail';
import ListingsPage from './components/listing/ListingsPage';
import BookingFlow from './components/booking/BookingFlow';
import ProfilePage from './components/profile/ProfilePage';
import VendorDashboard from './components/vendor/VendorDashboard';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import Header from './components/common/Header';
import { UserProvider, useUser } from './contexts/UserContext';
import { authService } from './services';
import './App.css';

// Inner App component that uses UserContext
function InnerApp() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'listings', 'detail', 'booking', 'profile', 'vendor', 'admin-login', 'admin-dashboard'
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Debug: Log view changes
  useEffect(() => {
    console.log('Current view changed to:', currentView);
  }, [currentView]);
  
  // Use UserContext instead of local state
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    login, 
    logout, 
    isCustomer, 
    isVendor, 
    isAdmin 
  } = useUser();

  // Initial view setup on app load
  useEffect(() => {
    if (!isLoading && !hasInitialized) {
      console.log('Initializing app view. isAuthenticated:', isAuthenticated);
      
      if (isAuthenticated) {
        // Set appropriate view based on role
        if (isAdmin()) {
          console.log('Setting view to admin-dashboard');
          setCurrentView('admin-dashboard');
        } else if (isVendor()) {
          console.log('Setting view to vendor');
          setCurrentView('vendor');
        } else {
          console.log('Setting view to home');
          setCurrentView('home');
        }
      } else {
        // Check for admin route
        const path = window.location.pathname || window.location.hash.replace('#', '');
        if (path === '/admin' || path.startsWith('/admin/') || path === 'admin') {
          console.log('Setting view to admin-login');
          setCurrentView('admin-login');
        } else {
          console.log('Setting view to login');
          setCurrentView('login');
        }
      }
      setHasInitialized(true);
    }
  }, [isLoading, hasInitialized]); // Only depend on loading and initialization

  // Handle logout (redirect to login when user logs out)
  useEffect(() => {
    if (hasInitialized && !isAuthenticated && currentView !== 'login' && currentView !== 'admin-login') {
      console.log('User logged out, redirecting to login');
      setCurrentView('login');
    }
  }, [isAuthenticated, hasInitialized, currentView]);

  // Handle navigation changes
  const navigateToAdmin = () => {
    setCurrentView('admin-login');
    window.history.pushState({}, '', '/admin');
  };

  // Handle successful login (all user types)
  const handleLogin = async (userData) => {
    try {
      console.log('handleLogin received userData:', userData);
      
      // Validate userData structure
      if (!userData || !userData.token || !userData.user) {
        throw new Error('Invalid user data received from authentication');
      }
      
      // Use the context login method
      await login(userData.token, userData.refreshToken, userData.user);
      
      // Manually set the appropriate view based on user role after login
      const userRole = userData.user.role;
      console.log('Setting post-login view for role:', userRole);
      
      if (userRole === 'admin') {
        setCurrentView('admin-dashboard');
      } else if (userRole === 'vendor') {
        setCurrentView('vendor');
      } else {
        setCurrentView('home');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      // You might want to show an error message to the user here
    }
  };

  // Handle logout (all user types)
  const handleLogout = async () => {
    try {
      // Use the context logout method
      await logout();
      setCurrentView('login');
    } catch (error) {
      console.error('Logout error:', error);
      setCurrentView('login');
    }
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

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="App flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle admin routes
  if (currentView === 'admin-login') {
    return (
      <div className="App">
        <AdminLogin onLogin={handleLogin} />
      </div>
    );
  }

  if (currentView === 'admin-dashboard' && isAdmin() && isAuthenticated) {
    return (
      <div className="App">
        <AdminDashboard onLogout={handleLogout} adminUser={user} />
      </div>
    );
  }

  // If not authenticated, show login page
  if (!isAuthenticated || currentView === 'login') {
    return (
      <div className="App">
        <AuthContainer onLogin={handleLogin} />
      </div>
    );
  }

  // If user is vendor, show vendor dashboard
  if (isVendor() && currentView === 'vendor') {
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
        userType={user?.role || 'customer'}
        onAdminAccess={navigateToAdmin}
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

// Main App component wrapped with UserProvider
function App() {
  return (
    <UserProvider>
      <InnerApp />
    </UserProvider>
  );
}

export default App;