import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import OverviewStep from './steps/OverviewStep';
import DetailsStep from './steps/DetailsStep';
import CapacityStep from './steps/CapacityStep';
import FacilitiesStep from './steps/FacilitiesStep';
import PricingStep from './steps/PricingStep';
import PhotosStep from './steps/PhotosStep';
import RulesStep from './steps/RulesStep';
import ReviewStep from './steps/ReviewStep';

const AddSpaceWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize state from localStorage (for draft recovery) or empty
  const [spaceData, setSpaceData] = useState(() => {
    const savedDraft = localStorage.getItem('space_draft');
    if (savedDraft) {
      return JSON.parse(savedDraft);
    }
    return {
      // Overview
      name: '',
      venue_type: [],
      city: '',
      location: '',
      
      // Details
      description: '',
      venue_name: '',
      business_phone: '',
      business_email: '',
      
      // Capacity
      capacity: '',
      capacities: {
        standing: '',
        dining: '',
        theatre: '',
        boardroom: '',
        classroom: '',
        reception: ''
      },
      
      // Facilities
      facilities: [],
      catering_drinks: [],
      music_sound: [],
      
      // Pricing
      pricing: [],
      packages: [],
      
      // Photos
      photos: [],
      
      // Rules
      allowed_events: [],
      house_rules: [],
      cancellation_policy: ''
    };
  });

  const steps = [
    { id: 0, title: 'Overview', component: OverviewStep },
    { id: 1, title: 'Details', component: DetailsStep },
    { id: 2, title: 'Capacity', component: CapacityStep },
    { id: 3, title: 'Facilities', component: FacilitiesStep },
    { id: 4, title: 'Pricing', component: PricingStep },
    { id: 5, title: 'Photos', component: PhotosStep },
    { id: 6, title: 'Rules', component: RulesStep },
    { id: 7, title: 'Review', component: ReviewStep }
  ];

  // Save to localStorage whenever spaceData changes (auto-save draft)
  React.useEffect(() => {
    localStorage.setItem('space_draft', JSON.stringify(spaceData));
  }, [spaceData]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
      window.scrollTo(0, 0);
    }
  };

  const handleDataChange = (data) => {
    setSpaceData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Prepare data for backend
      const payload = {
        // Basic Info
        name: spaceData.name,
        venue_type: spaceData.venue_type,
        city: spaceData.city,
        address: spaceData.location,
        
        // Details
        business_name: spaceData.venue_name,
        description: spaceData.description,
        business_phone: spaceData.business_phone,
        business_email: spaceData.business_email,
        
        // Capacity
        capacity: parseInt(spaceData.capacity) || 0,
        capacities: Object.entries(spaceData.capacities)
          .filter(([key, value]) => value)
          .reduce((acc, [key, value]) => {
            acc[key] = parseInt(value);
            return acc;
          }, {}),
        
        // Facilities (combine all categories)
        facilities: [
          ...spaceData.facilities.map(f => ({ name: f, category: 'general' })),
          ...spaceData.catering_drinks.map(f => ({ name: f, category: 'catering' })),
          ...spaceData.music_sound.map(f => ({ name: f, category: 'music' }))
        ],
        
        // Pricing & Packages
        pricing: spaceData.pricing,
        packages: spaceData.packages,
        
        // Photos
        photos: spaceData.photos.map((photo, index) => ({
          photo_url: photo.photo_url,
          display_order: index,
          is_primary: index === 0
        })),
        
        // Rules
        allowed_events: spaceData.allowed_events,
        house_rules: spaceData.house_rules,
        cancellation_policy: spaceData.cancellation_policy,
        
        // Status
        status: 'pending_review'
      };

      console.log('Submitting space data:', payload);
      
      // Make API call to create space
      const response = await fetch('/api/vendor/spaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit space');
      }

      const result = await response.json();
      
      // Clear localStorage draft on success
      localStorage.removeItem('space_draft');
      
      // Clear state
      setSpaceData({
        name: '',
        venue_type: [],
        city: '',
        location: '',
        description: '',
        venue_name: '',
        business_phone: '',
        business_email: '',
        capacity: '',
        capacities: {},
        facilities: [],
        catering_drinks: [],
        music_sound: [],
        pricing: [],
        packages: [],
        photos: [],
        allowed_events: [],
        house_rules: [],
        cancellation_policy: ''
      });
      
      alert('Space submitted successfully! It will be reviewed by our team.');
      navigate('/vendor/dashboard');
      
    } catch (error) {
      console.error('Error submitting space:', error);
      alert('Failed to submit space. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAndExit = () => {
    // Draft is already saved in localStorage (auto-save)
    alert('Your progress has been saved! You can continue later from where you left off.');
    navigate('/vendor/dashboard');
  };

  const handleClearDraft = () => {
    if (window.confirm('Are you sure you want to discard this draft?')) {
      localStorage.removeItem('space_draft');
      setSpaceData({
        name: '',
        venue_type: [],
        city: '',
        location: '',
        description: '',
        venue_name: '',
        business_phone: '',
        business_email: '',
        capacity: '',
        capacities: {},
        facilities: [],
        catering_drinks: [],
        music_sound: [],
        pricing: [],
        packages: [],
        photos: [],
        allowed_events: [],
        house_rules: [],
        cancellation_policy: ''
      });
      navigate('/vendor/dashboard');
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">TV</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">Add Your Space</span>
          </div>
          <button
            onClick={handleSaveAndExit}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Save and exit
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-6">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <button
                    onClick={() => handleStepClick(index)}
                    disabled={index > currentStep}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      index < currentStep
                        ? 'bg-teal-600 text-white cursor-pointer hover:bg-teal-700'
                        : index === currentStep
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {index < currentStep ? (
                      <FaCheck size={16} />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </button>
                  <span className={`text-xs font-medium ${
                    index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 ${
                    index < currentStep ? 'bg-teal-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CurrentStepComponent
          data={spaceData}
          onChange={handleDataChange}
        />

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0 || isSubmitting}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 0 || isSubmitting
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={handleClearDraft}
              disabled={isSubmitting}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                isSubmitting
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-red-600 hover:text-red-700'
              }`}
            >
              Clear Draft
            </button>
          </div>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-8 py-3 bg-teal-600 text-white rounded-lg font-medium transition-colors ${
                isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-teal-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Space'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className={`px-8 py-3 bg-teal-600 text-white rounded-lg font-medium transition-colors ${
                isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-teal-700'
              }`}
            >
              Next Step
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSpaceWizard;
