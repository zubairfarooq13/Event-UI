import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import PackageCard from './PackageCard';
import AddPackageForm from './AddPackageForm';

const PackageManagement = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, inactive
  const [sortBy, setSortBy] = useState('title'); // title, price, created
  const [deletingPackageId, setDeletingPackageId] = useState(null);

  // Mock data - in real app this would come from API
  const mockPackages = [
    {
      id: 1,
      title: 'Wedding Premium Package',
      description: 'Complete wedding venue package including decoration, catering setup, sound system, and dedicated event coordinator. Perfect for memorable celebrations.',
      price: 2500,
      features: ['Full venue access', 'Decoration setup', 'Sound system', 'Event coordinator', 'Catering support', 'Photography area'],
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Corporate Event Package',
      description: 'Professional business event setup with presentation equipment, networking areas, and corporate catering options.',
      price: 1800,
      features: ['AV equipment', 'Presentation setup', 'Networking area', 'Corporate catering', 'Parking'],
      isActive: true,
      createdAt: '2024-02-01'
    },
    {
      id: 3,
      title: 'Birthday Celebration Package',
      description: 'Fun and festive birthday party package with decorations, entertainment area, and party essentials.',
      price: 800,
      features: ['Party decorations', 'Entertainment area', 'Sound system', 'Cake table', 'Party supplies'],
      isActive: false,
      createdAt: '2024-01-20'
    },
    {
      id: 4,
      title: 'Anniversary Special Package',
      description: 'Romantic anniversary celebration package with elegant decorations, ambient lighting, and special dining setup.',
      price: 1200,
      features: ['Romantic decorations', 'Ambient lighting', 'Special dining setup', 'Music playlist', 'Flower arrangements'],
      isActive: true,
      createdAt: '2024-02-10'
    }
  ];

  // Load initial data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPackages(mockPackages);
      setFilteredPackages(mockPackages);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort packages
  useEffect(() => {
    let filtered = [...packages];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(pkg =>
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(pkg => 
        filterStatus === 'active' ? pkg.isActive : !pkg.isActive
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredPackages(filtered);
  }, [packages, searchTerm, filterStatus, sortBy]);

  const handleAddPackage = async (packageData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newPackage = {
        ...packageData,
        id: Math.max(...packages.map(p => p.id)) + 1,
        createdAt: new Date().toISOString().split('T')[0]
      };

      setPackages(prev => [...prev, newPackage]);
      setShowAddForm(false);
      setEditingPackage(null);
    } catch (error) {
      console.error('Error adding package:', error);
      alert('Failed to add package. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPackage = async (packageData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedPackage = {
        ...editingPackage,
        ...packageData,
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setPackages(prev => 
        prev.map(pkg => pkg.id === editingPackage.id ? updatedPackage : pkg)
      );
      setShowAddForm(false);
      setEditingPackage(null);
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Failed to update package. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePackage = async (packageId) => {
    setDeletingPackageId(packageId);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPackages(prev => prev.filter(pkg => pkg.id !== packageId));
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Failed to delete package. Please try again.');
    } finally {
      setDeletingPackageId(null);
    }
  };

  const handleEditClick = (pkg) => {
    setEditingPackage(pkg);
    setShowAddForm(true);
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingPackage(null);
  };

  const handleSavePackage = (packageData) => {
    if (editingPackage) {
      handleEditPackage(packageData);
    } else {
      handleAddPackage(packageData);
    }
  };

  if (isLoading && packages.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          <span>Loading packages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Package Management</h1>
          <p className="text-gray-600 mt-1">Create and manage your event packages</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          disabled={showAddForm}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <FaPlus className="w-4 h-4" />
          Add New Package
        </button>
      </div>

      {/* Add/Edit Package Form */}
      {showAddForm && (
        <AddPackageForm
          onSave={handleSavePackage}
          onCancel={handleCancelForm}
          editingPackage={editingPackage}
          isLoading={isLoading}
        />
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FaFilter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <FaSort className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="title">Sort by Title</option>
              <option value="price">Sort by Price</option>
              <option value="created">Sort by Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Package Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{packages.length}</div>
          <div className="text-sm text-gray-600">Total Packages</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {packages.filter(p => p.isActive).length}
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">
            {packages.filter(p => !p.isActive).length}
          </div>
          <div className="text-sm text-gray-600">Inactive</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            ${packages.reduce((sum, p) => sum + (p.isActive ? p.price : 0), 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Active Value</div>
        </div>
      </div>

      {/* Packages Grid */}
      {filteredPackages.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No packages found</div>
          <p className="text-gray-600">
            {searchTerm || filterStatus !== 'all' ? 
              'Try adjusting your search or filters' : 
              'Create your first package to get started'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              onEdit={handleEditClick}
              onDelete={handleDeletePackage}
              isDeleting={deletingPackageId === pkg.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageManagement;