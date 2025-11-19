import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaCalendarAlt, FaUsers, FaChartLine, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import LandingHeader from '../landing/LandingHeader';
import VendorRegistrationModal from '../auth/VendorRegistrationModal';

const ListYourVenue = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const openRegistrationModal = () => {
    setIsModalOpen(true);
  };

  const closeRegistrationModal = () => {
    setIsModalOpen(false);
  };

  const eventTypes = [
    'Film & Photo Shoots',
    'Corporate Events',
    'Parties & Private Dining',
    'Wedding Receptions',
    'Meetings & Conferences'
  ];

  const venueTypes = [
    { name: 'Banquet Halls', image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c89f?w=400&h=300&fit=crop' },
    { name: 'Meeting Spaces', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop' },
    { name: 'Restaurants', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop' },
    { name: 'Hotels', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop' },
    { name: 'Outdoor Spaces', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop' },
    { name: 'Conference Centers', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop' },
    { name: 'Marquees', image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400&h=300&fit=crop' },
    { name: 'Studios', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&h=300&fit=crop' }
  ];

  const steps = [
    {
      number: '1',
      title: 'List for free',
      description: 'Create your host profile in under 2 minutes, add photos, descriptions, and tap into our network. Get access to thousands of event organizers without any upfront fees.'
    },
    {
      number: '2',
      title: 'Receive enquiries',
      description: 'Receive booking requests directly from customers. Respond to enquiries, send custom quotes, and manage your calendar all in one place.'
    },
    {
      number: '3',
      title: 'Grow your business',
      description: 'We only earn when you do. Enjoy transparent commission rates and stay at the top of search results with our data-driven platform.'
    }
  ];

  const testimonials = [
    {
      text: "Since joining VenueBooker our corporate and private events skyrocketed! It's a great marketing channel for us, making it easy to reach new customers and get group bookings.",
      author: 'Aamir Khan',
      venue: 'Pearl Continental Hotel, Karachi'
    },
    {
      text: "We had a spare room without purpose, we've listed it on VenueBooker and now we get 30+ enquiries per month for meetings and photo shoots!",
      author: 'Sara Ahmed',
      venue: 'Creative Hub, Lahore'
    }
  ];

  const faqs = [
    {
      question: 'What is VenueBooker?',
      answer: "We're a venue marketplace that connects customers with venue owners, making event booking easier for everyone. We're present across Pakistan with thousands of venues listed and growing customers using the platform monthly."
    },
    {
      question: 'How long does it take to get listed?',
      answer: 'Creating an account takes only 2 minutes. From there, you can start creating your listing right away. Once done, we\'ll review and publish your listing within 24-48 hours.'
    },
    {
      question: 'How much commission does VenueBooker charge?',
      answer: 'We charge a transparent commission only when a booking is confirmed and the event takes place. Our commission ranges from 10-15% depending on the booking type and payment method. There are no listing fees or hidden charges.'
    },
    {
      question: 'How do I receive payments?',
      answer: 'Payments are processed securely through our platform. For confirmed bookings, funds are transferred to your bank account within 7 days after the event completion, with commission automatically deducted.'
    },
    {
      question: 'Do I need to sign a contract?',
      answer: 'No long-term contract required! You can list your venue by simply accepting our terms and conditions. You have the flexibility to update or delist anytime.'
    },
    {
      question: 'Who can I contact for help?',
      answer: 'Our support team is here to help you get started and optimize your listing. Contact us at support@venuebooker.com or through your vendor dashboard.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader onListYourSpace={openRegistrationModal} />

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Turn empty dates into revenue
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Showcase your space for free to 700,000+ event organizers each month and fill your calendar with bookings.
              </p>
              <button
                onClick={openRegistrationModal}
                className="px-8 py-4 bg-red-500 text-white text-lg font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-lg"
              >
                List your space
              </button>
            </div>

            {/* Right Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop"
                  alt="Venue owner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg mt-8">
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f29da8c89f?w=300&h=400&fit=crop"
                  alt="Venue interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Every Venue Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Every venue is Tagvenue
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From private parties and corporate events to meetings and photo shoots - you decide which bookings you want. Get your space in front of thousands of customers searching for venues like yours.
            </p>
          </div>

          {/* Stats Section */}
          <div className="mb-16 text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              40,000+ events booked every year
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-gray-700 font-medium">Film & Photo Shoots</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-gray-700 font-medium">Corporate Events</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-gray-700 font-medium">Parties & Private Dining</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-gray-700 font-medium">Wedding Receptions</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-gray-700 font-medium">Meetings & Conferences</p>
              </div>
            </div>
          </div>

          {/* Testimonials Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            {/* Left Testimonial with Image */}
            <div className="flex gap-6">
              <div className="w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&h=300&fit=crop"
                  alt="Bar owner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Since joining VenueBooker our corporate and private events skyrocketed! It's a great marketing channel for us, making it easy to reach new customers and get group bookings.
                </p>
                <p className="font-bold text-gray-900">Show here from Vandals</p>
              </div>
            </div>

            {/* Right Testimonial with Image */}
            <div className="flex gap-6">
              <div className="w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop"
                  alt="Restaurant owner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We had a spare room without purpose, we've listed it on VenueBooker and now we get 30+ enquiries per month for meetings and photo shoots!
                </p>
                <p className="font-bold text-gray-900">Emma from Tower Cafe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Make money with Tagvenue
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500 text-white text-2xl font-bold rounded-full mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={openRegistrationModal}
              className="px-8 py-4 bg-red-500 text-white text-lg font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-lg"
            >
              List your space
            </button>
          </div>
        </div>
      </section>

      {/* Venue Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Venues like yours
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              We have them all - from local bars to meeting rooms, industrial lofts and prestigious locations. With thousands of venues globally, we celebrate diversity and uniqueness.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {venueTypes.map((venue, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-3">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <p className="absolute bottom-3 left-3 text-white font-semibold text-base">
                    {venue.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your questions answered
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </span>
                  {openFAQ === index ? (
                    <FaChevronUp className="text-gray-500 flex-shrink-0" />
                  ) : (
                    <FaChevronDown className="text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f29da8c89f?w=1600&h=800&fit=crop"
            alt="Elegant venue"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Grow your revenue<br />with Tagvenue
          </h2>
          <p className="text-xl mb-10 leading-relaxed max-w-2xl">
            Join thousands of venue owners who are already filling their calendars
          </p>

          <button
            onClick={openRegistrationModal}
            className="px-8 py-4 bg-red-500 text-white text-lg font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-xl"
          >
            List your space
          </button>
        </div>
      </section>

      {/* Vendor Registration Modal */}
      <VendorRegistrationModal isOpen={isModalOpen} onClose={closeRegistrationModal} />
    </div>
  );
};

export default ListYourVenue;
