import React, { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaBox, 
  FaCheckCircle, 
  FaChevronLeft,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import Stepper from '../common/Stepper';
import Button from '../common/Button';
import Card from '../common/Card';
import Calendar from '../common/Calendar';

// Sample venue data (would typically be passed as props)
const venueData = {
  id: 1,
  name: "Royal Gardens Banquet Hall",
  location: "Bandra West, Mumbai",
  vendor: "Elite Events & Venues",
  image: "https://images.unsplash.com/photo-1519167758481-83f29da73fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
};

// Sample packages data
const packagesData = [
  {
    id: 1,
    title: "Basic Package",
    description: "Perfect for intimate gatherings. Includes basic decoration, sound system, and seating arrangement for up to 100 guests.",
    price: 25000,
    priceLabel: "₹25,000",
    features: ["Basic Decoration", "Sound System", "Seating for 100", "4 Hours Duration"],
    maxGuests: 100
  },
  {
    id: 2,
    title: "Premium Package", 
    description: "Ideal for medium-sized events. Enhanced decoration, catering options, and extended venue access for up to 250 guests.",
    price: 65000,
    priceLabel: "₹65,000",
    features: ["Premium Decoration", "Catering Service", "Seating for 250", "6 Hours Duration", "Photography"],
    maxGuests: 250
  },
  {
    id: 3,
    title: "Luxury Package",
    description: "The ultimate celebration experience. Full-service planning, gourmet catering, and premium amenities for up to 500 guests.",
    price: 125000,
    priceLabel: "₹1,25,000", 
    features: ["Luxury Decoration", "Gourmet Catering", "Seating for 500", "Full Day Access", "Photography & Videography", "Event Coordinator"],
    maxGuests: 500
  }
];

// Dummy function as requested
const handleBookingSubmit = (data) => {
  console.log('Booking submitted with data:', data);
  alert(`Booking Request Submitted!\n\nVenue: ${data.venue.name}\nDate: ${data.date.toLocaleDateString()}\nPackage: ${data.package.title}\nPrice: ${data.package.priceLabel}\n\nWe'll contact you shortly to confirm your booking!`);
};

// Stepper configuration
const steps = [
  {
    title: 'Select Date',
    description: 'Choose your event date'
  },
  {
    title: 'Choose Package', 
    description: 'Select the perfect package'
  },
  {
    title: 'Confirm Details',
    description: 'Review and confirm'
  }
];

const BookingFlow = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get disabled dates (example: weekdays disabled for demo)
  const getDisabledDates = () => {
    const disabled = [];
    const today = new Date();
    // Disable past dates and some random dates for demo
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Disable some Mondays and Tuesdays as example
      if (date.getDay() === 1 || date.getDay() === 2) {
        disabled.push(date);
      }
    }
    return disabled;
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
    } else if (stepIndex === 1 && selectedDate) {
      setCurrentStep(1);
    } else if (stepIndex === 2 && selectedDate && selectedPackage) {
      setCurrentStep(2);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedFromStep = (step) => {
    switch (step) {
      case 0: return selectedDate !== null;
      case 1: return selectedPackage !== null;
      case 2: return true;
      default: return false;
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    const bookingData = {
      venue: venueData,
      date: selectedDate,
      package: selectedPackage,
      timestamp: new Date()
    };

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      handleBookingSubmit(bookingData);
      
      // Reset form after successful submission
      setCurrentStep(0);
      setSelectedDate(null);
      setSelectedPackage(null);
    } catch (error) {
      console.error('Booking submission failed:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <FaCalendarAlt className="mx-auto h-12 w-12 text-primary-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Event Date</h2>
              <p className="text-gray-600">Choose the perfect date for your celebration</p>
            </div>

            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              minDate={new Date()}
              disabledDates={getDisabledDates()}
              className="mb-6"
            />

            {selectedDate && (
              <div className="text-center p-4 bg-primary-50 rounded-lg mb-4">
                <p className="text-primary-800 font-medium">
                  Selected Date: {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            )}
          </Card>
        );

      case 1:
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <FaBox className="mx-auto h-12 w-12 text-primary-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Package</h2>
              <p className="text-gray-600">Select the package that best fits your event needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packagesData.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedPackage?.id === pkg.id
                      ? 'border-primary-500 bg-primary-50 transform scale-105'
                      : 'hover:shadow-lg hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{pkg.title}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">{pkg.priceLabel}</div>
                      <div className="text-sm text-gray-500">per event</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{pkg.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-500 border-t border-gray-200 pt-4">
                    <strong>Max Capacity:</strong> {pkg.maxGuests} guests
                  </div>

                  {selectedPackage?.id === pkg.id && (
                    <div className="mt-4 p-3 bg-primary-100 border border-primary-200 rounded-lg">
                      <p className="text-primary-800 font-medium text-sm flex items-center">
                        <FaCheckCircle className="mr-2" />
                        Selected Package
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <FaCheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Booking</h2>
              <p className="text-gray-600">Please review your booking details before submitting</p>
            </div>

            <Card className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>
              
              {/* Venue Details */}
              <div className="flex items-start space-x-4 mb-6 pb-6 border-b border-gray-200">
                <img 
                  src={venueData.image} 
                  alt={venueData.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{venueData.name}</h4>
                  <p className="text-gray-600">{venueData.location}</p>
                  <p className="text-sm text-gray-500">Vendor: {venueData.vendor}</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Event Date:</span>
                  <span className="text-gray-900">
                    {selectedDate?.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Package:</span>
                  <span className="text-gray-900">{selectedPackage?.title}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Max Capacity:</span>
                  <span className="text-gray-900">{selectedPackage?.maxGuests} guests</span>
                </div>
              </div>

              {/* Package Features */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h5 className="font-medium text-gray-700 mb-3">Package Includes:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPackage?.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Price */}
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total Amount:</span>
                <span className="text-2xl font-bold text-primary-600">{selectedPackage?.priceLabel}</span>
              </div>
            </Card>

            <div className="text-center text-sm text-gray-500 mb-6">
              By proceeding, you agree to our terms and conditions. This is a booking request and will be confirmed by the vendor.
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              icon={FaChevronLeft}
              onClick={onBack}
              className="mr-4"
            >
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Book Your Event</h1>
              <p className="text-sm text-gray-600">{venueData.name} - {venueData.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Stepper 
            steps={steps} 
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderStepContent()}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 md:relative md:border-t-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              {currentStep > 0 && (
                <Button
                  variant="secondary"
                  onClick={handlePrevStep}
                >
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex space-x-4">
              {currentStep < steps.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={handleNextStep}
                  disabled={!canProceedFromStep(currentStep)}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleFinalSubmit}
                  loading={isSubmitting}
                  disabled={!canProceedFromStep(currentStep)}
                  size="large"
                >
                  Request Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add bottom padding to prevent content from being hidden behind fixed footer */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default BookingFlow;