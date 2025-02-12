import React from 'react';
import NiccoLogo from '../uploads/NiccoLogo.png';  // Adjust extension based on your file type


export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={NiccoLogo} alt="NICO DOOR Logo" className="w-16 h-auto" />
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold text-blue-900 drop-shadow-md">NICO DOOR</span>
        </div>
        <span className="text-lg font-bold text-blue-800 tracking-wider">WORLD</span>
      </div>
    </div>
  );
};