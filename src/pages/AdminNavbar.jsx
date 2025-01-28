import React from 'react';
import { Home, Package, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center flex-wrap">
      <div className="flex items-center mb-4 sm:mb-0">
        <svg 
          viewBox="0 0 50 50" 
          className="w-12 h-12 mr-3"
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
        </svg>
        <h1 className="text-2xl font-bold text-amber-900">Nice Door</h1>
      </div>

      <div className="flex items-center space-x-4 flex-wrap sm:flex-nowrap">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center text-amber-900 hover:bg-amber-100 px-3 py-2 rounded-md"
        >
          <Home className="mr-2 h-5 w-5" />
          Dashboard
        </button>
        <button 
          onClick={() => navigate('/products')} 
          className="flex items-center text-amber-900 hover:bg-amber-100 px-3 py-2 rounded-md"
        >
          <Package className="mr-2 h-5 w-5" />
          Products
        </button>
        <button 
          onClick={() => navigate('/settings')} 
          className="flex items-center text-amber-900 hover:bg-amber-100 px-3 py-2 rounded-md"
        >
          <Settings className="mr-2 h-5 w-5" />
          Settings
        </button>
        <button 
          onClick={handleLogout}
          className="bg-red-100 text-red-800 px-4 py-2 rounded-md hover:bg-red-200 transition flex items-center mt-2 sm:mt-0"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
