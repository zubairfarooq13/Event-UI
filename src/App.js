import React, { useState, useEffect } from 'react';
import LoginSignup from './components/auth/LoginSignup';
import HomeSearch from './components/home/HomeSearch';
import ListingDetail from './components/listing/ListingDetail';
import ListingsPage from './components/listing/ListingsPage';
import BookingFlow from './components/booking/BookingFlow';
import ProfilePage from './components/profile/ProfilePage';
import VendorDashboard from './components/vendor/VendorDashboard';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import Header from './components/common/Header';
import { authService, isAuthenticated, getUserRole, getUserData, clearAuthData } from './services';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'listings', 'detail', 'booking', 'profile', 'vendor', 'admin-login', 'admin-dashboard'
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [userType, setUserType] = useState('customer'); // 'customer', 'vendor', or 'admin'
  const [loading, setLoading] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if user is authenticated from localStorage
        const authenticated = isAuthenticated();
        
        if (authenticated) {
          const role = getUserRole();
          const userData = getUserData();
          
          if (role && userData) {
            setIsAuthenticatedState(true);
            setUser(userData);
            setUserType(role === 'customer' ? 'customer' : role);
            
            // Set appropriate view based on role
            if (role === 'admin') {
              setCurrentView('admin-dashboard');
            } else if (role === 'vendor') {
              setCurrentView('vendor');
            } else {
              setCurrentView('home');
            }
          } else {
            // Invalid auth data, clear it
            clearAuthData();
            setCurrentView('login');
          }
        } else {
          // Check for admin route
          const path = window.location.pathname || window.location.hash.replace('#', '');
          if (path === '/admin' || path.startsWith('/admin/') || path === 'admin') {
            setCurrentView('admin-login');
          } else {
            setCurrentView('login');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        clearAuthData();
        setCurrentView('login');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Handle navigation changes
  const navigateToAdmin = () => {
    setCurrentView('admin-login');
    window.history.pushState({}, '', '/admin');
  };

  // Handle successful login (all user types)
  const handleLogin = (userData) => {
    setIsAuthenticatedState(true);
    setUser(userData.user || userData);
    setUserType(userData.role || 'customer');
    
    // Redirect based on user role
    if (userData.role === 'admin') {
      setCurrentView('admin-dashboard');
    } else if (userData.role === 'vendor') {
      setCurrentView('vendor');
    } else {
      setCurrentView('home');
    }
  };

  // Handle logout (all user types)
  const handleLogout = async () => {
    try {
      // Call logout service
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state
      setIsAuthenticatedState(false);
      setUser(null);
      setUserType('customer');
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
  if (loading) {
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

  if (currentView === 'admin-dashboard' && userType === 'admin' && isAuthenticatedState) {
    return (
      <div className="App">
        <AdminDashboard onLogout={handleLogout} adminUser={user} />
      </div>
    );
  }

  // If not authenticated, show login page
  if (!isAuthenticatedState || currentView === 'login') {
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

export default App;