import React from 'react';
import { 
  FaCalendarAlt, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="h-8 w-8 text-primary-400 mr-3" />
              <span className="text-2xl font-bold">EventHub</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner in finding the perfect venue for every occasion. 
              We connect you with verified venues across India to make your events memorable.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Browse Venues
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  List Your Venue
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaPhone className="h-4 w-4 text-primary-400 mr-3" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="h-4 w-4 text-primary-400 mr-3" />
                <span className="text-gray-300">hello@eventhub.com</span>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="h-4 w-4 text-primary-400 mr-3 mt-1" />
                <span className="text-gray-300">
                  123 Business Park, <br />
                  Mumbai, Maharashtra 400001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h4 className="font-medium text-primary-400 mb-2">Restaurants</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>Fine Dining</li>
                <li>Casual Dining</li>
                <li>Rooftop Restaurants</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-400 mb-2">Party Venues</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>Birthday Parties</li>
                <li>Corporate Events</li>
                <li>Private Parties</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-400 mb-2">Outdoor Venues</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>Farmhouses</li>
                <li>Garden Venues</li>
                <li>Beach Resorts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-400 mb-2">Event Halls</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>Banquet Halls</li>
                <li>Marquees</li>
                <li>Convention Centers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} EventHub. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;