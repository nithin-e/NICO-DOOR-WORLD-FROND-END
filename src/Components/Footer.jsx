import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-amber-900 to-amber-950 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-8 pb-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-12 gap-6 pb-6">
          {/* Company Info Section */}
          <div className="md:col-span-4 space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-amber-200">Nice Door World</h4>
              <p className="text-amber-100/80 leading-relaxed text-sm">
                Crafting exceptional doors that blend artistry with engineering excellence. Each piece is a masterpiece, designed to elevate your space with unmatched quality and style.
              </p>
            </div>
            <div className="space-y-2">
              <a href="tel:+1234567890" className="flex items-center gap-2 text-amber-200/80 hover:text-amber-200 transition-colors text-sm">
                <Phone size={14} />
                <span>+91 95263 09490</span>
              </a>
              <a href="mailto:info@nicedoorworld.com" className="flex items-center gap-2 text-amber-200/80 hover:text-amber-200 transition-colors text-sm">
                <Mail size={14} />
                <span>info@nicodoorworld.com</span>
              </a>
              <div className="flex items-center gap-2 text-amber-200/80 text-sm">
                <MapPin size={14} />
                <span>Near SMP junction, kulapully, Palakkad</span>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="md:col-span-2">
            <h4 className="text-base font-semibold mb-2 text-amber-200">Quick Links</h4>
            <ul className="space-y-1">
              {['Home', 'Products', 'Gallery', 'About Us', 'Contact'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-amber-100/80 hover:text-amber-200 transition-colors flex items-center gap-1 group text-sm">
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div className="md:col-span-3">
            <h4 className="text-base font-semibold mb-2 text-amber-200">Our Services</h4>
            <ul className="space-y-1">
              {[
                'Expert Door Consultation',
                'Professional Installation',
                'Custom Door Design',
                'After-sales Support',
                'Maintenance Services'
              ].map((service, index) => (
                <li key={index} className="text-amber-100/80 flex items-center gap-2 text-sm">
                  <Star className="w-3 h-3 text-amber-600" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours Section */}
          <div className="md:col-span-3">
            <h4 className="text-base font-semibold mb-2 text-amber-200">Working Hours</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-amber-100/80 text-sm">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between text-amber-100/80 text-sm">
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between text-amber-100/80 text-sm">
                <span>Sunday:</span>
                <span>Half-day (Closed)</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2 text-amber-200">Connect With Us</h4>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter].map((Icon, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="bg-amber-800/50 p-1.5 rounded-lg hover:bg-amber-700/50 transition-colors"
                  >
                    <Icon size={16} className="text-amber-200" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-800/50 pt-4 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-amber-200/60 text-xs">
              © {currentYear} Nico Door World. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs">
              <a href="#" className="text-amber-200/60 hover:text-amber-200 transition-colors">Privacy Policy</a>
              <a href="#" className="text-amber-200/60 hover:text-amber-200 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};