import React from "react";
import { motion } from "framer-motion";

const ImpactStatistics = () => {
  const stats = [
    {
      number: "2,500+",
      label: "Meals Donated",
      icon: "🍽️",
      color: "text-green-600"
    },
    {
      number: "850+",
      label: "Active Donors",
      icon: "👥",
      color: "text-blue-600"
    },
    {
      number: "1,200+",
      label: "Families Helped",
      icon: "🏠",
      color: "text-purple-600"
    },
    {
      number: "95%",
      label: "Food Waste Reduced",
      icon: "♻️",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="my-15 rounded-2xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
        <p className="max-w-2xl mx-auto">
          Together, we're making a real difference in our community by reducing food waste and fighting hunger
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.5 }}
            className="text-center bg-gradient-to-r from-blue-50 to-green-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-5xl mb-4">{stat.icon}</div>
            <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
              {stat.number}
            </div>
            <div className="text-gray-700 font-semibold text-lg">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <p>
          Join us in creating a hunger-free community, one meal at a time
        </p>
      </div>
    </section>
  );
};

export default ImpactStatistics;