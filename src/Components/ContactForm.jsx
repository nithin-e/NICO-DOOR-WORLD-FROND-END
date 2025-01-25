import React from 'react';

export const ContactForm = () => {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <input
        type="tel"
        placeholder="Your Phone"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <textarea
        placeholder="Tell us about your requirements"
        rows="4"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      ></textarea>
      <button className="bg-amber-800 text-white px-6 py-2 rounded-full hover:bg-amber-700 w-full">
        Schedule Consultation
      </button>
    </form>
  );
};