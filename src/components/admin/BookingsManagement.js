import React, { useState, useMemo } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaEye,
  FaCalendarAlt,
  FaUser,
  FaBuilding,
  FaBox,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';

const BookingsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCards, setExpandedCards] = useState({});
  const itemsPerPage = 10;

  // Mock bookings data
  const [bookings] = useState([
    {
      id: 1,
      userName: 'Ahmed Hassan',
      userEmail: 'ahmed.hassan@email.com',
      userPhone: '+92 300 1234567',
      vendor: 'Grand Palace Banquet Hall',
      vendorType: 'Marquee',
      package: 'Premium Wedding Package',
      eventDate: '2025-10-15',
      bookingDate: '2025-09-10',
      status: 'Confirmed',
      totalAmount: 85000,
      guestCount: 400,
      eventType: 'Wedding',
      duration: '1 Day',
      paymentStatus: 'Paid'
    },
    {
      id: 2,
      userName: 'Fatima Khan',
      userEmail: 'fatima.khan@email.com',
      userPhone: '+92 321 2345678',
      vendor: 'Rosewood Farmhouse',
      vendorType: 'Farmhouse',
      package: 'Garden Party Package',
      eventDate: '2025-11-20',
      bookingDate: '2025-09-18',
      status: 'Pending',
      totalAmount: 45000,
      guestCount: 150,
      eventType: 'Birthday Party',
      duration: '1 Day',
      paymentStatus: 'Pending'
    },
    {
      id: 3,
      userName: 'Muhammad Ali',
      userEmail: 'muhammad.ali@email.com',
      userPhone: '+92 333 3456789',
      vendor: 'Spice Garden Restaurant',
      vendorType: 'Restaurant',
      package: 'Corporate Dinner Package',
      eventDate: '2025-10-25',
      bookingDate: '2025-09-15',
      status: 'Confirmed',
      totalAmount: 35000,
      guestCount: 80,
      eventType: 'Corporate Event',
      duration: '4 Hours',
      paymentStatus: 'Paid'
    },
    {
      id: 4,
      userName: 'Sarah Ahmad',
      userEmail: 'sarah.ahmad@email.com',
      userPhone: '+92 315 4567890',
      vendor: 'Royal Marquee Events',
      vendorType: 'Marquee',
      package: 'Luxury Celebration Package',
      eventDate: '2025-12-05',
      bookingDate: '2025-09-20',
      status: 'Pending',
      totalAmount: 120000,
      guestCount: 600,
      eventType: 'Wedding',
      duration: '2 Days',
      paymentStatus: 'Partial'
    },
    {
      id: 5,
      userName: 'Omar Sheikh',
      userEmail: 'omar.sheikh@email.com',
      userPhone: '+92 300 5678901',
      vendor: 'Sunset Farmhouse Resort',
      vendorType: 'Farmhouse',
      package: 'Family Reunion Package',
      eventDate: '2025-11-10',
      bookingDate: '2025-09-12',
      status: 'Rejected',
      totalAmount: 55000,
      guestCount: 200,
      eventType: 'Family Event',
      duration: '1 Day',
      paymentStatus: 'Refunded'
    },
    {
      id: 6,
      userName: 'Ayesha Malik',
      userEmail: 'ayesha.malik@email.com',
      userPhone: '+92 301 6789012',
      vendor: 'Urban Bistro & Lounge',
      vendorType: 'Restaurant',
      package: 'Anniversary Celebration',
      eventDate: '2025-10-30',
      bookingDate: '2025-09-17',
      status: 'Confirmed',
      totalAmount: 25000,
      guestCount: 50,
      eventType: 'Anniversary',
      duration: '3 Hours',
      paymentStatus: 'Paid'
    },
    {
      id: 7,
      userName: 'Hassan Raza',
      userEmail: 'hassan.raza@email.com',
      userPhone: '+92 322 7890123',
      vendor: 'Grand Palace Banquet Hall',
      vendorType: 'Marquee',
      package: 'Business Conference Package',
      eventDate: '2025-11-15',
      bookingDate: '2025-09-19',
      status: 'Pending',
      totalAmount: 65000,
      guestCount: 300,
      eventType: 'Conference',
      duration: '1 Day',
      paymentStatus: 'Pending'
    },
    {
      id: 8,
      userName: 'Zara Ahmed',
      userEmail: 'zara.ahmed@email.com',
      userPhone: '+92 334 8901234',
      vendor: 'Rosewood Farmhouse',
      vendorType: 'Farmhouse',
      package: 'Outdoor Wedding Package',
      eventDate: '2025-12-20',
      bookingDate: '2025-09-14',
      status: 'Confirmed',
      totalAmount: 75000,
      guestCount: 250,
      eventType: 'Wedding',
      duration: '1 Day',
      paymentStatus: 'Paid'
    },
    {
      id: 9,
      userName: 'Bilal Khan',
      userEmail: 'bilal.khan@email.com',
      userPhone: '+92 316 9012345',
      vendor: 'Spice Garden Restaurant',
      vendorType: 'Restaurant',
      package: 'Graduation Party Package',
      eventDate: '2025-11-25',
      bookingDate: '2025-09-16',
      status: 'Rejected',
      totalAmount: 18000,
      guestCount: 60,
      eventType: 'Graduation',
      duration: '3 Hours',
      paymentStatus: 'Refunded'
    },
    {
      id: 10,
      userName: 'Sana Tariq',
      userEmail: 'sana.tariq@email.com',
      userPhone: '+92 302 0123456',
      vendor: 'Royal Marquee Events',
      vendorType: 'Marquee',
      package: 'Engagement Ceremony Package',
      eventDate: '2025-10-20',
      bookingDate: '2025-09-11',
      status: 'Confirmed',
      totalAmount: 40000,
      guestCount: 180,
      eventType: 'Engagement',
      duration: '4 Hours',
      paymentStatus: 'Paid'
    },
    {
      id: 11,
      userName: 'Imran Ali',
      userEmail: 'imran.ali@email.com',
      userPhone: '+92 317 1234567',
      vendor: 'Sunset Farmhouse Resort',
      vendorType: 'Farmhouse',
      package: 'Corporate Retreat Package',
      eventDate: '2025-11-30',
      bookingDate: '2025-09-13',
      status: 'Pending',
      totalAmount: 95000,
      guestCount: 120,
      eventType: 'Corporate Retreat',
      duration: '2 Days',
      paymentStatus: 'Partial'
    },
    {
      id: 12,
      userName: 'Nadia Hassan',
      userEmail: 'nadia.hassan@email.com',
      userPhone: '+92 303 2345678',
      vendor: 'Urban Bistro & Lounge',
      vendorType: 'Restaurant',
      package: 'Birthday Celebration Package',
      eventDate: '2025-12-10',
      bookingDate: '2025-09-18',
      status: 'Confirmed',
      totalAmount: 22000,
      guestCount: 45,
      eventType: 'Birthday',
      duration: '3 Hours',
      paymentStatus: 'Paid'
    }
  ]);

  const statusOptions = ['all', 'Pending', 'Confirmed', 'Rejected'];

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesSearch = booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.package.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
      
      const eventDate = new Date(booking.eventDate);
      const matchesDateFrom = !dateFrom || eventDate >= new Date(dateFrom);
      const matchesDateTo = !dateTo || eventDate <= new Date(dateTo);
      
      return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
    });
  }, [bookings, searchTerm, selectedStatus, dateFrom, dateTo]);

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return <FaCheckCircle className="w-3 h-3" />;
      case 'Pending':
        return <FaClock className="w-3 h-3" />;
      case 'Rejected':
        return <FaTimesCircle className="w-3 h-3" />;
      default:
        return <FaClock className="w-3 h-3" />;
    }
  };

  // Toggle card expansion
  const toggleCardExpansion = (bookingId) => {
    setExpandedCards(prev => ({
      ...prev,
      [bookingId]: !prev[bookingId]
    }));
  };

  // Calculate statistics
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    rejected: bookings.filter(b => b.status === 'Rejected').length,
    totalRevenue: bookings.filter(b => b.status === 'Confirmed').reduce((sum, b) => sum + b.totalAmount, 0)
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookings Management</h1>
        <p className="text-gray-600">View and monitor all event bookings across the platform</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
          <div className="text-sm text-gray-600">Confirmed</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">₹{stats.totalRevenue.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="From"
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="To"
            />
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {paginatedBookings.length} of {filteredBookings.length} bookings
        {filteredBookings.length !== bookings.length && ` (filtered from ${bookings.length} total)`}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <FaUser className="w-3 h-3 text-gray-400" />
                        {booking.userName}
                      </div>
                      <div className="text-sm text-gray-500">{booking.userEmail}</div>
                      <div className="text-xs text-gray-400">{booking.userPhone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <FaBuilding className="w-3 h-3 text-gray-400" />
                        {booking.vendor}
                      </div>
                      <div className="text-xs text-gray-500">{booking.vendorType}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <FaBox className="w-3 h-3 text-gray-400" />
                        {booking.package}
                      </div>
                      <div className="text-xs text-gray-500">{booking.eventType} • {booking.guestCount} guests</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(booking.eventDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">{booking.duration}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">₹{booking.totalAmount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{booking.paymentStatus}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors">
                      <FaEye className="mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 mb-6">
        {paginatedBookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <FaUser className="w-4 h-4 text-gray-400" />
                    {booking.userName}
                  </h3>
                  <p className="text-sm text-gray-500">{booking.userEmail}</p>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                  {getStatusIcon(booking.status)}
                  {booking.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-sm">
                  <div className="text-gray-500 flex items-center gap-1">
                    <FaBuilding className="w-3 h-3" />
                    Vendor
                  </div>
                  <div className="font-medium text-gray-900">{booking.vendor}</div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500 flex items-center gap-1">
                    <FaCalendarAlt className="w-3 h-3" />
                    Event Date
                  </div>
                  <div className="font-medium text-gray-900">
                    {new Date(booking.eventDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500 flex items-center gap-1">
                    <FaBox className="w-3 h-3" />
                    Amount
                  </div>
                  <div className="font-medium text-gray-900">₹{booking.totalAmount.toLocaleString()}</div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500">Payment</div>
                  <div className="font-medium text-gray-900">{booking.paymentStatus}</div>
                </div>
              </div>

              <button
                onClick={() => toggleCardExpansion(booking.id)}
                className="flex items-center justify-between w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <span>
                  {expandedCards[booking.id] ? 'Hide Details' : 'Show Details'}
                </span>
                {expandedCards[booking.id] ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {expandedCards[booking.id] && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="text-sm">
                      <div className="text-gray-500">Package</div>
                      <div className="font-medium text-gray-900">{booking.package}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-500">Event Type</div>
                      <div className="font-medium text-gray-900">{booking.eventType}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-500">Guest Count</div>
                      <div className="font-medium text-gray-900">{booking.guestCount} guests</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-500">Duration</div>
                      <div className="font-medium text-gray-900">{booking.duration}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-500">Booking Date</div>
                      <div className="font-medium text-gray-900">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-500">Phone</div>
                      <div className="font-medium text-gray-900">{booking.userPhone}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                      <FaEye className="mr-2" />
                      View Full Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronLeft className="mr-1" />
                Previous
              </button>
              
              <div className="flex items-center space-x-1">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2 text-gray-400">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <FaChevronRight className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No bookings found</div>
          <div className="text-gray-400 text-sm">
            {searchTerm || selectedStatus !== 'all' || dateFrom || dateTo
              ? 'Try adjusting your search or filter criteria'
              : 'No bookings have been made yet'
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsManagement;