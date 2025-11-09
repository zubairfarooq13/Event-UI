import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarCheck, 
  FaCalendarTimes, 
  FaCalendarPlus, 
  FaChartLine,
  FaEye,
  FaArrowUp,
  FaArrowDown,
  FaImages,
  FaBox,
  FaBookOpen,
  FaPlus
} from 'react-icons/fa';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Dummy data for charts
const monthlyBookingsData = [
  { month: 'Jan', bookings: 12, revenue: 150000 },
  { month: 'Feb', bookings: 19, revenue: 230000 },
  { month: 'Mar', bookings: 8, revenue: 100000 },
  { month: 'Apr', bookings: 25, revenue: 320000 },
  { month: 'May', bookings: 22, revenue: 280000 },
  { month: 'Jun', bookings: 30, revenue: 380000 },
  { month: 'Jul', bookings: 35, revenue: 450000 },
  { month: 'Aug', bookings: 28, revenue: 360000 },
  { month: 'Sep', bookings: 15, revenue: 190000 },
  { month: 'Oct', bookings: 20, revenue: 250000 },
  { month: 'Nov', bookings: 18, revenue: 220000 },
  { month: 'Dec', bookings: 24, revenue: 300000 }
];

const bookingStatusData = [
  { name: 'Confirmed', value: 45, color: '#10B981' },
  { name: 'Pending', value: 25, color: '#F59E0B' },
  { name: 'Rejected', value: 8, color: '#EF4444' }
];

const VendorDashboardHome = () => {
  // Summary stats
  const stats = {
    pending: 25,
    confirmed: 45,
    rejected: 8,
    totalRevenue: 3250000,
    monthlyGrowth: 12.5,
    averageBookingValue: 41667
  };

  const StatCard = ({ title, value, icon: Icon, color, trend, trendValue, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
              <span className="ml-1">{trendValue}% from last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          <p className="text-blue-600">
            {`Bookings: ${payload[0].value}`}
          </p>
          <p className="text-green-600">
            {`Revenue: PKR ${payload[1]?.value?.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your venue.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/vendor/add-space"
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            <FaPlus size={16} />
            Add New Space
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <FaEye size={16} />
            View Profile
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Pending Bookings"
          value={stats.pending}
          icon={FaCalendarPlus}
          color="bg-orange-500"
          trend="up"
          trendValue="8.2"
          subtitle="Awaiting confirmation"
        />
        <StatCard
          title="Confirmed Bookings"
          value={stats.confirmed}
          icon={FaCalendarCheck}
          color="bg-green-500"
          trend="up"
          trendValue="15.3"
          subtitle="Successfully booked"
        />
        <StatCard
          title="Rejected Bookings"
          value={stats.rejected}
          icon={FaCalendarTimes}
          color="bg-red-500"
          trend="down"
          trendValue="3.1"
          subtitle="Declined bookings"
        />
        <StatCard
          title="Monthly Revenue"
          value={`PKR ${(stats.totalRevenue / 1000000).toFixed(1)}M`}
          icon={FaChartLine}
          color="bg-blue-500"
          trend="up"
          trendValue="12.5"
          subtitle="This month's earnings"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Monthly Bookings Chart */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Monthly Bookings</h3>
              <p className="text-sm text-gray-600 mt-1">Booking trends over the last 12 months</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Bookings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Revenue</span>
              </div>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyBookingsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  yAxisId="bookings"
                  orientation="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  yAxisId="revenue"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickFormatter={(value) => `${(value/1000)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  yAxisId="bookings"
                  dataKey="bookings" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Booking Status</h3>
            <p className="text-sm text-gray-600 mt-1">Current booking distribution</p>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} bookings`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="mt-4 space-y-2">
            {bookingStatusData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors group">
            <FaImages size={24} className="text-gray-400 group-hover:text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Add Photos</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors group">
            <FaBox size={24} className="text-gray-400 group-hover:text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">New Package</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors group">
            <FaCalendarCheck size={24} className="text-gray-400 group-hover:text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Set Availability</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors group">
            <FaBookOpen size={24} className="text-gray-400 group-hover:text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">View Bookings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboardHome;