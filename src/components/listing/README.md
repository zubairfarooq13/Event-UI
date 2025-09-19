# Listings Page Component - Usage Guide

## Overview
The ListingsPage component provides a comprehensive, responsive search results interface with the following features:

## Features Implemented ✅

### 1. **Responsive Grid Layout**
- **Mobile (xs)**: 1 card per row
- **Tablet (md)**: 2 cards per row  
- **Desktop (xl)**: 3 cards per row
- **Large Desktop (2xl)**: 4 cards per row

### 2. **Fixed Card Layout**
- All cards have consistent dimensions
- Fixed image height (192px / h-48)
- Fixed content area height (128px / h-32)
- Prevents uneven card heights and alignment issues

### 3. **Header Section with Filters**
- Displays active filters (city, budget, capacity, date)
- "Clear filters" button functionality
- Filter count and venue count display
- Search and filter action buttons

### 4. **Listing Cards Display**
- Cover photo with hover effects
- Vendor/venue name (truncated to 1 line)
- Location (city) with map pin icon
- Capacity with users icon
- Price formatted as "PKR X,XXX"
- "View Details" button with navigation

### 5. **Loading States**
- Skeleton cards with shimmer animation
- Matches exact card dimensions
- Shows 9 skeleton cards during loading

### 6. **Error Handling**
- Error state with retry button
- Empty state when no results found
- Graceful image fallbacks

### 7. **Pagination**
- Smart pagination with ellipsis
- Previous/Next navigation
- Page number selection
- Smooth scroll to top on page change

### 8. **Navigation Integration**
- `handleViewDetails(id)` function
- Ready for React Router integration
- Passes listing ID to parent component

## Component Structure

```
ListingsPage/
├── ListingsPage.js      # Main container component
├── ListingCard.js       # Individual venue card
└── ListingCardSkeleton.js # Loading state card
```

## Usage Example

```jsx
import ListingsPage from './components/listing/ListingsPage';

// With filters
<ListingsPage 
  filters={{
    city: 'Lahore',
    budget: 250000,
    capacity: 500,
    date: '2025-09-25'
  }}
  onViewDetails={(id) => navigate(`/listing/${id}`)}
/>

// Basic usage
<ListingsPage 
  onViewDetails={handleViewDetails}
/>
```

## Responsive Breakpoints

- `grid-cols-1` - Mobile (default)
- `md:grid-cols-2` - Tablet (768px+)
- `xl:grid-cols-3` - Desktop (1280px+)
- `2xl:grid-cols-4` - Large Desktop (1536px+)

## Card Dimensions (Fixed)
- **Image**: 400x300px placeholder, displayed at h-48 (192px)
- **Card**: Total height varies by content, but content area is fixed
- **Content Area**: h-32 (128px) fixed height
- **Consistent spacing**: p-4 (16px) padding

## Dummy Data Schema
```javascript
{
  id: number,
  name: string,
  city: string,
  capacity: number,
  price: number,
  photo: string (URL)
}
```

## TailwindCSS Classes Used
- Responsive grid: `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4`
- Card styling: `bg-white rounded-xl shadow-sm border hover:shadow-lg`
- Fixed heights: `h-48` (image), `h-32` (content)
- Hover effects: `hover:-translate-y-1 group-hover:scale-105`
- Loading animation: `animate-pulse`

## Integration Notes
- Component is ready for React Router (`/listing/:id`)
- Filters can be passed as props
- Navigation callback handles page transitions
- Skeleton loading matches card structure exactly
- Error states provide user-friendly feedback

The component ensures consistent, professional-looking cards that maintain alignment regardless of content length differences.