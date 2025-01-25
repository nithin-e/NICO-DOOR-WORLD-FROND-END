import React from 'react';
import { Phone, Mail } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <Phone className="w-5 h-5 text-amber-800 mr-3" />
          <span>+1 (234) 567-8900</span>
        </div>
        <div className="flex items-center">
          <Mail className="w-5 h-5 text-amber-800 mr-3" />
          <span>contact@nicedoorworld.com</span>
        </div>
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Opening Hours:</h4>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
};