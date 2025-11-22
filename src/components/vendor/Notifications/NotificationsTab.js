import React, { useState } from 'react';

const NotificationsTab = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    newEnquiries: true,
    enquiryUpdates: true,
    bookingConfirmations: true,
    paymentNotifications: true,
    systemUpdates: false,
    marketingEmails: false
  });

  const [smsNotifications, setSmsNotifications] = useState({
    newEnquiries: false,
    urgentUpdates: false
  });

  const handleEmailToggle = (key) => {
    setEmailNotifications({
      ...emailNotifications,
      [key]: !emailNotifications[key]
    });
  };

  const handleSmsToggle = (key) => {
    setSmsNotifications({
      ...smsNotifications,
      [key]: !smsNotifications[key]
    });
  };

  const handleSave = () => {
    // TODO: Implement API call to save notification preferences
    alert('Notification preferences saved successfully!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-1">
          Manage how you receive notifications about your venues and bookings.
        </p>
      </div>

      {/* Email Notifications */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Email notifications</h2>
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          <NotificationItem
            label="New enquiries"
            description="Get notified when someone sends an enquiry for your venue"
            checked={emailNotifications.newEnquiries}
            onChange={() => handleEmailToggle('newEnquiries')}
          />
          <NotificationItem
            label="Enquiry updates"
            description="Receive updates when clients reply to your messages"
            checked={emailNotifications.enquiryUpdates}
            onChange={() => handleEmailToggle('enquiryUpdates')}
          />
          <NotificationItem
            label="Booking confirmations"
            description="Get notified when a booking is confirmed"
            checked={emailNotifications.bookingConfirmations}
            onChange={() => handleEmailToggle('bookingConfirmations')}
          />
          <NotificationItem
            label="Payment notifications"
            description="Receive alerts about payments and invoices"
            checked={emailNotifications.paymentNotifications}
            onChange={() => handleEmailToggle('paymentNotifications')}
          />
          <NotificationItem
            label="System updates"
            description="Platform updates and maintenance notifications"
            checked={emailNotifications.systemUpdates}
            onChange={() => handleEmailToggle('systemUpdates')}
          />
          <NotificationItem
            label="Marketing emails"
            description="Tips, best practices, and promotional content"
            checked={emailNotifications.marketingEmails}
            onChange={() => handleEmailToggle('marketingEmails')}
          />
        </div>
      </div>

      {/* SMS Notifications */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">SMS notifications</h2>
        <p className="text-sm text-gray-600 mb-4">
          Add your mobile number in Account details to receive SMS notifications.
        </p>
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          <NotificationItem
            label="New enquiries"
            description="Get instant SMS alerts for new enquiries"
            checked={smsNotifications.newEnquiries}
            onChange={() => handleSmsToggle('newEnquiries')}
          />
          <NotificationItem
            label="Urgent updates"
            description="Critical updates that require immediate attention"
            checked={smsNotifications.urgentUpdates}
            onChange={() => handleSmsToggle('urgentUpdates')}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
        >
          Save preferences
        </button>
      </div>
    </div>
  );
};

const NotificationItem = ({ label, description, checked, onChange }) => {
  return (
    <div className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900">{label}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
      </label>
    </div>
  );
};

export default NotificationsTab;
