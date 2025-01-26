// src/pages/ProductPage.jsx
import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const ProductData = [
  {
    id: 1,
    name: 'Classic Wooden Door',
    description: 'Solid wood door with traditional design',
    features: ['Solid Oak', 'Hand-carved Details', 'Multiple Finishes'],
    image: '/api/placeholder/300/400',
    price: 599
  },
  {
    id: 2,
    name: 'Modern Glass Door',
    description: 'Contemporary design with tempered glass',
    features: ['Tempered Glass', 'Aluminum Frame', 'Frost Options'],
    image: '/api/placeholder/300/400',
    price: 799
  },
  {
    id: 3,
    name: 'Security Steel Door',
    description: 'High-security door for maximum protection',
    features: ['Multi-lock System', 'Steel Reinforced', 'Weather Resistant'],
    image: '/api/placeholder/300/400',
    price: 1099
  },
  {
    id: 4,
    name: 'Rustic Barn Door',
    description: 'Sliding barn-style interior door',
    features: ['Reclaimed Wood', 'Sliding Mechanism', 'Customizable'],
    image: '/api/placeholder/300/400',
    price: 699
  },
  {
    id: 5,
    name: 'French Patio Door',
    description: 'Elegant double-door for patio',
    features: ['Double Panel', 'Large Glass Area', 'Smooth Sliding'],
    image: '/api/placeholder/300/400',
    price: 1299
  },
  {
    id: 6,
    name: 'Interior Pocket Door',
    description: 'Space-saving sliding interior door',
    features: ['Hidden Sliding', 'Smooth Track', 'Multiple Designs'],
    image: '/api/placeholder/300/400',
    price: 499
  },
  {
    id: 7,
    name: 'Garage Entry Door',
    description: 'Robust door for garage entrance',
    features: ['Insulated', 'Heavy-duty', 'Secure Lock System'],
    image: '/api/placeholder/300/400',
    price: 649
  },
  {
    id: 8,
    name: 'Eco-Friendly Bamboo Door',
    description: 'Sustainable door made from bamboo',
    features: ['Renewable Material', 'Lightweight', 'Natural Finish'],
    image: '/api/placeholder/300/400',
    price: 549
  }
];

const ProductCard = ({ product, onQuote }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <ul className="mb-4 space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-700">
              • {feature}
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-amber-800">${product.price}</span>
          <button 
            onClick={() => onQuote(product)}
            className="bg-amber-800 text-white px-4 py-2 rounded-full hover:bg-amber-700"
          >
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuoteRequest = (product) => {
    setSelectedProduct(product);
    // You can add modal or form logic here
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-amber-800 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Door Collections</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Explore our wide range of doors designed to match every style, need, and budget.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {ProductData.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuote={handleQuoteRequest} 
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;