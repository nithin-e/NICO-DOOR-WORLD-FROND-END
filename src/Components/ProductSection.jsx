import React from 'react';
import { ProductCard } from './ProductCart';

export const ProductSection = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Classic Wooden Door',
      features: ['Solid Wood', 'Custom Sizes', 'Multiple Finishes'],
      image: '/api/placeholder/300/400'
    },
    {
      id: 2,
      name: 'Modern Glass Door',
      features: ['Tempered Glass', 'Aluminum Frame', 'Frost Options'],
      image: '/api/placeholder/300/400'
    },
    {
      id: 3,
      name: 'Security Steel Door',
      features: ['Multi-lock System', 'Weather Resistant', 'Sound Proof'],
      image: '/api/placeholder/300/400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Collections</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};