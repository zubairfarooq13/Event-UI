# Python Backend Requirements for RBAC Implementation

## Overview
This document outlines the backend changes required to support the comprehensive Role-Based Access Control (RBAC) system implemented on the frontend React application.

---

## 1. JWT Token Structure

### Required Token Payload
```python
{
    "user_id": 123,                    # Unique user identifier
    "email": "user@example.com",       # User email
    "role": "customer",                # User role: "customer", "vendor", or "admin"
    "exp": 1700000000,                 # Expiration timestamp (Unix time)
    "iat": 1699996400,                 # Issued at timestamp (Unix time)
    "jti": "unique-token-id"           # JWT ID for token revocation (optional but recommended)
}
```

### Token Lifespans (Recommended)
- **Access Token**: 15-30 minutes (short-lived for security)
- **Refresh Token**: 7-30 days (long-lived, stored securely)

### Implementation Notes
- Use a robust JWT library (e.g., `PyJWT`, `python-jose`)
- Sign tokens with a strong secret key (use environment variables)
- Include token expiration validation in all protected endpoints
- Consider token rotation for refresh tokens to enhance security

---

## 2. Required API Endpoints

### Authentication Endpoints

#### **POST /api/auth/login** (or /api/auth/user/login)
**Purpose**: User/Customer login

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 123,
      "email": "user@example.com",
      "name": "John Doe",
      "phone": "+1234567890",
      "role": "customer",
      "profile_photo": "https://example.com/photo.jpg"
    }
  }
}
```

**Error Response** (401):
```json
{
  "success": false,
  "message": "Invalid credentials",
  "error_code": "UNAUTHORIZED"
}
```

---

#### **POST /api/auth/vendor/login**
**Purpose**: Vendor login

**Request/Response**: Same structure as user login, but:
- User object includes `role: "vendor"`
- May include vendor-specific fields (company_name, business_type, etc.)

---

#### **POST /api/auth/admin/login**
**Purpose**: Admin login

**Request/Response**: Same structure as user login, but:
- User object includes `role: "admin"`
- May include admin-specific fields (permissions, admin_level, etc.)

---

#### **POST /api/auth/signup** (or /api/auth/user/signup)
**Purpose**: User/Customer registration

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "password": "securePassword123",
  "name": "Jane Doe",
  "phone": "+1234567890"
}
```

**Success Response** (201):
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "access_token": "...",
    "refresh_token": "...",
    "user": {
      "id": 124,
      "email": "newuser@example.com",
      "name": "Jane Doe",
      "phone": "+1234567890",
      "role": "customer"
    }
  }
}
```

---

#### **POST /api/auth/vendor/signup**
**Purpose**: Vendor registration

**Request Body**:
```json
{
  "email": "vendor@example.com",
  "password": "securePassword123",
  "name": "Vendor Name",
  "company_name": "Vendor Company LLC",
  "phone": "+1234567890",
  "business_type": "Catering"
}
```

**Success Response**: Same structure as user signup with `role: "vendor"`

---

#### **POST /api/auth/refresh**
**Purpose**: Refresh access token using refresh token

**Request Body**:
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "access_token": "new_access_token_here",
    "refresh_token": "new_refresh_token_here",  // Optional: implement token rotation
    "user": {
      "id": 123,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "customer"
    }
  }
}
```

**Error Response** (401):
```json
{
  "success": false,
  "message": "Invalid or expired refresh token",
  "error_code": "INVALID_REFRESH_TOKEN"
}
```

---

#### **GET /api/auth/verify**
**Purpose**: Verify if current access token is valid

**Headers**:
```
Authorization: Bearer <access_token>
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "user_id": 123,
    "email": "user@example.com",
    "role": "customer",
    "exp": 1700000000
  }
}
```

**Error Response** (401):
```json
{
  "success": false,
  "message": "Token is invalid or expired",
  "error_code": "INVALID_TOKEN"
}
```

---

#### **POST /api/auth/logout**
**Purpose**: Logout user and invalidate tokens

**Headers**:
```
Authorization: Bearer <access_token>
```

**Request Body** (Optional):
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Implementation Notes**:
- Add tokens to a blacklist/revocation list (Redis recommended)
- Clear any server-side sessions
- Consider using JTI (JWT ID) for efficient token revocation

