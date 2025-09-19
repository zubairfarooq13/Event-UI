# Booking Management System Documentation

## Overview
A comprehensive booking management system that allows vendors to view, filter, and manage booking requests with responsive table views, status management, and pagination capabilities.

## Features Implemented ✅

### 🎯 **1. Booking Table System**
- **Responsive design**: Desktop table view → Mobile card view
- **Comprehensive columns**: Customer, Date, Package, Guests, Amount, Status, Actions
- **Horizontal scroll**: Mobile table scrolls horizontally when needed
- **Hover effects**: Interactive feedback on table rows

### 🎯 **2. Status Management**
- **Color-coded badges**: Yellow (pending), Green (confirmed), Red (rejected)
- **Status icons**: Visual indicators with FontAwesome icons
- **Action buttons**: Accept/Reject for pending bookings only
- **Confirmation dialogs**: Prevent accidental status changes

### 🎯 **3. Advanced Filtering & Search**
- **Real-time search**: Filter by customer name, email, event type, package
- **Status filtering**: Filter by booking status (All, Pending, Confirmed, Rejected)
- **Active filter display**: Show and clear active filters
- **Combined filtering**: Search and status filters work together

### 🎯 **4. Pagination System**
- **Configurable page size**: 10 items per page (configurable)
- **Smart pagination**: Only shows when needed (>10 items)
- **Page navigation**: Previous/Next buttons with page numbers
- **Ellipsis handling**: Shows "..." for large page ranges
- **Results counter**: Shows "X to Y of Z bookings"

### 🎯 **5. Statistics Dashboard**
- **Live metrics**: Total, Pending, Confirmed, Rejected counts
- **Revenue tracking**: Total confirmed booking revenue
- **Visual indicators**: Color-coded statistic cards
- **Real-time updates**: Stats update as bookings change status

## File Structure
```
src/components/vendor/bookings/
├── BookingManagement.js        # Main container component
├── BookingTable.js             # Responsive table/card view
├── BookingStatusBadge.js       # Status badge component
├── BookingActionButtons.js     # Action buttons with confirmations
├── BookingPagination.js        # Pagination component
└── README.md                   # This documentation

src/components/vendor/
└── VendorBookings.js           # Integration wrapper
```

## Component Architecture

### **BookingManagement.js** - Main Container
- State management for bookings and filters
- Search and filter logic
- Statistics calculations
- API integration (mock)
- Pagination handling

### **BookingTable.js** - Responsive Display
- Desktop: Full table with all columns
- Mobile: Card-based layout with key information
- Responsive breakpoint: 1024px (lg)
- Horizontal scroll fallback for table overflow

### **BookingStatusBadge.js** - Status Display
- Configurable sizes (small, default, large)
- Color-coded backgrounds and text
- Status icons with consistent styling

### **BookingActionButtons.js** - Action System
- View, Accept, Reject buttons
- Confirmation dialogs with booking details
- Loading states during API calls
- Conditional rendering based on status

### **BookingPagination.js** - Navigation
- Smart page number display with ellipsis
- Previous/Next navigation
- Results counter and page info
- Responsive button layout

## Usage Examples

### **Basic Integration**
```jsx
import BookingManagement from './bookings/BookingManagement';

// In VendorBookings.js
const VendorBookings = () => {
  return (
    <div className="p-6">
      <BookingManagement />
    </div>
  );
};
```

### **Booking Data Structure**
```javascript
const booking = {
  id: 1,
  customerName: 'Ahmed Khan',
  customerEmail: 'ahmed.khan@email.com',
  eventType: 'Wedding',
  date: '2025-10-15',
  guests: 500,
  amount: 2500,
  status: 'pending', // pending, confirmed, rejected
  package: 'Wedding Premium Package',
  duration: 8,
  phone: '+1-555-0123',
  createdAt: '2025-09-18'
};
```

## Features in Detail

### **1. Responsive Table Design**
```javascript
// Desktop: Full table layout
<table className="w-full">
  <thead>...</thead>
  <tbody>...</tbody>
</table>

// Mobile: Card-based layout
<div className="lg:hidden">
  {bookings.map(booking => (
    <div className="p-4 border-b">
      {/* Card content */}
    </div>
  ))}
</div>
```

### **2. Status Badge System**
```javascript
const statusConfig = {
  pending: {
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    icon: FaClock,
    iconColor: 'text-yellow-600'
  },
  confirmed: {
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    icon: FaCheck,
    iconColor: 'text-green-600'
  },
  rejected: {
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    icon: FaTimes,
    iconColor: 'text-red-600'
  }
};
```

### **3. Confirmation Dialog System**
```javascript
const confirmationDialog = {
  title: `${action} Booking`,
  message: `Are you sure you want to ${action} this booking?`,
  bookingDetails: { customer, date, package, amount },
  warningText: action === 'accept' ? 
    'This will confirm the venue...' : 
    'This action cannot be undone...'
};
```

