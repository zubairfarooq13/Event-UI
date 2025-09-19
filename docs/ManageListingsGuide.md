# Manage Listings Component Guide

## 🚀 How to Access

### From Admin Dashboard:
1. **Login to Admin Portal:** Navigate to `/admin` and login with `admin@eventapp.com` / `admin123`
2. **Access Manage Listings:** Click **"Manage Listings"** button in Quick Actions section
3. **Navigate Back:** Use **"Back to Dashboard"** button in header

## 📋 Features Overview

### **🏢 Listings Management**
- **Complete CRUD Operations:** View, Edit, Delete venue listings
- **6 Mock Listings:** Restaurants, Farmhouses, Marquees across multiple cities
- **Detailed Information:** Name, type, location, capacity, pricing, vendor details

### **🔍 Advanced Search & Filtering**
- **Search Bar:** Find listings by name or vendor
- **Type Filter:** Filter by Restaurant, Farmhouse, Marquee
- **City Filter:** Filter by Karachi, Lahore, Islamabad, Faisalabad, Multan
- **Real-time Results:** Instant filtering as you type or change selections

### **📊 Statistics Dashboard**
- **Total Listings:** Shows all venue listings count
- **Active/Suspended:** Status breakdown with counts
- **Filtered Results:** Shows current filtered count

### **💻 Responsive Design**
- **Desktop:** Full table view with all details
- **Mobile:** Card-based layout with essential information
- **Horizontal Scroll:** Tables adapt to screen size

### **✏️ Edit Functionality**
- **Comprehensive Edit Modal:** Modify all listing details
- **Form Fields:** Name, Type, City, Capacity, Price, Description, Status
- **Validation:** Proper form handling and data updates
- **Save Changes:** Updates listing in real-time

### **🗑️ Delete Functionality**
- **Confirmation Modal:** Prevents accidental deletions
- **Warning Message:** Clear indication of action consequences
- **Safe Deletion:** Removes listing from system

## 📱 Test Scenarios

### **1. View All Listings**
- See 6 pre-loaded venue listings
- Check desktop table vs mobile card views
- Verify all listing details display correctly

### **2. Search Functionality**
- Search for "Grand Palace" or "Rosewood"
- Try searching by vendor name like "Elite Events"
- Test search with partial terms

### **3. Filter by Type**
- Filter by "Restaurant" - should show 2 results
- Filter by "Farmhouse" - should show 2 results  
- Filter by "Marquee" - should show 2 results

### **4. Filter by City**
- Filter by "Karachi" - should show 2 listings
- Try other cities to see different results
- Combine search with city filter

### **5. Edit a Listing**
- Click "Edit" button on any listing
- Modify the listing name and capacity
- Save changes and verify updates
- Check both desktop and mobile edit experience

### **6. Delete a Listing**
- Click "Delete" button on any listing
- Confirm deletion in modal
- Verify listing is removed from list
- Check that stats update accordingly

### **7. Mobile Responsiveness**
- Resize browser to mobile width
- Verify card layout displays properly
- Test edit/delete buttons on mobile
- Check filter dropdown accessibility

## 🎯 Mock Data Details

### **Listings Include:**
1. **Grand Palace Banquet Hall** (Marquee, Karachi) - ₹25,000/day, 500 capacity
2. **Rosewood Farmhouse** (Farmhouse, Lahore) - ₹15,000/day, 200 capacity  
3. **Spice Garden Restaurant** (Restaurant, Islamabad) - ₹12,000/day, 150 capacity
4. **Royal Marquee Events** (Marquee, Faisalabad) - ₹35,000/day, 800 capacity
5. **Sunset Farmhouse Resort** (Farmhouse, Multan) - ₹18,000/day, 300 capacity
6. **Urban Bistro & Lounge** (Restaurant, Karachi) - ₹10,000/day, 120 capacity **(Suspended)**

### **Each Listing Contains:**
- Complete contact and pricing information
- Vendor details and booking history
- Amenities and facility descriptions
- Rating and booking statistics
- Creation dates and status indicators

## 🔧 Technical Implementation

### **Component Features:**
- **State Management:** React useState for all CRUD operations
- **Responsive Design:** TailwindCSS with mobile-first approach
- **Icon Integration:** React Icons for consistent UI
- **Modal System:** Edit and delete confirmation modals
- **Search & Filter:** Real-time filtering with multiple criteria
- **Data Persistence:** Changes maintained in component state

### **Ready for Production:**
- Replace mock data with API calls
- Add pagination for large datasets  
- Implement backend CRUD endpoints
- Add image upload capabilities
- Include advanced search features
- Add bulk operations

The ManageListings component provides a complete admin interface for venue management with professional design and full functionality! 🎉