import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>

      <p className="mb-4 leading-relaxed">
        Welcome to <strong>Ahar Bondhu</strong>, your community food sharing platform
        dedicated to reducing food waste and helping those in need. Our mission
        is to connect food donors with people who can benefit from donated food,
        creating a sustainable and compassionate community.
      </p>

      <p className="mb-4 leading-relaxed">
        We believe that no good food should go to waste while there are people
        hungry and in need. Through our easy-to-use platform, donors can share
        surplus food, and recipients can find available food nearby.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
      <p className="mb-4 leading-relaxed">
        To build a world where food is shared generously, communities are
        empowered, and no one has to face hunger alone.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
      <ul className="list-disc list-inside space-y-2 leading-relaxed">
        <li><strong>Compassion:</strong> We care deeply about people and food justice.</li>
        <li><strong>Sustainability:</strong> We work to reduce food waste and environmental impact.</li>
        <li><strong>Community:</strong> We foster connection and support among all users.</li>
        <li><strong>Transparency:</strong> We operate with honesty and openness.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Get Involved</h2>
      <p className="mb-4 leading-relaxed">
        Whether you want to donate food or request help, we welcome you to join
        our community. Together, we can make a difference.
      </p>

      <p className="text-center mt-12 text-gray-600 italic">
        Thank you for being part of Ahar Bondhu.
      </p>
    </div>
  );
};

export default AboutUs;