### **4. Pagination Logic**
```javascript
const pagination = {
  itemsPerPage: 10,
  totalPages: Math.ceil(totalItems / itemsPerPage),
  currentPage: 1,
  startIndex: (currentPage - 1) * itemsPerPage,
  endIndex: Math.min(startIndex + itemsPerPage, totalItems)
};
```

## Responsive Design Details

### **Breakpoint Strategy**
| Screen Size | Layout | Table Behavior |
|-------------|--------|----------------|
| Mobile (<1024px) | Card view | Stacked cards with key info |
| Desktop (≥1024px) | Table view | Full table with all columns |

### **Mobile Card Layout**
```jsx
// Mobile card structure
<div className="p-4">
  {/* Header: Customer + Status */}
  <div className="flex justify-between">
    <CustomerInfo />
    <StatusBadge size="small" />
  </div>
  
  {/* Details Grid */}
  <div className="grid grid-cols-2 gap-3">
    <DateInfo />
    <AmountInfo />
    <PackageInfo />
    <GuestInfo />
  </div>
  
  {/* Actions */}
  <ActionButtons />
</div>
```

### **Table Responsiveness**
```css
/* Horizontal scroll for table overflow */
.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Minimum column widths */
th, td {
  min-width: 120px;
  white-space: nowrap;
}
```

## Mock Data & API Integration

### **Sample Data Set**
- **12 mock bookings** with varied statuses
- **Different event types**: Wedding, Corporate, Birthday, etc.
- **Realistic data**: Names, emails, phone numbers, amounts
- **Date range**: September 2025 - December 2025

### **API Simulation**
```javascript
// Mock API calls with realistic delays
const acceptBooking = async (bookingId) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, bookingId, newStatus: 'confirmed' };
};

const rejectBooking = async (bookingId) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, bookingId, newStatus: 'rejected' };
};
```

### **Loading States**
- **Table-level loading**: Skeleton loading during initial fetch
- **Action-level loading**: Spinners on accept/reject buttons
- **Confirmation dialogs**: Loading states in confirmation modals

## Search & Filter System

### **Search Functionality**
```javascript
const searchFields = [
  'customerName',
  'customerEmail', 
  'eventType',
  'package'
];

const filteredBookings = bookings.filter(booking =>
  searchFields.some(field =>
    booking[field].toLowerCase().includes(searchTerm.toLowerCase())
  )
);
```

### **Status Filtering**
```javascript
const statusOptions = ['all', 'pending', 'confirmed', 'rejected'];

const applyStatusFilter = (bookings, status) => {
  return status === 'all' ? 
    bookings : 
    bookings.filter(booking => booking.status === status);
};
```

### **Active Filter Display**
- **Visual indicators**: Pills showing active search terms and filters
- **Quick removal**: X buttons to clear individual filters
- **Combined display**: Shows both search and status filters when active

## Statistics & Analytics

### **Real-time Calculations**
```javascript
const calculateStats = (bookings) => ({
  total: bookings.length,
  pending: bookings.filter(b => b.status === 'pending').length,
  confirmed: bookings.filter(b => b.status === 'confirmed').length,
  rejected: bookings.filter(b => b.status === 'rejected').length,
  totalRevenue: bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.amount, 0)
});
```

### **Dashboard Cards**
- **Total Bookings**: Overall count with neutral styling
- **Pending**: Yellow highlight for attention
- **Confirmed**: Green highlight for success
- **Rejected**: Red highlight for declined
- **Revenue**: Blue highlight for financial metric

## Performance Optimizations

### **Efficient Filtering**
- **Debounced search**: Prevents excessive filtering on rapid typing
- **Memoized calculations**: Cache expensive operations
- **Pagination**: Only render visible items
- **Virtual scrolling**: Ready for large datasets

### **State Management**
- **Separate filter state**: Maintains original data integrity
- **Optimistic updates**: Immediate UI feedback
- **Error handling**: Graceful failure recovery
- **Loading states**: Clear progress indicators

## Testing Scenarios

### **Desktop Testing**
1. **Table interactions**: Click actions, hover effects
2. **Pagination**: Navigate through multiple pages
3. **Search & Filter**: Combined filtering scenarios
4. **Status changes**: Accept/reject workflow

### **Mobile Testing**
1. **Card layout**: Proper information display
2. **Touch interactions**: Tap actions and confirmations
3. **Scroll behavior**: Smooth card scrolling
4. **Responsive breakpoints**: Layout transitions

### **Edge Cases**
- **Empty states**: No bookings, no search results
- **Loading states**: API delays and failures
- **Large datasets**: Performance with many bookings
- **Network issues**: Offline behavior

The booking management system provides vendors with a professional, comprehensive interface to efficiently manage their venue bookings with advanced filtering, responsive design, and excellent user experience across all devices.