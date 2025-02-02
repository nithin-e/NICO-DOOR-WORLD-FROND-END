import React from 'react';
import { Phone } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-amber-800 font-medium">Home</a>
            <a href="/ProductList" className="text-gray-600 hover:text-amber-800">Products</a>
            <a href="#" className="text-gray-600 hover:text-amber-800">About</a>
            <a href="#" className="text-gray-600 hover:text-amber-800">Contact</a>
          </div>
          <div className="hidden md:flex items-center text-amber-800">
            <Phone className="w-5 h-5 mr-2" />
            <span>Call Us: (+91) 7034683567</span>
          </div>
        </div>
      </div>
    </nav>
  );
};