import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Stepper = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full px-4 py-6">
      {/* Mobile Stepper - Vertical */}
      <div className="md:hidden">
        <div className="flex flex-col space-y-4">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isClickable = index <= currentStep;

            return (
              <div
                key={index}
                className={`flex items-center space-x-3 ${
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
                onClick={() => isClickable && onStepClick && onStepClick(index)}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? <FaCheck className="w-4 h-4" /> : index + 1}
                </div>
                <div className="flex-1">
                  <div
                    className={`text-sm font-medium ${
                      isActive ? 'text-primary-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div
                    className={`text-xs ${
                      isActive || isCompleted ? 'text-gray-600' : 'text-gray-400'
                    }`}
                  >
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Stepper - Horizontal */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isClickable = index <= currentStep;

            return (
              <div key={index} className="flex items-center flex-1">
                <div
                  className={`flex flex-col items-center ${
                    isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                  onClick={() => isClickable && onStepClick && onStepClick(index)}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isCompleted ? <FaCheck className="w-5 h-5" /> : index + 1}
                  </div>
                  <div className="mt-2 text-center">
                    <div
                      className={`text-sm font-medium ${
                        isActive ? 'text-primary-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        isActive || isCompleted ? 'text-gray-600' : 'text-gray-400'
                      }`}
                    >
                      {step.description}
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-all duration-200 ${
                      index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stepper;