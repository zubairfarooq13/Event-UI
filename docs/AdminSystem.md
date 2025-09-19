# Event App - Admin System

## Admin Portal Access

The Event App now includes a comprehensive admin authentication system with the following features:

### Admin Login Credentials

Use these test credentials to access the admin portal:

1. **Admin User**
   - Email: `admin@eventapp.com`
   - Password: `admin123`
   - Role: Administrator

2. **Super Admin**
   - Email: `super@eventapp.com`
   - Password: `super123`
   - Role: Super Administrator

3. **Manager**
   - Email: `manager@eventapp.com`
   - Password: `manager123`
   - Role: Manager

### How to Access Admin Portal

There are several ways to access the admin portal:

1. **From Customer/Vendor Portal:**
   - Login to the main app as a customer or vendor
   - Click on your profile dropdown in the header
   - Select "Admin Portal" from the menu

2. **Direct URL Access:**
   - Navigate to `/admin` in your browser
   - You'll be automatically redirected to the admin login page

3. **From Admin Landing Page:**
   - Open `admin.html` in the public folder
   - Click "Enter Admin Portal" button

### Admin Dashboard Features

Once logged in as an admin, you'll have access to:

- **User Management**: View total registered users (current: 1,247)
- **Vendor Management**: Monitor active vendors (current: 89)
- **Revenue Analytics**: Track total revenue (current: $45,678)
- **Booking Overview**: Monitor total bookings (current: 567)
- **Recent Activities**: View latest user registrations, vendor applications, and bookings
- **Quick Actions**: Access user management, vendor approval, reports, and settings

### Security Features

- Form validation with proper error handling
- Password visibility toggle for better UX
- Secure credential checking
- Session management
- Role-based access control ready for implementation

### Technical Implementation

The admin system includes:
- `AdminLogin.js` - Responsive login form with validation
- `AdminDashboard.js` - Complete dashboard with statistics and management tools
- Integrated routing in `App.js` with separate authentication state
- Mobile-responsive design with gradient styling
- React Hook Form integration for form handling

## Getting Started

1. Start the development server:
   ```bash
   npm start
   ```

2. Navigate to the admin portal using any of the methods above

3. Use the provided test credentials to login

4. Explore the admin dashboard features

The admin system is fully integrated with the existing Event App architecture and maintains separate authentication states for customer/vendor and admin users.