---

#### **GET /api/auth/profile**
**Purpose**: Get current user's profile

**Headers**:
```
Authorization: Bearer <access_token>
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": 123,
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "role": "customer",
    "profile_photo": "https://example.com/photo.jpg",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

#### **PUT /api/auth/profile**
**Purpose**: Update current user's profile

**Headers**:
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data  (if uploading photo)
```

**Request Body**:
```json
{
  "name": "Updated Name",
  "phone": "+9876543210"
}
```

OR with file upload:
```
FormData:
  name: "Updated Name"
  phone: "+9876543210"
  profile_photo: <file>
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 123,
    "email": "user@example.com",
    "name": "Updated Name",
    "phone": "+9876543210",
    "role": "customer",
    "profile_photo": "https://example.com/new_photo.jpg"
  }
}
```

---

## 3. Role-Based Middleware/Decorators

### Python Flask Example

```python
from functools import wraps
from flask import request, jsonify
import jwt

def token_required(f):
    """Decorator to require valid JWT token"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Get token from Authorization header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]  # Bearer <token>
            except IndexError:
                return jsonify({
                    'success': False,
                    'message': 'Invalid token format',
                    'error_code': 'INVALID_TOKEN_FORMAT'
                }), 401
        
        if not token:
            return jsonify({
                'success': False,
                'message': 'Token is missing',
                'error_code': 'TOKEN_MISSING'
            }), 401
        
        try:
            # Decode token
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = get_user_by_id(data['user_id'])
            
            if not current_user:
                return jsonify({
                    'success': False,
                    'message': 'User not found',
                    'error_code': 'USER_NOT_FOUND'
                }), 401
            
        except jwt.ExpiredSignatureError:
            return jsonify({
                'success': False,
                'message': 'Token has expired',
                'error_code': 'TOKEN_EXPIRED'
            }), 401
        except jwt.InvalidTokenError:
            return jsonify({
                'success': False,
                'message': 'Invalid token',
                'error_code': 'INVALID_TOKEN'
            }), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated


def role_required(allowed_roles):
    """Decorator to require specific role(s)"""
    def decorator(f):
        @wraps(f)
        def decorated_function(current_user, *args, **kwargs):
            if current_user.role not in allowed_roles:
                return jsonify({
                    'success': False,
                    'message': 'Insufficient permissions',
                    'error_code': 'FORBIDDEN'
                }), 403
            return f(current_user, *args, **kwargs)
        return decorated_function
    return decorator


# Usage example:
@app.route('/api/user/enquiries', methods=['GET'])
@token_required
@role_required(['customer'])
def get_user_enquiries(current_user):
    # Only accessible by users with 'customer' role
    enquiries = get_enquiries_for_user(current_user.id)
    return jsonify({
        'success': True,
        'data': enquiries
    }), 200


@app.route('/api/vendor/spaces', methods=['GET'])
@token_required
@role_required(['vendor'])
def get_vendor_spaces(current_user):
    # Only accessible by users with 'vendor' role
    spaces = get_spaces_for_vendor(current_user.id)
    return jsonify({
        'success': True,
        'data': spaces
    }), 200


@app.route('/api/admin/users', methods=['GET'])
@token_required
@role_required(['admin'])
def get_all_users(current_user):
    # Only accessible by users with 'admin' role
    users = get_all_users_from_db()
    return jsonify({
        'success': True,
        'data': users
    }), 200
```

---

