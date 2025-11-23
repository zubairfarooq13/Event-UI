import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import LoginLanding from './components/auth/LoginLanding';
import UserLogin from './components/auth/UserLogin';
import VendorLogin from './components/auth/VendorLogin';
import ListYourVenue from './components/landing/ListYourVenue';
import UserSignup from './components/auth/UserSignup';
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
import UserAccount from './components/user/UserAccount';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminAnalytics from './components/admin/AdminAnalytics';
import VendorApprovals from './components/admin/VendorApprovals';
import ManageListings from './components/admin/ManageListings';
import BookingsManagement from './components/admin/BookingsManagement';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleBasedRoute from './components/auth/RoleBasedRoute';
import Unauthorized from './components/common/Unauthorized';
import NotFound from './components/common/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import ROLES from './constants/roles';  

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginLanding />} />
            <Route path="/login/user" element={<UserLogin />} />
            <Route path="/login/vendor" element={<VendorLogin />} />
            <Route path="/list-your-venue" element={<ListYourVenue />} />
            <Route path="/register" element={<UserSignup />} />
            <Route path="/signup/user" element={<UserSignup />} />
            <Route path="/venues" element={<ListingsPage />} />
            <Route path="/venues/:id" element={<ListingDetail />} />
            
            {/* Any Authenticated User Routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* User/Customer Routes - Role: customer */}
            <Route 
              path="/user/enquiries" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.CUSTOMER]}>
                  <UserEnquiries />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/user/favourites" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.CUSTOMER]}>
                  <UserFavourites />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/user/account" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.CUSTOMER]}>
                  <UserAccount />
                </RoleBasedRoute>
              } 
            />
            
            {/* Vendor Routes - Role: vendor */}
            <Route 
              path="/vendor/dashboard" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.VENDOR]}>
                  <VendorDashboard />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/vendor/spaces" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.VENDOR]}>
                  <VendorSpacesList />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/vendor/add-space" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.VENDOR]}>
                  <AddSpaceWizard />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/vendor/edit-space/:spaceId" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.VENDOR]}>
                  <AddSpaceWizard />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/vendor/settings" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.VENDOR]}>
                  <VendorSettings />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/vendor/account" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.VENDOR]}>
                  <VendorAccount />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/vendor/help" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.VENDOR]}>
                  <VendorHelpCenter />
                </RoleBasedRoute>
              } 
            />
            
            {/* Admin Routes - Role: admin */}
            <Route 
              path="/admin/dashboard" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
                  <AdminDashboard />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/admin/analytics" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
                  <AdminAnalytics />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/admin/vendor-approvals" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
                  <VendorApprovals />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/admin/manage-listings" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
                  <ManageListings />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/admin/bookings" 
              element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
                  <BookingsManagement />
                </RoleBasedRoute>
              } 
            />
            
            {/* Error Routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;