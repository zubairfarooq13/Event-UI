# Vendor Dashboard Component

## Overview
A comprehensive vendor dashboard system with responsive design, sidebar navigation, and interactive charts for venue management.

## Features Implemented ✅

### 🎯 **1. Responsive Sidebar Navigation**
- **Desktop**: Expandable/collapsible sidebar (64px collapsed, 256px expanded)
- **Mobile**: Hamburger menu with overlay and slide-in animation
- **Navigation Items**:
  - 📊 Dashboard (Home/Analytics)
  - 📸 Photos (Gallery Management) 
  - 📦 Packages (Event Packages)
  - 📅 Availability (Calendar Management)
  - 📖 Bookings (Booking Management)
  - 🚪 Logout

### 🎯 **2. Dashboard Home with Summary Cards**
- **Booking Status Cards**:
  - ⏳ Pending Bookings: 25 (with trend indicators)
  - ✅ Confirmed Bookings: 45 (with growth percentage)
  - ❌ Rejected Bookings: 8 (with decline percentage)
  - 💰 Monthly Revenue: PKR 3.25M (with trend data)

### 🎯 **3. Interactive Charts (Recharts)**
- **Monthly Bookings Bar Chart**: 12-month booking trends with revenue overlay
- **Booking Status Pie Chart**: Visual distribution of booking statuses
- **Custom Tooltips**: Formatted data display on hover
- **Responsive Design**: Charts adapt to screen size

### 🎯 **4. Additional Dashboard Sections**
- **Photos Management**: Grid layout with edit/delete actions
- **Packages Management**: Cards showing package details, pricing, features
- **Availability Calendar**: Date-based availability status
- **Bookings Table**: Comprehensive booking management with actions

### 🎯 **5. Mobile Responsiveness**
- **Breakpoints**:
  - `lg:` (1024px+): Sidebar always visible, collapsible
  - `md:` (768px+): Grid layouts adjust
  - Mobile: Hamburger menu, full-width content
- **Touch-friendly**: Large click targets, proper spacing
- **Overlay Navigation**: Dark backdrop, smooth animations

## File Structure
```
src/components/vendor/
├── VendorDashboard.js          # Main dashboard container
├── VendorSidebar.js            # Responsive sidebar navigation  
├── VendorDashboardHome.js      # Analytics dashboard with charts
├── VendorPhotos.js             # Photo gallery management
├── VendorPackages.js           # Package management
├── VendorAvailability.js       # Calendar availability
├── VendorBookings.js           # Booking management table
└── README.md                   # This documentation
```

## Usage Example

```jsx
import VendorDashboard from './components/vendor/VendorDashboard';

// Basic usage
<VendorDashboard onLogout={handleLogout} />

// Integrated with authentication
{userType === 'vendor' && currentView === 'vendor' && (
  <VendorDashboard onLogout={handleLogout} />
)}
```

## Chart Configuration (Recharts)

### Monthly Bookings Chart
```jsx
<BarChart data={monthlyBookingsData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="month" />
  <YAxis yAxisId="bookings" orientation="left" />
  <YAxis yAxisId="revenue" orientation="right" />
  <Bar yAxisId="bookings" dataKey="bookings" fill="#3B82F6" />
</BarChart>
```

### Booking Status Pie Chart
```jsx
<PieChart>
  <Pie
    data={bookingStatusData}
    innerRadius={60}
    outerRadius={100}
    paddingAngle={5}
    dataKey="value"
  />
</PieChart>
```

## Responsive Design Breakpoints

| Screen Size | Sidebar Behavior | Layout |
|-------------|------------------|---------|
| `< 1024px` | Hamburger menu | Single column |
| `≥ 1024px` | Always visible | Multi-column grid |
| `≥ 1280px` | Collapsible | Optimized spacing |

## Dummy Data Schema

### Booking Data
```javascript
{
  id: number,
  customerName: string,
  eventType: string,
  date: string,
  guests: number,
  amount: number,
  status: 'pending' | 'confirmed' | 'rejected',
  package: string
}
```

### Chart Data
```javascript
{
  month: string,
  bookings: number,
  revenue: number
}
```

## Styling Features
- **Color Coding**: Status-based colors (green, yellow, red)
- **Hover Effects**: Card elevation, button states
- **Transitions**: Smooth animations (300ms duration)
- **Icons**: React Icons (FA) for consistency
- **Typography**: Clear hierarchy with proper font weights
- **Shadows**: Subtle elevation with Tailwind shadow utilities

## Authentication Integration
- **User Type Detection**: Automatically detects vendor vs customer
- **Route Protection**: Shows dashboard only for authenticated vendors
- **Logout Handling**: Proper cleanup and redirect

## Dependencies
- **Recharts**: `^2.x` for chart components
- **React Icons**: Font Awesome icons
- **TailwindCSS**: Utility-first styling
- **React**: Core functionality

## Navigation Logic
```javascript
// Demo vendor detection (phone starts with '03')
const isVendor = userData.phone && userData.phone.startsWith('03');
setUserType(isVendor ? 'vendor' : 'customer');
setCurrentView(isVendor ? 'vendor' : 'home');
```

The vendor dashboard provides a complete venue management solution with professional design, responsive layout, and comprehensive functionality for venue owners.