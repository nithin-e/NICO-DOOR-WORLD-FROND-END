import React from 'react';
import { ContactInfo } from './ContactInfo';
import LocationMap from './LocationMap';

export const ContactSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-t-lg p-6">
        <h2 className="text-2xl font-bold text-amber-100 mb-1 text-center">
          Experience Quality In Person
        </h2>
        <p className="text-amber-200/80 text-center text-sm">
          Visit our elegant showroom to explore our curated collection
        </p>
      </div>
      <div className="bg-white rounded-b-lg shadow-xl p-6 border border-stone-100">
        <div className="grid md:grid-cols-2 gap-6">
          <ContactInfo />
          <LocationMap />
        </div>
      </div>
    </div>
  );
};