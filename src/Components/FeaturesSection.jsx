import React from "react";
import { Star, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { FeatureCard } from "./featuredCard";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Star,
      title: "Expert Consultation",
      description:
        "Get personalized guidance from our door specialists to find the perfect match for your space and style preferences.",
    },
    {
      icon: ArrowRight,
      title: "Professional Installation",
      description:
        "Our certified technicians ensure precise fitting and finishing, guaranteeing both security and aesthetics.",
    },
    {
      icon: Clock,
      title: "After-sales Support",
      description:
        "Enjoy peace of mind with our comprehensive maintenance services and dedicated customer support team.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-amber-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Nico Door World?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Experience excellence in every aspect of your door selection and installation journey.
          </p>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
