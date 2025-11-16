import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import spaceService from '../../../services/spaceService';
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
      description: '',
      
      // Details (Address & Location)
      street_address: '',
      street_address_line2: '',
      city: '',
      postal_code: '',
      province: '',
      business_phone: '',
      business_email: '',
      latitude: '',
      longitude: '',
      
      // Space Type
      space_type: '',
      
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
      // Prepare data for backend - matching exact API structure
      // API Endpoint: POST /api/spaces/
      // Expected format matches the backend schema exactly
      
      // Build full location address from address components
      const addressParts = [
        spaceData.street_address,
        spaceData.street_address_line2,
        spaceData.city,
        spaceData.postal_code,
        spaceData.province
      ].filter(Boolean);
      const fullLocation = addressParts.join(', ');
      
      const payload = {
        venue_name: spaceData.name,
        venue_type: Array.isArray(spaceData.venue_type) 
          ? spaceData.venue_type.join(', ') 
          : spaceData.venue_type,
        space_type: spaceData.space_type,
        location: fullLocation,
        city: spaceData.city,
        description: spaceData.description,
        capacity: parseInt(spaceData.capacity) || 0,
        phone: spaceData.business_phone,
        email: spaceData.business_email,
        
        // Photos array with photo_url and is_primary
        photos: spaceData.photos && spaceData.photos.length > 0
          ? spaceData.photos.map((photo, index) => ({
              photo_url: photo.photo_url || photo,
              is_primary: index === 0
            }))
          : [],
        
        // Capacities array with capacity_type and capacity_value
        capacities: Object.entries(spaceData.capacities || {})
          .filter(([key, value]) => value)
          .map(([capacity_type, capacity_value]) => ({
            capacity_type,
            capacity_value: parseInt(capacity_value)
          })),
        
        // Facilities array with name and category
        facilities: [
          ...(spaceData.facilities || []).map(f => ({ 
            name: f, 
            category: 'general' 
          })),
          ...(spaceData.catering_drinks || []).map(f => ({ 
            name: f, 
            category: 'catering' 
          })),
          ...(spaceData.music_sound || []).map(f => ({ 
            name: f, 
            category: 'music' 
          }))
        ],
        
        // Pricing array with pricing_type and price
        pricing: (spaceData.pricing || []).map(p => ({
          pricing_type: p.period_type || p.pricing_type || 'hourly',
          price: parseFloat(p.amount || p.price || 0)
        })),
        
        // Packages array with name, price, and features
        packages: (spaceData.packages || []).map(pkg => ({
          name: pkg.name,
          price: parseFloat(pkg.price || 0),
          features: pkg.features || []
        })),
        
        // Rules array with rule_type and rule_text
        rules: [
          ...(spaceData.house_rules || []).map(rule => ({
            rule_type: 'house_rule',
            rule_text: rule
          })),
          ...(spaceData.cancellation_policy ? [{
            rule_type: 'cancellation_policy',
            rule_text: spaceData.cancellation_policy
          }] : [])
        ],
        
        // Allowed events array
        allowed_events: spaceData.allowed_events || []
      };

      console.log('Submitting space data:', payload);
      
      // Make API call using spaceService
      const result = await spaceService.createSpace(payload);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to submit space');
      }
      
      // Clear localStorage draft on success
      localStorage.removeItem('space_draft');
      
      // Clear state
      setSpaceData({
        name: '',
        venue_type: [],
        description: '',
        street_address: '',
        street_address_line2: '',
        city: '',
        postal_code: '',
        province: '',
        business_phone: '',
        business_email: '',
        latitude: '',
        longitude: '',
        space_type: '',
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
      alert(error.message || 'Failed to submit space. Please try again.');
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
        description: '',
        street_address: '',
        street_address_line2: '',
        city: '',
        postal_code: '',
        province: '',
        business_phone: '',
        business_email: '',
        latitude: '',
        longitude: '',
        space_type: '',
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
