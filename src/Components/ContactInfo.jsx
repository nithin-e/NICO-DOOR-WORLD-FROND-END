import React from 'react';
import { Phone, MapPin, Clock, Navigation, ExternalLink } from 'lucide-react';

export const ContactInfo = () => {
  const currentTime = new Date();
  const currentDay = currentTime.getDay();
  const currentHour = currentTime.getHours();
  
  const isOpen = currentDay !== 0 && 
                 ((currentDay === 6 && currentHour >= 10 && currentHour < 16) || 
                  (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 18));

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-stone-800">
          <MapPin className="text-stone-700" size={18} />
          Showroom Location
        </h3>
        <div className="space-y-2 text-stone-600">
          <p className="font-medium text-stone-800">Nice Door World</p>
          <p>Near SMP junction, kulapully</p>
          <p>Palakkad, CA 90001</p>
          <div className="flex gap-3 mt-4">
            <button 
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=10.7652,76.2707`, '_blank')}
              className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-md hover:bg-stone-800 transition-colors text-sm"
            >
              <Navigation size={14} />
              Get Directions
            </button>
            <button 
              onClick={() => window.location.href = 'tel:+1234567890'}
              className="flex items-center gap-2 border border-stone-300 px-4 py-2 rounded-md hover:bg-stone-50 transition-colors text-sm text-stone-700"
            >
              <Phone size={14} />
              Call Now
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-stone-800">
          <Clock className="text-stone-700" size={18} />
          Showroom Hours
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-600">Monday - Friday</span>
            <span className="font-medium text-stone-800">9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-600">Saturday</span>
            <span className="font-medium text-stone-800">10:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-600">Sunday</span>
            <span className="font-medium text-stone-800">Half-day (Closed)</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
          <span className={`text-sm font-medium ${isOpen ? 'text-emerald-700' : 'text-red-700'}`}>
            {isOpen ? 'Open Now' : 'Currently Closed'}
          </span>
        </div>
      </div>
    </div>
  );
};