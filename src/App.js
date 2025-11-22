import { UserProvider, useUser } from './contexts/AuthContext';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import LoginLanding from './components/auth/LoginLanding';
import ClientLogin from './components/auth/ClientLogin';
import VendorLogin from './components/auth/VendorLogin';
import ListYourVenue from './components/landing/ListYourVenue';
import Signup from './components/auth/Signup';
import ProfilePage from './components/profile/ProfilePage';
import ListingsPage from './components/listing/ListingsPage';
import ListingDetail from './components/listing/ListingDetail';
import AddSpaceWizard from './components/vendor/AddSpace/AddSpaceWizard';
import VendorDashboard from './components/vendor/VendorDashboard';
import VendorSpacesList from './components/vendor/VendorSpacesList';
import VendorSettings from './components/vendor/Settings/VendorSettings';
import VendorAccount from './components/vendor/Account/VendorAccount';
import VendorHelpCenter from './components/vendor/Help/VendorHelpCenter';
import UserEnquiries from './components/user/UserEnquiries';
import UserFavourites from './components/user/UserFavourites';
import { AuthContext, AuthProvider } from './contexts/AuthContext';  

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginLanding />} />
            <Route path="/login/user" element={<ClientLogin />} />
            <Route path="/login/vendor" element={<VendorLogin />} />
            <Route path="/list-your-venue" element={<ListYourVenue />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/signup/user" element={<Signup />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/venues" element={<ListingsPage />} />
            <Route path="/venues/:id" element={<ListingDetail />} />
            
            {/* User Routes */}
            <Route path="/user/enquiries" element={<UserEnquiries />} />
            <Route path="/user/favourites" element={<UserFavourites />} />
            
            {/* Vendor Routes */}
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/spaces" element={<VendorSpacesList />} />
            <Route path="/vendor/add-space" element={<AddSpaceWizard />} />
            <Route path="/vendor/edit-space/:spaceId" element={<AddSpaceWizard />} />
            <Route path="/vendor/settings" element={<VendorSettings />} />
            <Route path="/vendor/account" element={<VendorAccount />} />
            <Route path="/vendor/help" element={<VendorHelpCenter />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;