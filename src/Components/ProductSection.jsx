import React from 'react';
import { ProductCard } from './ProductCart';
import { useEffect, useState } from 'react';
import axiosInstance from '../cors/axiousInstence'

export const ProductSection = () => {

  
    const [products, setProducts] = useState([])
    
    useEffect(() => {
      async function productDataFetching() {
        try {
          const response = await axiosInstance.get('http://localhost:4000/api/productData', {
            headers: { 'Content-Type': 'application/json' },
          });
    
          console.log('Fetched Data:', response.data);
    
          if (response.data && response.data.data) {
            setProducts(response.data.data);
          } else {
            console.log('API response does not contain expected data.');
            setProducts([]);
          }
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      }
    
      productDataFetching();
    }, []); 
    


  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Collections</h2>
      <div className="grid md:grid-cols-3 gap-8">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p className="text-gray-500">No products available</p>
      )}
    </div>
    </div>
  );
};