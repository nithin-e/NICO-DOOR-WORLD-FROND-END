import React from 'react';
import { Star, ArrowRight, Clock } from 'lucide-react';
import { FeatureCard } from './featuredCard';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Star,
      title: 'Expert Consultation',
      description: 'Professional guidance for perfect door selection'
    },
    {
      icon: ArrowRight,
      title: 'Professional Installation',
      description: 'Expert fitting service by certified technicians'
    },
    {
      icon: Clock,
      title: 'After-sales Support',
      description: 'Dedicated support and maintenance services'
    }
  ];

  return (
    <div className="bg-amber-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Why Choose Nice Door World?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};