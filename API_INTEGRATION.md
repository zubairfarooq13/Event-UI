# API Integration Guide

This document outlines the API integration setup for the Event App frontend application.

## Overview

The application now includes a comprehensive authentication system with API client integration using Axios. The system supports multiple user types (Customer, Vendor, Admin) with token-based authentication.

## Architecture

### Services Structure
```
src/services/
├── apiClient.js      # Axios instance with interceptors
├── authService.js    # Authentication methods
└── index.js         # Service exports
```

### Authentication Flow
1. User submits login credentials
2. Frontend calls appropriate auth service method
3. Backend validates credentials and returns JWT token
4. Token is stored in localStorage
5. All subsequent API requests include the token automatically
6. Token is refreshed when needed or cleared on logout

## API Client Configuration

### Base Configuration
- **Base URL**: Configurable via `REACT_APP_API_URL` environment variable
- **Timeout**: 10 seconds (configurable)
- **Headers**: JSON content-type and accept headers
- **Interceptors**: Automatic token attachment and error handling

### Environment Variables
```bash
# .env file
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_DEFAULT_TIMEOUT=30000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
REACT_APP_FACEBOOK_APP_ID=your_facebook_app_id_here
```

## Authentication Service

### User Types Supported
- **Customer**: Regular users booking events
- **Vendor**: Event organizers managing listings
- **Admin**: Platform administrators

### Available Methods

#### User/Customer Authentication
```javascript
import { authService } from '../services';

// Login
const result = await authService.loginUser({
  email: 'user@example.com',
  password: 'password123'
});

// Signup
const result = await authService.signupUser({
  name: 'John Doe',
  email: 'user@example.com',
  password: 'password123',
  phone: '03001234567'
});
```

#### Vendor Authentication
```javascript
// Vendor Login
const result = await authService.loginVendor({
  email: 'vendor@example.com',
  password: 'password123'
});

// Vendor Signup
const result = await authService.signupVendor({
  name: 'Event Company',
  email: 'vendor@example.com',
  password: 'password123',
  phone: '03001234567',
  businessName: 'Event Solutions',
  businessType: 'Wedding Planning'
});
```

#### Admin Authentication
```javascript
// Admin Login
const result = await authService.loginAdmin({
  email: 'admin@eventapp.com',
  password: 'admin123'
});
```

#### Common Methods
```javascript
// Logout
await authService.logout();

// Refresh Token
const result = await authService.refreshToken();

// Verify Token
const result = await authService.verifyToken();

// Update Profile
const result = await authService.updateProfile({
  name: 'Updated Name',
  phone: '03009876543'
});

// Change Password
const result = await authService.changePassword('oldPass', 'newPass');

// Password Reset
await authService.forgotPassword('user@example.com');
await authService.resetPassword('reset-token', 'newPassword');

// OTP Operations
await authService.sendOTP('03001234567');
const result = await authService.verifyOTP('03001234567', '1234');
```

## Authentication Helpers

### State Management
```javascript
import { isAuthenticated, getUserRole, getUserData, clearAuthData } from '../services';

// Check if user is authenticated
const authenticated = isAuthenticated();

// Get user role
const role = getUserRole(); // 'customer', 'vendor', or 'admin'

// Get user data
const userData = getUserData();

// Clear authentication data
clearAuthData();
```

## Integration with Components

### Login Components
Both `LoginSignup.js` and `AdminLogin.js` have been updated to use the authentication service:

```javascript
// In LoginSignup.js
import { authService } from '../../services';

const onOtpSubmit = async (data) => {
  const otpResult = await authService.verifyOTP(phoneNumber, data.otp);
  if (otpResult.success) {
    const loginResult = await authService.loginUser({...});
    if (loginResult.success) {
      onLogin(loginResult.data);
    }
  }
};
```

### App.js Integration
The main App component now handles authentication state using the service:

```javascript
import { authService, isAuthenticated, getUserRole, getUserData } from './services';

// Check authentication on app load
useEffect(() => {
  const authenticated = isAuthenticated();
  if (authenticated) {
    const role = getUserRole();
    const userData = getUserData();
    // Set app state based on stored auth data
  }
}, []);
```

## API Request Examples

### Making Authenticated Requests
```javascript
import { apiClient } from '../services';

// GET request
const venues = await apiClient.get('/venues');

// POST request
const booking = await apiClient.post('/bookings', {
  venueId: 123,
  date: '2024-01-15',
  guests: 50
});

// PUT request
const updatedProfile = await apiClient.put('/profile', {
  name: 'Updated Name'
});

// DELETE request
await apiClient.delete('/bookings/123');
```

### Error Handling
The API client automatically handles common errors:
- **401 Unauthorized**: Automatically attempts token refresh
- **403 Forbidden**: Clears auth data and redirects to login
- **404 Not Found**: Returns structured error response
- **422 Validation Error**: Returns validation errors
- **500 Server Error**: Returns generic error message

## Backend API Expectations

### Authentication Endpoints
```
POST /auth/login
POST /auth/signup
POST /auth/vendor/login
POST /auth/vendor/signup
POST /auth/admin/login
POST /auth/logout
POST /auth/refresh
GET  /auth/verify
POST /auth/forgot-password
POST /auth/reset-password
PUT  /auth/profile
PUT  /auth/change-password
POST /auth/send-otp
POST /auth/verify-otp
```

### Response Format
All API responses should follow this format:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "role": "customer"
    }
  }
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field": ["Validation error message"]
  }
}
```

## Security Features

### Token Management
- JWT tokens stored in localStorage
- Automatic token refresh on expiry
- Secure token validation
- Automatic logout on invalid tokens

### Request Security
- All requests include authentication headers
- CORS handling
- Request/response interceptors for security
- Automatic retry on token refresh

## Testing

### API Test Component
A test component is available at `src/components/common/ApiTestComponent.js` to verify API connectivity and authentication flow.

### Manual Testing
1. Start the backend server
2. Update `REACT_APP_API_URL` in `.env`
3. Test login flows for different user types
4. Verify token persistence across browser refreshes
5. Test logout functionality

## Development vs Production

### Development
```bash
# .env.development
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_DEBUG=true
```

### Production
```bash
# .env.production
REACT_APP_API_URL=https://api.eventapp.com
REACT_APP_DEBUG=false
```

## Common Issues and Solutions

### CORS Issues
Ensure backend allows requests from frontend origin:
```javascript
// Backend CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### Token Expiry
The system automatically handles token refresh. If issues persist:
1. Check token expiry time in backend
2. Verify refresh token endpoint
3. Clear localStorage and re-login

### Network Errors
- Check backend server is running
- Verify API URL in environment variables
- Check network connectivity
- Review browser console for detailed errors

## Next Steps

1. **Social Authentication**: Implement Google/Facebook OAuth
2. **Role-based Routing**: Add route guards based on user roles
3. **API Caching**: Implement response caching for better performance
4. **Offline Support**: Add service worker for offline functionality
5. **Real-time Features**: Integrate WebSocket for live updates

## Support

For issues or questions regarding API integration:
1. Check browser console for detailed error messages
2. Review network tab in developer tools
3. Verify environment variables are correctly set
4. Test with ApiTestComponent for connectivity issues