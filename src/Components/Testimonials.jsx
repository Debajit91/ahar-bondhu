import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Community Volunteer",
      image: "https://i.ibb.co.com/ym06wtWm/Sarah-Johnson.jpg",
      rating: 5,
      text: "Ahar Bondhu has transformed how our community shares food. I've been able to help so many families while reducing waste from my restaurant.",
      location: "Dhaka"
    },
    {
      id: 2,
      name: "Mohammed Rahman",
      role: "Food Recipient",
      image: "https://i.ibb.co.com/Zp8PT3tn/Abdul-Zareh.jpg",
      rating: 5,
      text: "As a student, this platform has been a blessing. Fresh, quality food when I need it most. The donors are so kind and generous.",
      location: "Chittagong"
    },
    {
      id: 3,
      name: "Fatima Khan",
      role: "Regular Donor",
      image: "https://i.ibb.co.com/6cftWdHV/pexels-photo-774909.jpg",
      rating: 5,
      text: "I love how easy it is to share excess food from our family gatherings. Knowing it goes to people who need it makes me so happy!",
      location: "Sylhet"
    }
  ];

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <FaStar key={index} className="text-yellow-400" />
    ));
  };

  return (
    <section className="my-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
        <p className="w-2xl mx-auto">
          Real stories from real people who are making a difference through food sharing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            {/* Rating */}
            <div className="flex justify-center mb-4">
              <div className="flex space-x-1">
                {renderStars(testimonial.rating)}
              </div>
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-gray-700 text-center mb-6 italic">
              "{testimonial.text}"
            </blockquote>

            {/* Profile */}
            <div className="flex flex-col items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover mb-3 border-4 border-green-100"
              />
              <h4 className="font-semibold text-gray-800 text-lg">
                {testimonial.name}
              </h4>
              <p className="text-green-600 font-medium text-sm">
                {testimonial.role}
              </p>
              <p className="text-gray-500 text-sm">
                📍 {testimonial.location}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <p className="mb-6">
          Ready to share your story with us?
        </p>
        <div className="space-x-4">
          <Link to="/add-food">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer">
              Share Food Today
            </button>
          </Link>
          <Link to="/available-foods">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer">
              Find Food Near You
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;