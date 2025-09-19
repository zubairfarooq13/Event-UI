# ListingDetail Component Documentation

## Overview
A comprehensive responsive React component for displaying detailed venue information with photo carousel, vendor details, package options, and booking functionality.

## Features

### 📸 **Photo Carousel**
- **High-quality placeholder images** from Unsplash
- **Navigation arrows** for manual browsing
- **Dot indicators** for direct image selection
- **Image counter** showing current position
- **Responsive design** with proper aspect ratios
- **Smooth transitions** between images

### 🏢 **Venue Information**
- **Venue name** and location with map marker icon
- **Capacity information** with user icon
- **Star rating** with review count
- **Availability status** with color-coded badges
- **Detailed description** of the venue
- **Amenities list** with relevant icons
- **Favorite and share** functionality

### 📦 **Packages Section**
- **3-tier package structure**: Basic, Premium, Luxury
- **Interactive package cards** with selection states
- **Detailed pricing** and feature lists
- **Individual package booking** buttons
- **Feature highlights** with checkmark icons
- **Responsive grid layout**

### 📞 **Vendor Contact**
- **Sticky sidebar** with vendor information
- **Contact details** (phone, email)
- **Vendor statistics** (response rate, time, bookings)
- **Experience information**

### 📱 **Responsive Booking**
- **Fixed bottom button** on mobile devices
- **Inline booking section** on desktop
- **Availability-based** button states
- **Call-to-action optimization**

## Component Structure

```jsx
ListingDetail/
├── Header Navigation (Back, Favorite, Share)
├── Main Content Grid
│   ├── Photo Carousel
│   ├── Venue Information
│   └── Packages Section
├── Sidebar (Vendor Contact)
├── Fixed Mobile Booking Button
└── Desktop Inline Booking
```

## Sample Data Structure

```javascript
const listingData = {
  name: "Royal Gardens Banquet Hall",
  location: "Bandra West, Mumbai",
  capacity: "200-500 guests",
  rating: 4.6,
  reviewCount: 128,
  description: "Detailed venue description...",
  amenities: [...],
  isAvailable: true,
  vendor: {
    name: "Elite Events & Venues",
    phone: "+91 98765 43210",
    email: "info@eliteevents.com",
    experience: "15+ years"
  }
};
```

## Package Types

### 1. **Basic Package** (₹25,000)
- Basic Decoration
- Sound System  
- Seating for 100
- 4 Hours Duration

### 2. **Premium Package** (₹65,000)
- Premium Decoration
- Catering Service
- Seating for 250
- 6 Hours Duration
- Photography

### 3. **Luxury Package** (₹1,25,000)
- Luxury Decoration
- Gourmet Catering
- Seating for 500
- Full Day Access
- Photography & Videography
- Event Coordinator

## Interactive Features

### 🖼️ **Carousel Navigation**
- **Arrow controls** for previous/next images
- **Dot navigation** for direct image access
- **Automatic image cycling** capability
- **Touch/swipe support** ready for mobile

### 🎯 **Package Selection**
- **Visual selection states** with border highlighting
- **Individual booking** per package
- **Package comparison** layout
- **Feature-based** pricing display

### 📱 **Responsive Behavior**
- **Mobile**: Fixed bottom booking button
- **Desktop**: Inline booking section
- **Tablet**: Optimized grid layouts
- **Grid breakpoints**: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)

## Dummy Functions

```javascript
// Main booking function
const handleRequestBooking = (packageId = null) => {
  const message = packageId 
    ? `Booking request for ${listingData.name} - Package ID: ${packageId}`
    : `Booking request for ${listingData.name}`;
  
  console.log(message);
  alert(`${message}\n\nWe'll contact you shortly!`);
};
```

## State Management

```javascript
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [selectedPackage, setSelectedPackage] = useState(null);
const [isFavorite, setIsFavorite] = useState(false);
```

## Responsive Breakpoints

- **Mobile (default)**: Single column, fixed bottom button
- **md (768px+)**: Two-column packages, sidebar appears
- **lg (1024px+)**: Three-column layout with full sidebar
- **xl (1280px+)**: Three-column packages, optimized spacing

## UI/UX Features

### 🎨 **Visual Design**
- **Card-based layout** with soft shadows
- **Consistent spacing** and padding
- **Color-coded status** badges
- **Gradient overlays** on images
- **Smooth hover effects**

### ♿ **Accessibility**
- **Alt text** for all images
- **Keyboard navigation** support
- **Focus management** for interactive elements
- **Screen reader friendly** semantic structure
- **Color contrast** compliance

### 🔧 **Performance**
- **Lazy loading ready** for images
- **Optimized re-renders** with proper keys
- **Efficient state management**
- **Mobile-first** approach

## Usage Example

```jsx
import ListingDetail from './components/ListingDetail';

function App() {
  return <ListingDetail />;
}
```

## Customization Options

- **Image sources**: Replace placeholder URLs with actual venue photos
- **Package data**: Modify packages array for different pricing tiers  
- **Vendor information**: Update contact details and statistics
- **Amenities**: Add/remove amenities with corresponding icons
- **Styling**: Customize TailwindCSS classes for branding
- **Booking flow**: Replace dummy function with actual API integration

This component provides a complete foundation for a professional venue listing page with modern design patterns and excellent user experience! 🏆