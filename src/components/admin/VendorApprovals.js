import React, { useState } from 'react';
import { FaCheck, FaTimes, FaSearch, FaFilter, FaEye, FaTrash } from 'react-icons/fa';

const VendorApprovals = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusinessType, setSelectedBusinessType] = useState('all');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [vendorToReject, setVendorToReject] = useState(null);

  // Mock data for pending vendors
  const [pendingVendors, setPendingVendors] = useState([
    {
      id: 1,
      name: 'Elite Events Co.',
      email: 'contact@eliteevents.com',
      businessType: 'Event Planning',
      appliedDate: '2025-09-15',
      phone: '+1 (555) 123-4567',
      description: 'Full-service event planning and coordination company'
    },
    {
      id: 2,
      name: 'Golden Banquet Hall',
      email: 'info@goldenhall.com',
      businessType: 'Venue',
      appliedDate: '2025-09-18',
      phone: '+1 (555) 234-5678',
      description: 'Luxury banquet hall for weddings and corporate events'
    },
    {
      id: 3,
      name: 'Bloom & Blossom',
      email: 'hello@bloomblossom.com',
      businessType: 'Decoration',
      appliedDate: '2025-09-19',
      phone: '+1 (555) 345-6789',
      description: 'Wedding and event decoration specialists'
    },
    {
      id: 4,
      name: 'Melody Makers',
      email: 'bookings@melodymakers.com',
      businessType: 'Entertainment',
      appliedDate: '2025-09-14',
      phone: '+1 (555) 456-7890',
      description: 'Live music and DJ services for all occasions'
    },
    {
      id: 5,
      name: 'Gourmet Catering Plus',
      email: 'orders@gourmetplus.com',
      businessType: 'Catering',
      appliedDate: '2025-09-16',
      phone: '+1 (555) 567-8901',
      description: 'Premium catering services with international cuisine'
    }
  ]);

  // Mock data for approved vendors
  const [approvedVendors, setApprovedVendors] = useState([
    {
      id: 101,
      name: 'Premier Wedding Venues',
      email: 'admin@premierweddings.com',
      businessType: 'Venue',
      approvedDate: '2025-08-25',
      status: 'Active',
      totalBookings: 45
    },
    {
      id: 102,
      name: 'Delicious Delights Catering',
      email: 'info@deliciousdelights.com',
      businessType: 'Catering',
      approvedDate: '2025-08-30',
      status: 'Active',
      totalBookings: 78
    },
    {
      id: 103,
      name: 'Sparkle & Shine Decorations',
      email: 'contact@sparkleshine.com',
      businessType: 'Decoration',
      approvedDate: '2025-09-02',
      status: 'Active',
      totalBookings: 32
    },
    {
      id: 104,
      name: 'Crystal Palace Events',
      email: 'bookings@crystalpalace.com',
      businessType: 'Event Planning',
      approvedDate: '2025-09-05',
      status: 'Suspended',
      totalBookings: 15
    }
  ]);

  const businessTypes = ['all', 'Event Planning', 'Venue', 'Catering', 'Decoration', 'Entertainment'];

  // Filter vendors based on search and business type
  const filterVendors = (vendors) => {
    return vendors.filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedBusinessType === 'all' || vendor.businessType === selectedBusinessType;
      return matchesSearch && matchesType;
    });
  };

  const filteredPendingVendors = filterVendors(pendingVendors);
  const filteredApprovedVendors = filterVendors(approvedVendors);

  // Handle approve vendor
  const handleApprove = (vendor) => {
    // Remove from pending
    setPendingVendors(prev => prev.filter(v => v.id !== vendor.id));
    
    // Add to approved
    const approvedVendor = {
      ...vendor,
      id: Date.now(), // Generate new ID for approved list
      approvedDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      totalBookings: 0
    };
    setApprovedVendors(prev => [approvedVendor, ...prev]);
  };

  // Handle reject vendor (show confirmation modal)
  const handleRejectClick = (vendor) => {
    setVendorToReject(vendor);
    setShowConfirmModal(true);
  };

  // Confirm reject vendor
  const confirmReject = () => {
    if (vendorToReject) {
      setPendingVendors(prev => prev.filter(v => v.id !== vendorToReject.id));
    }
    setShowConfirmModal(false);
    setVendorToReject(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Approvals</h1>
        <p className="text-gray-600">Review and manage vendor applications</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Vendors ({pendingVendors.length})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'approved'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Approved Vendors ({approvedVendors.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-400" />
          <select
            value={selectedBusinessType}
            onChange={(e) => setSelectedBusinessType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {businessTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'pending' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPendingVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                        <div className="text-sm text-gray-500">{vendor.email}</div>
                        <div className="text-xs text-gray-400 mt-1">{vendor.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {vendor.businessType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(vendor.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleApprove(vendor)}
                          className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 transition-colors"
                        >
                          <FaCheck className="mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectClick(vendor)}
                          className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 transition-colors"
                        >
                          <FaTimes className="mr-1" />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredPendingVendors.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">No pending vendors found</div>
                <div className="text-gray-400 text-sm">
                  {searchTerm || selectedBusinessType !== 'all' 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'All vendor applications have been processed'
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'approved' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bookings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approved Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApprovedVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                        <div className="text-sm text-gray-500">{vendor.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {vendor.businessType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        vendor.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {vendor.totalBookings}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(vendor.approvedDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredApprovedVendors.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">No approved vendors found</div>
                <div className="text-gray-400 text-sm">
                  {searchTerm || selectedBusinessType !== 'all' 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'No vendors have been approved yet'
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FaTrash className="text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Reject Vendor Application</h3>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Are you sure you want to reject the application from{' '}
                <span className="font-medium text-gray-900">{vendorToReject?.name}</span>?
                This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 transition-colors"
              >
                Reject Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorApprovals;