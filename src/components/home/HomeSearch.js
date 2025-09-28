import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import CategoryBrowser from './CategoryBrowser';
import SearchFilters from './SearchFilters';
import QuickStats from './QuickStats';
import Footer from './Footer';
import { venueService } from '../../services';
import './HomeSearch.css';

const HomeSearch = ({ onSearch, currentView, setCurrentView, user, onLogout, onAdminAccess }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    eventType: '',
    budget: '',
    capacity: '',
  });
  const [isSearching, setIsSearching] = useState(false);

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Clear category selection
  const handleClearCategory = () => {
    setSelectedCategory('');
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      city: '',
      eventType: '',
      budget: '',
      capacity: '',
    });
  };

  // Handle search submission
  const handleSearchSubmit = async (searchData) => {
    setIsSearching(true);
    
    const searchFilters = searchData || {
      category: selectedCategory,
      ...filters
    };

    try {
      // Call backend service to search venues
      const result = await venueService.searchVenues(searchFilters);
      
      if (result.success) {
        // Store search results and filters in localStorage for the listing page
        localStorage.setItem('searchResults', JSON.stringify(result.data));
        localStorage.setItem('searchFilters', JSON.stringify(searchFilters));
        
        // Navigate to listings page with search parameters
        const searchParams = new URLSearchParams();
        if (searchFilters.category) searchParams.append('category', searchFilters.category);
        if (searchFilters.city) searchParams.append('city', searchFilters.city);
        if (searchFilters.eventType) searchParams.append('eventType', searchFilters.eventType);
        if (searchFilters.budget) searchParams.append('budget', searchFilters.budget);
        if (searchFilters.capacity) searchParams.append('capacity', searchFilters.capacity);
        
        navigate(`/venues?${searchParams.toString()}`);
      } else {
        // Handle search error
        console.error('Search failed:', result.error);
        alert(`Search failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Search failed:', error);
      alert('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="home-search-landing">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onLogout={onLogout}
        onAdminAccess={onAdminAccess}
      />
      
      <SearchFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        selectedCategory={selectedCategory}
        onClearCategory={handleClearCategory}
        onSearch={handleSearchSubmit}
      />

      <CategoryBrowser 
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      
      <QuickStats />
      
      <Footer />
    </div>
  );
};

export default HomeSearch;