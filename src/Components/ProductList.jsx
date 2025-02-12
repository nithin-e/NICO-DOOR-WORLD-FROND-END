import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import axiosInstance from '../cors/axiousInstence';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/ProductDetails/${product._id}`, { state: { product } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105">
      <img 
        src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300'}
        alt={product.name}
        onClick={handleImageClick}
        className="w-full h-64 object-cover cursor-pointer"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>

        <ul className="space-y-2 mb-6">
          <li className="flex items-center text-gray-600">
            <Star className="w-4 h-4 text-amber-800 mr-2" />
            Material: {product.material}
          </li>
          <li className="flex items-center text-gray-600">
            <Star className="w-4 h-4 text-amber-800 mr-2" />
            Suitable For: {product.suitableFor}
          </li>
        </ul>

        {product.features && product.features.length > 0 ? (
          <ul className="mb-4 space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-700">• {feature}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500"></p>
        )}
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-4 py-2 bg-amber-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Previous
      </button>
      
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-md ${
              currentPage === page
                ? 'bg-amber-800 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-4 py-2 bg-amber-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="w-5 h-5 ml-1" />
      </button>
    </div>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  useEffect(() => {
    async function productDataFetching() {
      try {
        const response = await axiosInstance.get('http://localhost:4000/api/userFecth', {
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
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    }

    productDataFetching();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-amber-800 text-white py-16 text-center mt-[60px]">
        <h1 className="text-4xl font-bold mb-4">Our Door Collections</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Explore our wide range of doors designed to match every style, need, and budget.
        </p>
      </div>

     
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-600"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading products...</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-16 bg-amber-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 cursor-pointer">
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 text-center">No products available.</p>
            )}
          </div>
          
          {products.length > productsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;