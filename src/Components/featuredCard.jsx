import React from 'react';

export const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="text-center">
      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
        <Icon className="w-8 h-8 text-amber-800" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};