# User Context Integration

## Overview
This document outlines the implementation of the UserContext system that provides application-wide user state management while keeping only authentication tokens in localStorage for security.

## Architecture

### UserContext System
- **Location**: `src/contexts/UserContext.js`
- **Purpose**: Manages user authentication state in application memory
- **Security**: User data stored in React Context (memory), only tokens in localStorage

### Key Components

#### 1. UserContext (`src/contexts/UserContext.js`)
- **UserProvider**: React Context Provider component
- **useUser**: Custom hook for accessing user state
- **Functions**: login, logout, user data access, role checking

#### 2. Updated App.js
- **Wrapper**: Application wrapped with UserProvider
- **State Management**: Uses useUser hook instead of local state
- **Auto-redirect**: Based on user role (customer/vendor/admin)

#### 3. Auth Service Integration
- **Backend Response**: Handles access_token/refresh_token structure
- **Token Management**: Only stores tokens in localStorage
- **User Data**: Returns user object for context storage

## Features Implemented

### Authentication State Management
```javascript
const { 
  user,           // Current user object
  isAuthenticated, // Authentication status
  isLoading,      // Loading state
  login,          // Login function
  logout,         // Logout function
  isCustomer,     // Role check functions
  isVendor,
  isAdmin
} = useUser();
```

### Role-Based Access Control
- **isCustomer()**: Check if user is a customer
- **isVendor()**: Check if user is a vendor  
- **isAdmin()**: Check if user is an admin
- **Auto-redirect**: Based on user role after login

### User Data Access
```javascript
const userId = getUserId();       // Get user ID
const userName = getUserName();   // Get user name
const userEmail = getUserEmail(); // Get user email
```

### Security Features
- **Memory Storage**: User data stored in React Context (cleared on browser close)
- **Token Persistence**: Only authentication tokens in localStorage
- **Auto Cleanup**: Context cleared on logout or token expiry

## Backend Integration

### API Response Format
The system handles your backend response structure:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "jwt_token_here",
    "refresh_token": "refresh_token_here", 
    "user": {
      "id": 1,
      "name": "User Name",
      "email": "user@example.com",
      "role": "customer"
    }
  }
}
```

### API Endpoints
- **Login**: `POST /api/auth/login`
- **Signup**: `POST /api/auth/signup`  
- **Vendor Login**: `POST /api/auth/vendor/login`
- **Admin Login**: `POST /api/auth/admin/login`
- **Logout**: `POST /api/auth/logout`
- **Refresh**: `POST /api/auth/refresh`

## Usage Examples

### Using UserContext in Components
```javascript
import { useUser } from '../contexts/UserContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useUser();
  
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Role-Based Rendering
```javascript
function Dashboard() {
  const { isAdmin, isVendor, isCustomer } = useUser();
  
  return (
    <div>
      {isAdmin() && <AdminPanel />}
      {isVendor() && <VendorDashboard />}
      {isCustomer() && <CustomerDashboard />}
    </div>
  );
}
```

## Testing

### Manual Testing Steps
1. **Load Application**: Visit http://localhost:3000
2. **Login Test**: Try logging in with backend credentials
3. **Context Check**: User data should be available application-wide
4. **Token Storage**: Check localStorage - only token should be stored
5. **Role Redirect**: User should be redirected based on role
6. **Logout Test**: Context should clear and redirect to login

### Browser DevTools
- **Application Tab**: Check localStorage for tokens only
- **React DevTools**: Inspect UserContext state
- **Network Tab**: Verify API calls to backend

## Security Benefits

### Improved Security
- **No Sensitive Data in localStorage**: User information not persisted
- **Memory-Only Storage**: User data cleared on browser close
- **Token-Only Persistence**: Only authentication tokens stored locally

### Session Management
- **Auto-Cleanup**: Context cleared on logout
- **Token Validation**: Automatic token verification
- **Refresh Handling**: Token refresh without user data exposure

## Next Steps

### Recommended Enhancements
1. **Token Auto-Refresh**: Implement automatic token refresh
2. **Persistent Sessions**: Optional "Remember Me" functionality  
3. **Error Boundaries**: Add error boundaries around UserProvider
4. **Loading States**: Enhanced loading states for better UX

### Integration Points
- **Update Components**: Migrate remaining components to use UserContext
- **API Interceptors**: Add token refresh interceptor
- **Route Guards**: Implement protected route components