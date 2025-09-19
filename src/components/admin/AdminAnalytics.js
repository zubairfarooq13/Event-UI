import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaBuilding, 
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaTimesCircle,
  FaChartLine,
  FaUserPlus,
  FaHandshake
} from 'react-icons/fa';

const AdminAnalytics = () => {
  // Summary statistics
  const summaryStats = {
    totalBookings: {
      current: 1247,
      previous: 1156,
      change: 7.9,
      trend: 'up'
    },
    activeVendors: {
      current: 89,
      previous: 82,
      change: 8.5,
      trend: 'up'
    },
    pendingVendors: {
      current: 12,
      previous: 18,
      change: -33.3,
      trend: 'down'
    },
    totalUsers: {
      current: 5432,
      previous: 5123,
      change: 6.0,
      trend: 'up'
    }
  };

  // Bookings over time data (monthly)
  const bookingsData = [
    { month: 'Jan 2025', bookings: 85, revenue: 425000 },
    { month: 'Feb 2025', bookings: 92, revenue: 460000 },
    { month: 'Mar 2025', bookings: 78, revenue: 390000 },
    { month: 'Apr 2025', bookings: 105, revenue: 525000 },
    { month: 'May 2025', bookings: 118, revenue: 590000 },
    { month: 'Jun 2025', bookings: 134, revenue: 670000 },
    { month: 'Jul 2025', bookings: 142, revenue: 710000 },
    { month: 'Aug 2025', bookings: 156, revenue: 780000 },
    { month: 'Sep 2025', bookings: 167, revenue: 835000 }
  ];

  // Vendor signups data (monthly)
  const vendorSignupsData = [
    { month: 'Jan', signups: 8, approvals: 6 },
    { month: 'Feb', signups: 12, approvals: 9 },
    { month: 'Mar', signups: 6, approvals: 4 },
    { month: 'Apr', signups: 15, approvals: 12 },
    { month: 'May', signups: 18, approvals: 14 },
    { month: 'Jun', signups: 22, approvals: 18 },
    { month: 'Jul', signups: 19, approvals: 15 },
    { month: 'Aug', signups: 25, approvals: 20 },
    { month: 'Sep', signups: 14, approvals: 10 }
  ];

  // Event types distribution
  const eventTypesData = [
    { name: 'Weddings', value: 45, color: '#8884d8' },
    { name: 'Corporate', value: 25, color: '#82ca9d' },
    { name: 'Birthday', value: 15, color: '#ffc658' },
    { name: 'Anniversary', value: 10, color: '#ff7c7c' },
    { name: 'Others', value: 5, color: '#8dd1e1' }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'booking_confirmed',
      title: 'New booking confirmed',
      description: 'Ahmed Hassan booked Grand Palace for wedding',
      amount: '₹85,000',
      time: '2 hours ago',
      icon: FaCheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 2,
      type: 'vendor_approved',
      title: 'Vendor approved',
      description: 'Crystal Events approved as new vendor',
      time: '4 hours ago',
      icon: FaHandshake,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      type: 'user_registered',
      title: 'New user registered',
      description: 'Fatima Khan joined the platform',
      time: '6 hours ago',
      icon: FaUserPlus,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 4,
      type: 'booking_cancelled',
      title: 'Booking cancelled',
      description: 'Corporate event at Spice Garden cancelled',
      amount: '₹35,000',
      time: '8 hours ago',
      icon: FaTimesCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      id: 5,
      type: 'vendor_signup',
      title: 'New vendor application',
      description: 'Luxury Banquets applied for approval',
      time: '12 hours ago',
      icon: FaBuilding,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      id: 6,
      type: 'booking_confirmed',
      title: 'Booking confirmed',
      description: 'Sarah Ahmad booked Rosewood Farmhouse',
      amount: '₹45,000',
      time: '1 day ago',
      icon: FaCheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Format change percentage
  const formatChange = (change, trend) => {
    const isPositive = trend === 'up';
    return (
      <div className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <FaArrowUp className="w-3 h-3 mr-1" /> : <FaArrowDown className="w-3 h-3 mr-1" />}
        {Math.abs(change)}%
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights into platform performance and user activity</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{summaryStats.totalBookings.current.toLocaleString()}</p>
              {formatChange(summaryStats.totalBookings.change, summaryStats.totalBookings.trend)}
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaCalendarAlt className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Vendors</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{summaryStats.activeVendors.current}</p>
              {formatChange(summaryStats.activeVendors.change, summaryStats.activeVendors.trend)}
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FaBuilding className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Vendors</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{summaryStats.pendingVendors.current}</p>
              {formatChange(summaryStats.pendingVendors.change, summaryStats.pendingVendors.trend)}
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FaClock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{summaryStats.totalUsers.current.toLocaleString()}</p>
              {formatChange(summaryStats.totalUsers.change, summaryStats.totalUsers.trend)}
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaUsers className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section - 2 column layout on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Over Time Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Bookings Over Time</h3>
              <p className="text-sm text-gray-600">Monthly booking trends</p>
            </div>
            <div className="flex items-center text-green-600">
              <FaArrowUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">+12.5%</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vendor Signups Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Vendor Signups</h3>
              <p className="text-sm text-gray-600">Monthly vendor applications vs approvals</p>
            </div>
            <div className="flex items-center text-blue-600">
              <FaArrowUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">+8.2%</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendorSignupsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="signups" fill="#60a5fa" name="Signups" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approvals" fill="#34d399" name="Approvals" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Types Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Event Types Distribution</h3>
              <p className="text-sm text-gray-600">Breakdown of event categories</p>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eventTypesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {eventTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {eventTypesData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              <p className="text-sm text-gray-600">Latest platform activities</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`flex-shrink-0 w-8 h-8 ${activity.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      {activity.amount && (
                        <span className="text-sm font-semibold text-gray-900">{activity.amount}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Key Performance Indicators</h3>
          <p className="text-sm text-gray-600">Important metrics at a glance</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">78%</div>
            <div className="text-sm text-gray-600 mt-1">Booking Conversion Rate</div>
            <div className="flex items-center justify-center mt-2 text-green-600">
              <FaArrowUp className="w-3 h-3 mr-1" />
              <span className="text-xs">+5.2%</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">4.8</div>
            <div className="text-sm text-gray-600 mt-1">Average Rating</div>
            <div className="flex items-center justify-center mt-2 text-green-600">
              <FaArrowUp className="w-3 h-3 mr-1" />
              <span className="text-xs">+0.3</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">₹52K</div>
            <div className="text-sm text-gray-600 mt-1">Average Booking Value</div>
            <div className="flex items-center justify-center mt-2 text-green-600">
              <FaArrowUp className="w-3 h-3 mr-1" />
              <span className="text-xs">+12%</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">24h</div>
            <div className="text-sm text-gray-600 mt-1">Avg Response Time</div>
            <div className="flex items-center justify-center mt-2 text-red-600">
              <FaArrowDown className="w-3 h-3 mr-1" />
              <span className="text-xs">-15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;