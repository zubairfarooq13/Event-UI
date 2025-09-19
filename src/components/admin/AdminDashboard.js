import React, { useState } from 'react';
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaChartLine,
  FaUserTie,
  FaBuilding,
  FaSignOutAlt,
  FaBell,
  FaCog,
  FaHome,
  FaCheckCircle
} from 'react-icons/fa';
import VendorApprovals from './VendorApprovals';
import ManageListings from './ManageListings';
import BookingsManagement from './BookingsManagement';

const AdminDashboard = ({ adminUser, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  // Mock dashboard data
  const dashboardStats = {
    totalUsers: 1247,
    totalVendors: 89,
    totalBookings: 324,
    totalRevenue: 125430,
    pendingApprovals: 12,
    activeEvents: 45
  };

  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      message: 'New user registered: John Doe',
      time: '2 minutes ago',
      icon: FaUsers,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'vendor_approval',
      message: 'Vendor "Elite Events" pending approval',
      time: '15 minutes ago',
      icon: FaBuilding,
      color: 'text-yellow-600'
    },
    {
      id: 3,
      type: 'booking_confirmed',
      message: 'Booking #BK001 confirmed for $2,500',
      time: '1 hour ago',
      icon: FaCalendarAlt,
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'payment_received',
      message: 'Payment received: $1,800',
      time: '2 hours ago',
      icon: FaDollarSign,
      color: 'text-green-600'
    }
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  // Navigation function
  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  // Render different views based on currentView
  if (currentView === 'vendor-approvals') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Back Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaHome className="w-4 h-4" />
                  <span className="text-sm font-medium">Back to Dashboard</span>
                </button>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Vendor Approvals</h1>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{adminUser?.name || 'Admin'}</p>
                    <p className="text-xs text-gray-500 capitalize">{adminUser?.role?.replace('_', ' ') || 'Administrator'}</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUserTie className="w-4 h-4 text-blue-600" />
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Vendor Approvals Component */}
        <VendorApprovals />
      </div>
    );
  }

  // Render ManageListings view
  if (currentView === 'manage-listings') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Back Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaHome className="w-4 h-4" />
                  <span className="text-sm font-medium">Back to Dashboard</span>
                </button>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Manage Listings</h1>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{adminUser?.name || 'Admin'}</p>
                    <p className="text-xs text-gray-500 capitalize">{adminUser?.role?.replace('_', ' ') || 'Administrator'}</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUserTie className="w-4 h-4 text-blue-600" />
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ManageListings Component */}
        <ManageListings />
      </div>
    );
  }

  // Render BookingsManagement view
  if (currentView === 'bookings-management') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Back Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaHome className="w-4 h-4" />
                  <span className="text-sm font-medium">Back to Dashboard</span>
                </button>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Bookings Management</h1>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{adminUser?.name || 'Admin'}</p>
                    <p className="text-xs text-gray-500 capitalize">{adminUser?.role?.replace('_', ' ') || 'Administrator'}</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUserTie className="w-4 h-4 text-blue-600" />
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* BookingsManagement Component */}
        <BookingsManagement />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
                <FaBell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <FaCog className="w-5 h-5" />
              </button>

              {/* User Info */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{adminUser?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500 capitalize">{adminUser?.role?.replace('_', ' ') || 'Administrator'}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUserTie className="w-4 h-4 text-blue-600" />
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {adminUser?.name || 'Admin'}!
          </h2>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your platform today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalVendors}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FaBuilding className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalBookings}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaCalendarAlt className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${dashboardStats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FaDollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div 
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleNavigation('vendor-approvals')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.pendingApprovals}</p>
                <p className="text-xs text-blue-600 mt-1">Click to review →</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <FaBell className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Events</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.activeEvents}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <FaChartLine className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-gray-100`}>
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FaUsers className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Manage Users</span>
                </button>

                <button 
                  onClick={() => handleNavigation('vendor-approvals')}
                  className="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FaCheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Vendor Approvals</span>
                </button>

                <button 
                  onClick={() => handleNavigation('manage-listings')}
                  className="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <FaBuilding className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Manage Listings</span>
                </button>

                <button 
                  onClick={() => handleNavigation('bookings-management')}
                  className="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <FaCalendarAlt className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">View Bookings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;