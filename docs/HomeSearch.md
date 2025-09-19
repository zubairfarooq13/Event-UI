# HomeSearch Component Documentation

## Overview
A responsive React component for venue and event search functionality with modern UI design.

## Features

### 🔍 **Search Bar**
- Large, prominent search input at the top
- Placeholder: "Search restaurants, farmhouses, events..."
- Enter key support for quick search
- Search icon with proper positioning

### 🏷️ **Category Cards**
- **4 categories**: Restaurants, Birthday Packages, Farmhouses, Marquees
- **Responsive grid**: 2 per row on mobile, 4 per row on desktop
- **Interactive cards** with hover effects and selection states
- **Gradient backgrounds** with unique colors per category
- **Count indicators** showing available venues
- **Icons** for visual identification

### 🎛️ **Filter Section**
- **Collapsible design** with toggle button
- **4 filter types**:
  - **City Dropdown**: Pre-populated with major Indian cities
  - **Budget Range**: Predefined price ranges with rupee formatting
  - **Capacity**: Number input for guest count
  - **Date Picker**: Event date selection with minimum date validation
- **Clear filters** functionality

### 🎨 **UI/UX Design**
- **Mobile-first responsive** design
- **TailwindCSS** for consistent styling
- **Modern card-based** layout
- **Smooth transitions** and hover effects
- **Clean typography** and proper spacing
- **Gradient backgrounds** and soft shadows

## Component Structure

```jsx
HomeSearch/
├── Search Bar Section
├── Category Cards Grid
├── Filters Section (Collapsible)
├── Search Button
└── Quick Stats Section
```

## State Management

```javascript
const [searchQuery, setSearchQuery] = useState('');
const [selectedCategory, setSelectedCategory] = useState('');
const [filters, setFilters] = useState({
  city: '',
  budget: '',
  capacity: '',
  date: '',
});
const [showFilters, setShowFilters] = useState(false);
const [isSearching, setIsSearching] = useState(false);
```

## Dummy Function

```javascript
const handleSearch = (filters) => {
  console.log('Search initiated with filters:', filters);
  alert(`Searching with filters: ${JSON.stringify(filters, null, 2)}`);
};
```

## Responsive Breakpoints

- **Mobile (sm)**: 2 category cards per row
- **Tablet (md)**: 2 filter columns, 4 category cards per row  
- **Desktop (lg)**: 4 filter columns, full layout

## Categories

1. **Restaurants** 🍽️ - Orange to Red gradient
2. **Birthday Packages** 🎂 - Pink to Purple gradient
3. **Farmhouses** 🌳 - Green to Emerald gradient
4. **Marquees** 🏢 - Blue to Indigo gradient

## Filter Options

### Cities
Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Lucknow

### Budget Ranges
- Under ₹5,000
- ₹5,000 - ₹15,000  
- ₹15,000 - ₹30,000
- ₹30,000 - ₹50,000
- ₹50,000 - ₹1,00,000
- Above ₹1,00,000

## Usage Example

```jsx
import HomeSearch from './components/HomeSearch';

function App() {
  return <HomeSearch />;
}
```

## Customization

The component is highly customizable:
- **Colors**: Modify gradient classes in category cards
- **Cities**: Update the cities array
- **Budget ranges**: Modify budgetRanges array
- **Icons**: Replace React Icons with custom icons
- **Styling**: Update TailwindCSS classes

## Performance Features

- **Efficient state management** with minimal re-renders
- **Debounced search** simulation with loading states
- **Lazy loading ready** for large datasets
- **Mobile optimized** touch interactions

## Accessibility

- **Proper labels** for all form inputs
- **Keyboard navigation** support
- **Screen reader friendly** with semantic HTML
- **Focus management** for better UX

This component provides a complete foundation for a venue search interface that's both functional and visually appealing!