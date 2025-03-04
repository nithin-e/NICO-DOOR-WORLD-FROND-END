import React from 'react';
import NiccoLogo from '../uploads/NiccoLogo.png';

export const Logo = () => {
  return (
    <div className="flex flex-row items-center gap-1">
      <img src={NiccoLogo} alt="NICO DOOR Logo" className="w-10 h-auto sm:w-12 md:w-16" />
      <div className="flex items-baseline leading-tight">
        <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-900">N</span>
        <div className="relative">
          <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-900">I</span>
          <div className="absolute -top-0.5 sm:-top-1 md:-top-1.5 left-0.5 z-10 scale-50 sm:scale-75 md:scale-100">
            {/* SVG flame for more precise curve control */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 0 102 50" width="15" height="21">
              <g transform="scale(1,-1) translate(0,-50)">
                <path d="M85.5,48.9 C38.9,44.6 15.4,32.5 6.9,8.5 C5.3,3.8 5.3,3.5 6.8,2.8 C7.7,2.4 17.3,2.1 28,2.1 C49.2,2 50,2.2 50,7.3 C50,12.5 52.3,18 56.3,22.6 C61,28 75.9,38 89.5,44.9 C95.7,48 98.5,49.9 97,49.8 C95.6,49.8 90.5,49.4 85.5,48.9 Z" 
                  fill="red" />
                <path d="M99.8,0.3 C100.5,0 101.4,0.1 101.7,0.4 C102.1,0.7 101.5,1 100.4,0.9 C99.3,0.9 99,0.6 99.8,0.3 Z" 
                  fill="red" />
              </g>
            </svg>
          </div>
        </div>
        <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-900">CO DOOR</span>
        <span className="ml-1 text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-800">WORLD</span>
      </div>
    </div>
  );
};