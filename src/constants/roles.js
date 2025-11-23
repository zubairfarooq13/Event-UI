// Role constants for the application
export const ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  ADMIN: 'admin',
};

// Route to role mapping
export const ROUTE_ROLES = {
  // Public routes - no authentication required
  PUBLIC: ['/login', '/register', '/signup/user', '/login/user', '/login/vendor', '/venues', '/list-your-venue'],
  
  // Customer/User routes
  CUSTOMER: ['/user/enquiries', '/user/favourites', '/user/account'],
  
  // Vendor routes
  VENDOR: [
    '/vendor/dashboard',
    '/vendor/spaces',
    '/vendor/add-space',
    '/vendor/edit-space',
    '/vendor/settings',
    '/vendor/account',
    '/vendor/help',
  ],
  
  // Admin routes
  ADMIN: [
    '/admin/dashboard',
    '/admin/vendor-approvals',
    '/admin/manage-listings',
    '/admin/bookings',
    '/admin/analytics',
  ],
  
  // Routes accessible by any authenticated user
  ANY_AUTHENTICATED: ['/profile'],
};

// Permission-based access control (future expansion)
export const PERMISSIONS = {
  // Customer permissions
  VIEW_ENQUIRIES: [ROLES.CUSTOMER],
  MANAGE_FAVOURITES: [ROLES.CUSTOMER],
  
  // Vendor permissions
  MANAGE_SPACES: [ROLES.VENDOR],
  VIEW_VENDOR_DASHBOARD: [ROLES.VENDOR],
  VIEW_VENDOR_ENQUIRIES: [ROLES.VENDOR],
  UPDATE_VENDOR_SETTINGS: [ROLES.VENDOR],
  
  // Admin permissions
  APPROVE_VENDORS: [ROLES.ADMIN],
  MANAGE_ALL_LISTINGS: [ROLES.ADMIN],
  VIEW_ANALYTICS: [ROLES.ADMIN],
  MANAGE_USERS: [ROLES.ADMIN],
  VIEW_ALL_BOOKINGS: [ROLES.ADMIN],
};

// Helper function to check if a role has access to a route
export const canAccessRoute = (userRole, route) => {
  // Check if route is public
  if (ROUTE_ROLES.PUBLIC.some(publicRoute => route.startsWith(publicRoute))) {
    return true;
  }
  
  // Check if route requires authentication
  if (ROUTE_ROLES.ANY_AUTHENTICATED.some(authRoute => route.startsWith(authRoute))) {
    return !!userRole; // Any authenticated user can access
  }
  
  // Check role-specific routes
  if (userRole === ROLES.CUSTOMER) {
    return ROUTE_ROLES.CUSTOMER.some(customerRoute => route.startsWith(customerRoute));
  }
  
  if (userRole === ROLES.VENDOR) {
    return ROUTE_ROLES.VENDOR.some(vendorRoute => route.startsWith(vendorRoute));
  }
  
  if (userRole === ROLES.ADMIN) {
    return ROUTE_ROLES.ADMIN.some(adminRoute => route.startsWith(adminRoute));
  }
  
  return false;
};

// Get default redirect path based on role
export const getDefaultRedirectPath = (role) => {
  switch (role) {
    case ROLES.CUSTOMER:
      return '/user/enquiries';
    case ROLES.VENDOR:
      return '/vendor/dashboard';
    case ROLES.ADMIN:
      return '/admin/dashboard';
    default:
      return '/';
  }
};

// Check if user has specific permission
export const hasPermission = (userRole, permission) => {
  const allowedRoles = PERMISSIONS[permission];
  return allowedRoles && allowedRoles.includes(userRole);
};

export default ROLES;