### Python FastAPI Example

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Dependency to get current authenticated user"""
    token = credentials.credentials
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("user_id")
        
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        user = get_user_by_id(user_id)
        
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        
        return user
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


def require_role(allowed_roles: list):
    """Dependency to check user role"""
    async def role_checker(current_user = Depends(get_current_user)):
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return current_user
    return role_checker


# Usage example:
@app.get("/api/user/enquiries")
async def get_user_enquiries(current_user = Depends(require_role(["customer"]))):
    enquiries = get_enquiries_for_user(current_user.id)
    return {"success": True, "data": enquiries}


@app.get("/api/vendor/spaces")
async def get_vendor_spaces(current_user = Depends(require_role(["vendor"]))):
    spaces = get_spaces_for_vendor(current_user.id)
    return {"success": True, "data": spaces}


@app.get("/api/admin/users")
async def get_all_users(current_user = Depends(require_role(["admin"]))):
    users = get_all_users_from_db()
    return {"success": True, "data": users}
```

---

## 4. Protected Endpoints by Role

### Customer/User Endpoints (Role: "customer")
```
GET    /api/user/enquiries          - Get user's enquiries
POST   /api/user/enquiries          - Create new enquiry
GET    /api/user/favourites         - Get user's favorite venues
POST   /api/user/favourites         - Add venue to favorites
DELETE /api/user/favourites/:id     - Remove from favorites
GET    /api/user/profile            - Get user profile (use /api/auth/profile)
PUT    /api/user/profile            - Update user profile (use /api/auth/profile)
```

### Vendor Endpoints (Role: "vendor")
```
GET    /api/vendor/dashboard        - Get vendor dashboard data
GET    /api/vendor/spaces           - Get vendor's spaces/venues
POST   /api/vendor/spaces           - Create new space
GET    /api/vendor/spaces/:id       - Get specific space details
PUT    /api/vendor/spaces/:id       - Update space
DELETE /api/vendor/spaces/:id       - Delete space
GET    /api/vendor/enquiries        - Get enquiries for vendor's spaces
PUT    /api/vendor/enquiries/:id    - Respond to enquiry
GET    /api/vendor/settings         - Get vendor settings
PUT    /api/vendor/settings         - Update vendor settings
```

### Admin Endpoints (Role: "admin")
```
GET    /api/admin/dashboard         - Get admin dashboard stats
GET    /api/admin/users             - Get all users (with pagination)
GET    /api/admin/users/:id         - Get specific user details
DELETE /api/admin/users/:id         - Delete user
GET    /api/admin/vendors           - Get all vendors
PUT    /api/admin/vendors/:id/approve   - Approve vendor
PUT    /api/admin/vendors/:id/reject    - Reject vendor
GET    /api/admin/listings          - Get all venue listings
PUT    /api/admin/listings/:id      - Update listing (moderation)
DELETE /api/admin/listings/:id      - Delete listing
GET    /api/admin/bookings          - Get all bookings
GET    /api/admin/analytics         - Get system analytics
```

---

## 5. Error Response Format

### Standardized Error Response
All error responses should follow this format for consistency:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "error_code": "MACHINE_READABLE_CODE",
  "errors": {  // Optional: for validation errors
    "email": ["Email is required", "Email format is invalid"],
    "password": ["Password must be at least 8 characters"]
  }
}
```

### Common HTTP Status Codes
- **200**: Success
- **201**: Created (for POST requests that create resources)
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (missing or invalid token)
- **403**: Forbidden (insufficient permissions/wrong role)
- **404**: Not Found
- **422**: Unprocessable Entity (semantic errors)
- **500**: Internal Server Error

---

## 6. Database Schema Requirements

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('customer', 'vendor', 'admin') NOT NULL DEFAULT 'customer',
    profile_photo VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);
```

### Refresh Tokens Table (for token rotation and revocation)
```sql
CREATE TABLE refresh_tokens (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    revoked BOOLEAN DEFAULT FALSE,
    revoked_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token_hash (token_hash),
    INDEX idx_expires_at (expires_at)
);
```

### Token Blacklist Table (for logout and immediate revocation)
```sql
CREATE TABLE token_blacklist (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    jti VARCHAR(255) UNIQUE NOT NULL,  -- JWT ID from token payload
    user_id INTEGER NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    blacklisted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_jti (jti),
    INDEX idx_expires_at (expires_at)
);
```

---

## 7. Security Best Practices

### Password Hashing
```python
from werkzeug.security import generate_password_hash, check_password_hash

# When creating user
hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

# When verifying
is_valid = check_password_hash(user.password_hash, provided_password)
```

### Environment Variables
```bash
# .env file
SECRET_KEY=your-super-secret-key-change-this-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
DATABASE_URL=postgresql://user:password@localhost/dbname
```

### CORS Configuration
```python
from flask_cors import CORS

# Allow frontend origin
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "https://yourdomain.com"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
```

---

## 8. Implementation Checklist

### Phase 1: Core Authentication
- [ ] Implement JWT token generation with correct payload structure
- [ ] Create login endpoints for all three roles (user, vendor, admin)
- [ ] Create signup endpoints for user and vendor
- [ ] Implement password hashing
- [ ] Create token validation middleware
- [ ] Add role to user model/table

### Phase 2: Token Management
- [ ] Implement refresh token endpoint
- [ ] Add refresh token storage in database
- [ ] Implement token blacklist for logout
- [ ] Add token expiration validation
- [ ] Implement token rotation (optional but recommended)

### Phase 3: Authorization
- [ ] Create role-based middleware/decorators
- [ ] Protect all customer endpoints with 'customer' role
- [ ] Protect all vendor endpoints with 'vendor' role
- [ ] Protect all admin endpoints with 'admin' role
- [ ] Return proper 403 errors for insufficient permissions

### Phase 4: Profile Management
- [ ] Implement GET /api/auth/profile endpoint
- [ ] Implement PUT /api/auth/profile endpoint
- [ ] Add support for profile photo upload (multipart/form-data)
- [ ] Store profile photos (filesystem or cloud storage like AWS S3)

### Phase 5: Testing & Security
- [ ] Test all authentication flows
- [ ] Test token refresh mechanism
- [ ] Test role-based access control
- [ ] Implement rate limiting on auth endpoints
- [ ] Add CORS configuration
- [ ] Secure environment variables
- [ ] Add logging for security events

---

## 9. Testing Examples

### Test User Login (pytest example)
```python
def test_user_login_success(client):
    response = client.post('/api/auth/login', json={
        'email': 'user@example.com',
        'password': 'password123'
    })
    
    assert response.status_code == 200
    data = response.get_json()
    assert data['success'] == True
    assert 'access_token' in data['data']
    assert 'refresh_token' in data['data']
    assert data['data']['user']['role'] == 'customer'


def test_user_login_invalid_credentials(client):
    response = client.post('/api/auth/login', json={
        'email': 'user@example.com',
        'password': 'wrongpassword'
    })
    
    assert response.status_code == 401
    data = response.get_json()
    assert data['success'] == False


def test_protected_endpoint_without_token(client):
    response = client.get('/api/user/enquiries')
    assert response.status_code == 401


def test_protected_endpoint_with_valid_token(client, user_token):
    response = client.get('/api/user/enquiries', headers={
        'Authorization': f'Bearer {user_token}'
    })
    assert response.status_code == 200


def test_vendor_cannot_access_user_endpoint(client, vendor_token):
    response = client.get('/api/user/enquiries', headers={
        'Authorization': f'Bearer {vendor_token}'
    })
    assert response.status_code == 403
```

---

## 10. Additional Recommendations

### Token Refresh Strategy
1. **Proactive Refresh**: Frontend checks token expiration and refreshes 5 minutes before expiry
2. **Reactive Refresh**: On 401 response, attempt refresh and retry original request
3. **Token Rotation**: Issue new refresh token with each refresh for enhanced security

### Session Management
- Consider implementing "Remember Me" functionality with extended refresh token lifetime
- Allow users to view and revoke active sessions from different devices
- Track last login time and IP address for security monitoring

### Rate Limiting
```python
from flask_limiter import Limiter

limiter = Limiter(app, key_func=get_remote_address)

# Limit login attempts
@app.route('/api/auth/login', methods=['POST'])
@limiter.limit("5 per minute")
def login():
    # ... login logic
```

### Logging
```python
import logging

# Log authentication events
logging.info(f"User {user_id} logged in successfully from IP {request.remote_addr}")
logging.warning(f"Failed login attempt for email {email} from IP {request.remote_addr}")
logging.error(f"Token validation failed: {error_message}")
```

---

## Summary

This comprehensive guide provides all necessary backend requirements to support the frontend RBAC implementation. Key points:

1. **JWT tokens** must include `user_id`, `email`, `role`, `exp`, and `iat`
2. **Three login endpoints** for customer, vendor, and admin
3. **Token refresh mechanism** with refresh token rotation
4. **Role-based middleware** to protect endpoints
5. **Standardized response format** for all API responses
6. **Proper error handling** with appropriate HTTP status codes
7. **Security best practices** including password hashing, CORS, and rate limiting

The frontend is now fully configured and ready to integrate with these backend endpoints once implemented.
