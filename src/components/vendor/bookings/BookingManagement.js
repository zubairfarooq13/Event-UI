import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaCalendarAlt, 
  FaDownload,
  FaChartBar
} from 'react-icons/fa';
import BookingTable from './BookingTable';
import BookingPagination from './BookingPagination';
import BookingStatusBadge from './BookingStatusBadge';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingBookingId, setLoadingBookingId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  
  const itemsPerPage = 10;

  // Mock booking data
  const mockBookings = [
    {
      id: 1,
      customerName: 'Ahmed Khan',
      customerEmail: 'ahmed.khan@email.com',
      eventType: 'Wedding',
      date: '2025-10-15',
      guests: 500,
      amount: 2500,
      status: 'pending',
      package: 'Wedding Premium Package',
      duration: 8,
      phone: '+1-555-0123',
      createdAt: '2025-09-18'
    },
    {
      id: 2,
      customerName: 'Sara Ali',
      customerEmail: 'sara.ali@email.com',
      eventType: 'Birthday Party',
      date: '2025-09-28',
      guests: 100,
      amount: 800,
      status: 'confirmed',
      package: 'Birthday Special Package',
      duration: 4,
      phone: '+1-555-0124',
      createdAt: '2025-09-15'
    },
    {
      id: 3,
      customerName: 'Tech Corp Ltd',
      customerEmail: 'events@techcorp.com',
      eventType: 'Corporate Event',
      date: '2025-10-05',
      guests: 200,
      amount: 1800,
      status: 'pending',
      package: 'Corporate Event Package',
      duration: 6,
      phone: '+1-555-0125',
      createdAt: '2025-09-10'
    },
    {
      id: 4,
      customerName: 'Fatima Sheikh',
      customerEmail: 'fatima.sheikh@email.com',
      eventType: 'Anniversary',
      date: '2025-09-22',
      guests: 150,
      amount: 1200,
      status: 'rejected',
      package: 'Anniversary Special Package',
      duration: 5,
      phone: '+1-555-0126',
      createdAt: '2025-09-08'
    },
    {
      id: 5,
      customerName: 'Michael Johnson',
      customerEmail: 'mike.johnson@email.com',
      eventType: 'Graduation Party',
      date: '2025-11-20',
      guests: 80,
      amount: 750,
      status: 'pending',
      package: 'Basic Event Package',
      duration: 4,
      phone: '+1-555-0127',
      createdAt: '2025-09-19'
    },
    {
      id: 6,
      customerName: 'Lisa Chen',
      customerEmail: 'lisa.chen@email.com',
      eventType: 'Baby Shower',
      date: '2025-10-30',
      guests: 60,
      amount: 600,
      status: 'confirmed',
      package: 'Basic Event Package',
      duration: 3,
      phone: '+1-555-0128',
      createdAt: '2025-09-12'
    },
    {
      id: 7,
      customerName: 'Robert Williams',
      customerEmail: 'robert.w@email.com',
      eventType: 'Retirement Party',
      date: '2025-11-15',
      guests: 120,
      amount: 950,
      status: 'pending',
      package: 'Corporate Event Package',
      duration: 4,
      phone: '+1-555-0129',
      createdAt: '2025-09-16'
    },
    {
      id: 8,
      customerName: 'Emma Davis',
      customerEmail: 'emma.davis@email.com',
      eventType: 'Wedding Reception',
      date: '2025-12-05',
      guests: 300,
      amount: 2200,
      status: 'confirmed',
      package: 'Wedding Premium Package',
      duration: 7,
      phone: '+1-555-0130',
      createdAt: '2025-09-14'
    },
    {
      id: 9,
      customerName: 'David Brown',
      customerEmail: 'david.brown@email.com',
      eventType: 'Charity Gala',
      date: '2025-11-08',
      guests: 250,
      amount: 2000,
      status: 'pending',
      package: 'Corporate Event Package',
      duration: 6,
      phone: '+1-555-0131',
      createdAt: '2025-09-11'
    },
    {
      id: 10,
      customerName: 'Jennifer Miller',
      customerEmail: 'jennifer.m@email.com',
      eventType: 'Family Reunion',
      date: '2025-10-18',
      guests: 90,
      amount: 720,
      status: 'rejected',
      package: 'Basic Event Package',
      duration: 5,
      phone: '+1-555-0132',
      createdAt: '2025-09-09'
    },
    {
      id: 11,
      customerName: 'Christopher Wilson',
      customerEmail: 'chris.wilson@email.com',
      eventType: 'Product Launch',
      date: '2025-11-25',
      guests: 180,
      amount: 1600,
      status: 'pending',
      package: 'Corporate Event Package',
      duration: 5,
      phone: '+1-555-0133',
      createdAt: '2025-09-17'
    },
    {
      id: 12,
      customerName: 'Amanda Garcia',
      customerEmail: 'amanda.garcia@email.com',
      eventType: 'Sweet 16',
      date: '2025-10-12',
      guests: 85,
      amount: 680,
      status: 'confirmed',
      package: 'Birthday Special Package',
      duration: 4,
      phone: '+1-555-0134',
      createdAt: '2025-09-13'
    }
  ];

  // Load initial data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter bookings based on search and status
  useEffect(() => {
    let filtered = [...bookings];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.package.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [bookings, searchTerm, statusFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  // Calculate statistics
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    rejected: bookings.filter(b => b.status === 'rejected').length,
    totalRevenue: bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.amount, 0)
  };

  // Handle booking actions
  const handleAcceptBooking = async (bookingId) => {
    setLoadingBookingId(bookingId);
    setLoadingAction('accept');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'confirmed' }
            : booking
        )
      );
    } catch (error) {
      console.error('Error accepting booking:', error);
      alert('Failed to accept booking. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingBookingId(null);
      setLoadingAction(null);
    }
  };

  const handleRejectBooking = async (bookingId) => {
    setLoadingBookingId(bookingId);
    setLoadingAction('reject');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'rejected' }
            : booking
        )
      );
    } catch (error) {
      console.error('Error rejecting booking:', error);
      alert('Failed to reject booking. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingBookingId(null);
      setLoadingAction(null);
    }
  };

  const handleViewBooking = (booking) => {
    // In a real app, this would open a detailed view modal or navigate to a detail page
    alert(`Viewing booking details for ${booking.customerName}\n\nEvent: ${booking.eventType}\nDate: ${new Date(booking.date).toLocaleDateString()}\nGuests: ${booking.guests}\nAmount: $${booking.amount.toLocaleString()}`);
  };

  if (isLoading && bookings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          <span>Loading bookings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-600 mt-1">Manage and track your venue bookings</p>
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FaDownload className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FaChartBar className="w-4 h-4" />
            <span className="hidden sm:inline">Reports</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 col-span-2 sm:col-span-1">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Revenue</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer name, email, event type, or package..."
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || statusFilter !== 'all') && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Search: "{searchTerm}"
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                Status: <BookingStatusBadge status={statusFilter} size="small" />
                <button 
                  onClick={() => setStatusFilter('all')}
                  className="text-gray-600 hover:text-gray-800 ml-1"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Booking Table */}
      <BookingTable
        bookings={currentBookings}
        onAcceptBooking={handleAcceptBooking}
        onRejectBooking={handleRejectBooking}
        onViewBooking={handleViewBooking}
        isLoading={isLoading}
        loadingBookingId={loadingBookingId}
        loadingAction={loadingAction}
      />

      {/* Pagination */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <BookingPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredBookings.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default BookingManagement;