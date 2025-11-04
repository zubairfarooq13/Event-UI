import React, { useState } from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';

const ReviewsSection = ({ rating = 4.8, totalReviews = 399, reviews = [] }) => {
  const [showAll, setShowAll] = useState(false);

  const defaultReviews = reviews.length > 0 ? reviews : [
    {
      id: 1,
      name: 'Sarah H.',
      initials: 'SH',
      eventType: 'Hen Party',
      guests: 15,
      date: 'May 2025',
      rating: 4.2,
      comment: 'Fab venue really easy to setup and lovely area :)',
      verified: true,
      submittedDate: '20 May 2025'
    },
    {
      id: 2,
      name: 'Dania L.',
      initials: 'DL',
      eventType: 'Birthday Party',
      guests: 30,
      date: 'April 2025',
      rating: 4.8,
      comment: 'The venue was stunning, a perfect 30th birthday venue in central London that felt very private and also very beautiful. All my guests had lots of compliments for the space.',
      verified: true,
      submittedDate: '1 May 2025'
    },
    {
      id: 3,
      name: 'Joseph M.',
      initials: 'JM',
      eventType: 'Event Space',
      guests: 25,
      date: 'April 2025',
      rating: 5.0,
      comment: 'Lovely space and very friendly/helpful staff',
      verified: true,
      submittedDate: '20 Apr 2025'
    },
  ];

  const displayedReviews = showAll ? defaultReviews : defaultReviews.slice(0, 3);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews and ratings</h2>
      
      {/* Overall Rating */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
        <div className="text-5xl font-bold text-gray-900">{rating}</div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={i < Math.floor(rating) ? 'text-teal-500' : 'text-gray-300'} 
                size={18} 
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">
            ({totalReviews} reviews and ratings - <span className="text-teal-600 cursor-pointer hover:underline">Read all</span>)
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                <span className="text-teal-700 font-semibold">{review.initials}</span>
              </div>

              <div className="flex-1">
                {/* Name and verified badge */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{review.name}</span>
                  {review.verified && (
                    <FaCheckCircle className="text-teal-500" size={14} />
                  )}
                </div>

                {/* Event details */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">Verified review</span>
                  <span>{review.eventType}</span>
                  <span>·</span>
                  <span>{review.guests} guests</span>
                  <span>·</span>
                  <span>{review.date}</span>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < Math.floor(review.rating) ? 'text-teal-500' : 'text-gray-300'} 
                      size={14} 
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-700 mb-2">{review.comment}</p>

                {/* Submitted date */}
                <div className="text-xs text-gray-500">
                  Submitted {review.submittedDate}
                </div>
              </div>

              {/* Rating number */}
              <div className="text-2xl font-bold text-gray-900">{review.rating}</div>
            </div>
          </div>
        ))}
      </div>

      {defaultReviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 w-full py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-medium"
        >
          {showAll ? 'Show less' : `Show all ${totalReviews} reviews`}
        </button>
      )}
    </div>
  );
};

export default ReviewsSection;
