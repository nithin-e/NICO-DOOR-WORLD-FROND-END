import React from 'react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <svg 
        viewBox="0 0 50 50" 
        className="w-12 h-12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M15 8 L35 4 L35 46 L15 42 Z" 
          className="fill-amber-800"
          stroke="#2d1810"
          strokeWidth="1"
        />
        <path 
          d="M18 12 L32 9 L32 39 L18 36 Z" 
          className="fill-amber-600"
        />
        <path 
          d="M20 16 L30 14 M20 24 L30 22 M20 32 L30 30" 
          stroke="#2d1810"
          strokeWidth="0.5"
        />
        <circle 
          cx="29" 
          cy="25" 
          r="1.5" 
          className="fill-yellow-500"
        />
        <path 
          d="M13 8 Q25 20 37 8" 
          fill="none"
          stroke="#2d1810"
          strokeWidth="0.5"
        />
      </svg>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold text-amber-900 tracking-tight">NICO DOOR</span>
        </div>
        <span className="text-lg font-medium text-amber-700 tracking-widest">WORLD</span>
      </div>
    </div>
  );
};