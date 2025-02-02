import React from 'react';
import { Star } from 'lucide-react';

export const ProductCard = ({ product }) => {
  console.log('check eda mone check', product);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300'}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{product.name}</h3>

       
        <ul className="space-y-2 mb-6">
          <li className="flex items-center text-gray-600">
            <Star className="w-4 h-4 text-amber-800 mr-2" />
            Material: {product.material}
          </li>
          <li className="flex items-center text-gray-600">
            <Star className="w-4 h-4 text-amber-800 mr-2" />
            Color: {product.color}
          </li>
          <li className="flex items-center text-gray-600">
            <Star className="w-4 h-4 text-amber-800 mr-2" />
            Suitable For: {product.suitableFor}
          </li>
        </ul>

        <button className="w-full bg-amber-800 text-white px-4 py-2 rounded-full hover:bg-amber-700">
          Request Quote
        </button>
      </div>
    </div>
  );
};
