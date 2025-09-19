# Event UI - React Component Library

A comprehensive collection of responsive React components for event management applications built with TailwindCSS.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone and install dependencies
cd Event-UI
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3001` (or the next available port).

## 📱 Components Overview

### 1. Authentication Components (`src/components/auth/`)

#### LoginSignup Component
- **Purpose**: Complete authentication flow with phone and OTP verification
- **Features**:
  - Phone number validation (Indian format)
  - OTP input with auto-focus
  - Social login options (Google, Facebook, Apple)
  - Responsive design with mobile-first approach
  - Form validation using React Hook Form and Yup

### 2. Home & Search Components (`src/components/home/`)

#### HomeSearch Component
- **Purpose**: Main search interface with category browsing and filtering
- **Features**:
  - Search bar with location input
  - Category cards with gradient designs
  - Advanced filter options (price, rating, amenities)
  - Responsive grid layout
  - Collapsible filter section

### 3. Listing Components (`src/components/listing/`)

#### ListingDetail Component
- **Purpose**: Detailed venue information with booking capabilities
- **Features**:
  - Photo carousel with navigation
  - Package selection with pricing
  - Amenities and vendor information
  - Responsive design for mobile and desktop
  - Favorite and share functionality
  - Navigation to booking flow

### 4. Booking Components (`src/components/booking/`)

#### BookingFlow Component
- **Purpose**: Multi-step booking process with comprehensive form handling
- **Features**:
  - 3-step process: Date Selection → Package Selection → Confirmation
  - Stepper navigation with progress indication
  - Calendar integration for date selection
  - Package comparison and selection
  - Guest count and special requirements
  - Form validation per step
  - Responsive stepper (vertical on mobile, horizontal on desktop)

### 5. Common/Reusable Components (`src/components/common/`)

#### Stepper Component
- Configurable steps with titles and descriptions
- Clickable navigation (if enabled)
- Completion status indicators
- Responsive layout adaptation

#### Button Component
- Multiple variants: primary, secondary, outline, ghost, danger
- Loading states with spinner
- Icon support
- Size variations (sm, md, lg)

#### Card Component
- Configurable padding, shadows, and border radius
- Hover effects
- Click handling

#### Calendar Component
- Month/year navigation
- Date restrictions and disabled dates
- Selection handling
- Visual state indicators

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (`primary-50` to `primary-900`)
- **Secondary**: Purple gradient
- **Success**: Green shades
- **Warning**: Yellow/Orange shades
- **Error**: Red shades

### Responsive Breakpoints
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `1024px - 1280px`
- **Large Desktop**: `> 1280px`

## 🔧 Technical Stack

- **React 18**: Core framework with hooks
- **TailwindCSS 3.3.6**: Utility-first CSS framework
- **React Hook Form 7.45.4**: Form management and validation
- **Yup 1.3.2**: Schema validation
- **React Icons 4.10.1**: Icon library

## 📂 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── LoginSignup.js
│   ├── home/
│   │   └── HomeSearch.js
│   ├── listing/
│   │   └── ListingDetail.js
│   ├── booking/
│   │   └── BookingFlow.js
│   └── common/
│       ├── Stepper.js
│       ├── Button.js
│       ├── Card.js
│       └── Calendar.js
├── App.js
└── index.css
```

## 🚀 Navigation Flow

1. **Home Screen** - Browse categories and search venues
2. **Listing Detail** - View venue details and packages  
3. **Booking Flow** - Complete booking process
4. **Authentication** - Login/signup when needed

## 🎯 Key Features

- ✅ Fully responsive design
- ✅ Form validation and error handling
- ✅ Loading states and user feedback
- ✅ Accessibility considerations
- ✅ Modern UI/UX patterns
- ✅ Component reusability
- ✅ Clean code architecture
- ✅ Dummy data for demonstration

## 📱 Mobile Responsiveness

- **Mobile-first design approach**
- **Touch-friendly interfaces**  
- **Optimized layouts for small screens**
- **Collapsible sections and drawers**

---

Built with ❤️ for modern event management applications.