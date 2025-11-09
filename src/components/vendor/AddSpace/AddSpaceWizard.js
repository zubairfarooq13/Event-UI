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
  const [spaceData, setSpaceData] = useState({
    // Overview
    name: '',
    venue_type: [],
    city: '',
    location: '',
    
    // Details
    description: '',
    venue_name: '',
    
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
    try {
      console.log('Submitting space data:', spaceData);
      // TODO: Make API call to submit space
      // const response = await spaceService.createSpace(spaceData);
      
      alert('Space submitted successfully! It will be reviewed by our team.');
      navigate('/vendor/dashboard');
    } catch (error) {
      console.error('Error submitting space:', error);
      alert('Failed to submit space. Please try again.');
    }
  };

  const handleSaveAndExit = () => {
    // Save draft to localStorage or backend
    localStorage.setItem('space_draft', JSON.stringify(spaceData));
    alert('Progress saved!');
    navigate('/vendor/dashboard');
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
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Submit Space
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
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
