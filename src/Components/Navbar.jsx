import React, { useState, useRef, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      // Check if click is outside both the menu and the toggle button
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Only add the event listener if the menu is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-amber-800 font-bold hover:text-gray-700">
            Home
          </a>
          <a href="/ProductList" className="text-gray-600 hover:text-amber-800 font-bold">
            Products
          </a>
          <a href="/Contact" className="text-gray-600 hover:text-amber-800 font-bold">
            Contact
          </a>
        </div>

        {/* Call Info */}
        <div className="hidden md:flex items-center text-amber-800">
          <Phone className="w-5 h-5 mr-2" />
          <span className="font-bold">Call Us: (+91) 7034683567</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          className="md:hidden text-amber-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="py-4 space-y-4">
          <div className="px-4">
            <a 
              href="/" 
              className="block text-amber-800 font-black text-lg hover:text-gray-700 py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a 
              href="/ProductList" 
              className="block text-amber-800 font-black text-lg hover:text-gray-700 py-2"
              onClick={() => setIsOpen(false)}
            >
              Products
            </a>
            <a 
              href="/Contact" 
              className="block text-amber-800 font-black text-lg hover:text-gray-700 py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}