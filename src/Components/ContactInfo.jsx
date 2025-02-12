import React from 'react';
import { Phone, Mail } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <div>
  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
  <div className="space-y-4">
  <div className="mt-6">
    <h4 className="font-bold text-lg mb-2">Shop Address:</h4>
    <p className="text-gray-700">Nice Door World, Near SMP junction, kulapully, CA 90001</p>
    <p className="text-gray-700">palakkad</p>
  </div>
  <div className="mt-6">
    <h4 className="font-bold text-lg mb-2">Opening Hours:</h4>
    <p className="text-gray-700">Monday - saturday: 9:00 AM - 6:00 PM</p>
    <p className="text-gray-700">Saturday: 10:00 AM - 4:00 PM</p>
    <p className="text-gray-700">Sunday: half-day Closed</p>
  </div>
</div>
</div>
  );
};