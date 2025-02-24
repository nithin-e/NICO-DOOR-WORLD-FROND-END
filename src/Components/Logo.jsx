import React from 'react';
import NiccoLogo from '../uploads/NiccoLogo.png';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={NiccoLogo} alt="NICO DOOR Logo" className="w-16 h-auto" />
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline gap-1">
          <div className="flex items-center">
            <span className="text-2xl font-extrabold text-blue-900">N</span>
            <div className="relative">
              <span className="text-2xl font-extrabold text-blue-900">I</span>
              <div className="absolute -top-1.5 right-1 z-10"> {/* Adjusted from -top-2 to -top-1.5 */}
                {/* SVG flame for more precise curve control */}
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  style={{ transform: 'rotate(-12deg) translateX(10px)' }} 
                >
                  {/* Main flame */}
                  <path
                    d="M4 16C4 16 12 16 12 10C12 4 8 2 8 2C8 2 8 8 4 8C0 8 4 16 4 16Z"
                    fill="#dc2626" 
                    className="drop-shadow-sm"
                  />
                  {/* Inner flame */}
                  <path
                    d="M6 14C6 14 10 14 10 10C10 6 8 4 8 4C8 4 8 8 6 8C4 8 6 14 6 14Z"
                    fill="#f97316" 
                  />
                </svg>
              </div>
            </div>
            <span className="text-2xl font-extrabold text-blue-900">CO DOOR</span>
          </div>
        </div>
        <span className="text-lg font-bold text-blue-800 tracking-wider">WORLD</span>
      </div>
    </div>
  );
};

export default Logo;