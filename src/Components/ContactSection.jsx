import React from 'react';
import { ContactInfo } from './ContactInfo';
import  LocationMap  from './LocationMap';

export const ContactSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Visit Our Showroom
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ContactInfo />
          <LocationMap />
        </div>
      </div>
    </div>
  );
};