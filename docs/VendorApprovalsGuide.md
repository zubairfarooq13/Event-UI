# How to View Vendor Approval Screen

## 🚀 Quick Access Guide

### Method 1: From Admin Dashboard (Recommended)
1. **Login to Admin Portal:**
   - Navigate to `/admin` or use admin access from main app
   - Use credentials: `admin@eventapp.com` / `admin123`

2. **Access Vendor Approvals:**
   - Click the **"Pending Approvals"** stat card (shows "12" with red bell icon)
   - OR click **"Vendor Approvals"** button in Quick Actions section

3. **Navigate Back:**
   - Use the **"Back to Dashboard"** button in the header

### Method 2: Direct Component Testing
If you want to test the component directly, you can temporarily update your `App.js`:

```javascript
// Import the component
import VendorApprovals from './components/admin/VendorApprovals';

// Add a test route or button to render it directly
<VendorApprovals />
```

## 📱 Features to Test

### Pending Vendors Tab:
- **5 Mock Vendors** ready for approval/rejection
- **Search Functionality:** Try searching "Elite" or "Golden"
- **Filter by Business Type:** Test different categories
- **Approve Action:** Green button moves vendor to approved list
- **Reject Action:** Red button triggers confirmation modal

### Approved Vendors Tab:
- **4 Mock Approved Vendors** with booking history
- **Status Indicators:** Active/Suspended badges
- **Booking Counts:** Shows total bookings per vendor

### Mobile Testing:
- **Responsive Design:** Tables scroll horizontally on mobile
- **Touch-Friendly:** Buttons sized for mobile interaction

## 🧪 Test Scenarios

1. **Approve a Vendor:**
   - Go to Pending Vendors tab
   - Click green "Approve" button on any vendor
   - Check Approved Vendors tab to see the vendor moved

2. **Reject a Vendor:**
   - Click red "Reject" button
   - Confirm in the modal popup
   - Vendor should be removed from pending list

3. **Search and Filter:**
   - Search for "Elite Events" in search bar
   - Filter by "Event Planning" business type
   - Try different combinations

4. **Mobile Responsiveness:**
   - Resize browser to mobile width
   - Check table horizontal scrolling
   - Test tab navigation on mobile

## 📊 Mock Data Overview

### Pending Vendors (5 total):
- Elite Events Co. (Event Planning)
- Golden Banquet Hall (Venue)
- Bloom & Blossom (Decoration)
- Melody Makers (Entertainment)
- Gourmet Catering Plus (Catering)

### Approved Vendors (4 total):
- Premier Wedding Venues (45 bookings)
- Delicious Delights Catering (78 bookings)
- Sparkle & Shine Decorations (32 bookings)
- Crystal Palace Events (15 bookings, Suspended)

## 🔧 Development Notes

- Component is fully integrated with AdminDashboard
- State management handles vendor transfers between lists
- Confirmation modal prevents accidental rejections
- All styling matches existing admin portal design
- Ready for backend API integration

## 🎯 Next Steps

To make this production-ready:
1. Replace mock data with real API calls
2. Add pagination for large vendor lists
3. Implement backend approval/rejection endpoints
4. Add email notifications for vendor status changes
5. Include vendor document review capabilities