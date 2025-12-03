import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import ROLES from '../../../constants/roles';
import UserHeader from './UserHeader';
import VendorHeader from './VendorHeader';
import LandingHeader from './LandingHeader';

/**
 * SmartHeader - Displays the appropriate header based on user's role
 * - Customer/User role → UserHeader (with My Enquiries, Favourites, etc.)
 * - Vendor role → VendorHeader (with Venues, Team, Reports, etc.)
 * - Not logged in → LandingHeader (simple public header)
 */
const SmartHeader = () => {
  const { role, isAuthenticated } = useAuth();

  // Show appropriate header based on role
  if (isAuthenticated && role === ROLES.CUSTOMER) {
    return <UserHeader />;
  }

  if (isAuthenticated && role === ROLES.VENDOR) {
    return <VendorHeader />;
  }

  // Default to LandingHeader for non-authenticated users or other roles
  return <LandingHeader />;
};

export default SmartHeader;
