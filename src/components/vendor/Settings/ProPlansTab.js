import React from 'react';
import { FaCrown, FaCheck } from 'react-icons/fa';

const ProPlansTab = () => {
  const plans = [
    {
      name: 'Free',
      price: 'PKR 0',
      period: 'Forever',
      features: [
        'Up to 2 venues',
        'Basic analytics',
        'Email support',
        'Standard listing'
      ],
      current: true
    },
    {
      name: 'Pro',
      price: 'PKR 9,999',
      period: 'per month',
      features: [
        'Unlimited venues',
        'Advanced analytics',
        'Priority support',
        'Featured listing',
        'Custom branding',
        'API access',
        'Team collaboration',
        'Advanced reporting'
      ],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'Contact us',
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom integrations',
        'White-label solution',
        'SLA guarantee',
        'Custom training',
        '24/7 phone support'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pro Plans</h1>
        <p className="text-gray-600 mt-1">
          Upgrade your account to unlock premium features and grow your business.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg border-2 p-6 ${
              plan.recommended
                ? 'border-teal-600 shadow-lg relative'
                : 'border-gray-200'
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-teal-600 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <FaCrown size={12} />
                  RECOMMENDED
                </span>
              </div>
            )}

            {plan.current && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gray-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  CURRENT PLAN
                </span>
              </div>
            )}

            <div className="text-center mb-6 mt-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-1">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
              </div>
              <p className="text-sm text-gray-500">{plan.period}</p>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <FaCheck className="text-teal-600 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                plan.current
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : plan.recommended
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              disabled={plan.current}
            >
              {plan.current
                ? 'Current Plan'
                : plan.name === 'Enterprise'
                ? 'Contact Sales'
                : 'Upgrade Now'}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">
              Can I change my plan at any time?
            </h4>
            <p className="text-sm text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">
              What payment methods do you accept?
            </h4>
            <p className="text-sm text-gray-600">
              We accept all major credit cards, debit cards, and bank transfers for Enterprise plans.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">
              Is there a free trial for Pro plans?
            </h4>
            <p className="text-sm text-gray-600">
              Yes! We offer a 14-day free trial for all Pro plans. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProPlansTab;
