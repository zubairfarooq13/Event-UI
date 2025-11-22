import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { FaUpload } from 'react-icons/fa';

const AccountDetailsTab = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || 'Zubair',
    lastName: user?.name?.split(' ')[1] || 'Farooq',
    email: user?.email || 'zubair.farooq@hotmail.com',
    contactNumber: user?.phone || '+923365929305',
    smsNumber: '',
    smsCountryCode: '+92'
  });

  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // TODO: Implement API call to update account details
    alert('Account details updated successfully!');
  };

  const handleChangePassword = () => {
    // TODO: Implement change password functionality
    alert('Change password functionality coming soon!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // TODO: Implement delete account functionality
      alert('Delete account functionality coming soon!');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My account</h1>
      </div>

      {/* Profile Photo Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Profile photo</h2>
        <p className="text-sm text-gray-600 mb-4">
          Photos are proven to increase conversions, as customers like to connect with real people.
        </p>
        
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <FaUpload className="text-gray-400" size={32} />
            )}
          </div>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <span className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium inline-block">
              Upload photo
            </span>
          </label>
        </div>
      </div>

      {/* Contact Details Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">My contact details</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please remember to keep your details up to date.
        </p>

        <form onSubmit={handleSaveChanges} className="space-y-6 max-w-2xl">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                disabled
              />
              <button
                type="button"
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Contact Number for Clients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact number for clients
            </label>
            <div className="flex gap-2">
              <select
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              >
                <option value="+92">🇵🇰 +92</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
              </select>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber.replace('+92', '')}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              We'll show this number only to clients who send an enquiry. It won't be visible on your public profile.
            </p>
          </div>

          {/* Mobile Number for SMS Notifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile number for SMS notifications{' '}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="flex gap-2">
              <select
                name="smsCountryCode"
                value={formData.smsCountryCode}
                onChange={handleChange}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              >
                <option value="+92">🇵🇰 +92</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
              </select>
              <input
                type="tel"
                name="smsNumber"
                value={formData.smsNumber}
                onChange={handleChange}
                placeholder="Mobile phone number"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              We'll use this number to send you SMS messages. You can manage your preferences in{' '}
              <span className="text-teal-600 cursor-pointer hover:underline">Notifications</span>.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={handleChangePassword}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Change password
            </button>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="px-6 py-2 bg-white border border-gray-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
            >
              Delete account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDetailsTab;
