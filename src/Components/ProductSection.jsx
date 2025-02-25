import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCart';
import axiosInstance from '../cors/axiousInstence';

export const ProductSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px) to trigger slide change
  const minSwipeDistance = 50;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/api/userFecth", {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        
         
        if (response.data && response.data.data) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.log('whts is the problem bro',error);
        
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        setItemsPerSlide(5); // 2xl screens
      } else if (width >= 1280) {
        setItemsPerSlide(4); // xl screens
      } else if (width >= 1024) {
        setItemsPerSlide(3); // lg screens
      } else if (width >= 768) {
        setItemsPerSlide(2); // md screens
      } else {
        setItemsPerSlide(1); // sm screens
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useEffect(() => {
    if (products.length <= itemsPerSlide) return;
    
    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [products.length, itemsPerSlide, currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => {
      // For mobile (1 item per slide), move one at a time
      if (itemsPerSlide === 1) {
        if (prev === 0) return Math.max(products.length - 1, 0);
        return prev - 1;
      }
      
      // For larger screens, move by a group (itemsPerSlide)
      if (prev === 0) return Math.max(Math.ceil(products.length / itemsPerSlide) - 1, 0) * itemsPerSlide;
      return Math.max(prev - itemsPerSlide, 0);
    });
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => {
      // For mobile (1 item per slide), move one at a time
      if (itemsPerSlide === 1) {
        if (prev >= products.length - 1) return 0;
        return prev + 1;
      }
      
      // For larger screens, move by a group (itemsPerSlide)
      if (prev + itemsPerSlide >= products.length) return 0;
      return prev + itemsPerSlide;
    });
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextSlide();
    } else if (isRightSwipe) {
      handlePrevSlide();
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            <div className="space-y-3">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-36 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate the number of slides needed based on screen size
  const totalGroups = Math.ceil(products.length / itemsPerSlide);
  const currentGroup = Math.floor(currentSlide / itemsPerSlide);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
        Featured Collections
      </h2>
      
      <div className="relative overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            width: itemsPerSlide === 1 
              ? `${products.length * 100}%` 
              : `${Math.ceil(products.length / itemsPerSlide) * 100}%`,
            transform: itemsPerSlide === 1
              ? `translateX(-${(currentSlide * 100) / products.length}%)`
              : `translateX(-${(currentGroup * 100) / Math.ceil(products.length / itemsPerSlide)}%)`
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* For mobile view (1 item per slide) */}
          {itemsPerSlide === 1 && products.map((product) => (
            <div 
              key={product._id} 
              style={{ width: `${100 / products.length}%` }} 
              className="flex-shrink-0 px-1 sm:px-2"
            >
              <ProductCard product={product} />
            </div>
          ))}

          {/* For larger screens (multi-item slides) */}
          {itemsPerSlide > 1 && Array.from({ length: totalGroups }).map((_, groupIndex) => (
            <div
              key={`group-${groupIndex}`}
              style={{ width: `${100 / totalGroups}%` }}
              className="flex flex-shrink-0"
            >
              {products
                .slice(groupIndex * itemsPerSlide, (groupIndex + 1) * itemsPerSlide)
                .map((product) => (
                  <div
                    key={product._id}
                    style={{ width: `${100 / itemsPerSlide}%` }}
                    className="flex-shrink-0 px-1 sm:px-2"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
          ))}
        </div>

        {products.length > itemsPerSlide && (
          <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-2">
            <button
              onClick={handlePrevSlide}
              className="bg-black/20 hover:bg-black/60 text-white p-1 sm:p-2 rounded-full transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNextSlide}
              className="bg-black/20 hover:bg-black/60 text-white p-1 sm:p-2 rounded-full transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              aria-label="Next products"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;