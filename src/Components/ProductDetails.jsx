import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Phone, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const product = location.state?.product;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600"></div>
        <p className="mt-4 text-base sm:text-lg font-medium text-gray-700">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg sm:text-xl px-4">
        Product not found
      </div>
    );
  }

  const contactOptions = [
   { icon: Phone, method: 'Call Us', value:  '+917034684567', type: 'phone' },
    { icon: MessageCircle, method: 'WhatsApp', value: '+917034684567', type: 'whatsapp' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="bg-amber-800 text-white py-8 sm:py-16 text-center mt-[60px] px-4">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">Our Door Collections</h1>
        <p className="text-base sm:text-lg max-w-2xl mx-auto">
          Explore our wide range of doors designed to match every style, need, and budget.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-col space-y-4">
            <div className="aspect-[4/5] w-full md:w-2/3 max-w-md mx-auto relative rounded-lg overflow-hidden">
              <img
                src={product.images && product.images.length > 0 ? product.images[selectedImage] : 'https://via.placeholder.com/300'}
                alt={product.name}
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>

            <div className="flex justify-center gap-2 flex-wrap">
              {product.images && product.images.length > 0 &&
                product.images.map((img, index) => (
                  <div key={index} className="w-14 sm:w-16 h-14 sm:h-16 relative">
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className={`w-full h-full object-cover rounded cursor-pointer
                        ${selectedImage === index ? 'border-2 border-amber-800' : 'opacity-70 hover:opacity-100'}`}
                      onClick={() => setSelectedImage(index)}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">{product.name}</h1>
            <p className="text-base sm:text-lg font-sans text-gray-700 leading-relaxed">{product.description}</p>
            <p className="text-xl sm:text-2xl font-sans font-semibold text-amber-700">
              ₹{product.price.toLocaleString('en-IN')}
            </p>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 font-serif">Product Specifications</h3>
              <ul className="space-y-3">
                <li className="text-gray-700 font-sans text-sm sm:text-base"><span className="font-medium">Material:</span> {product.material}</li>
                <li className="text-gray-700 font-sans text-sm sm:text-base"><span className="font-medium">Color:</span> {product.color}</li>
                <li className="text-gray-700 font-sans text-sm sm:text-base"><span className="font-medium">Suitable For:</span> {product.suitableFor}</li>
                <li className="text-gray-700 font-sans text-sm sm:text-base"><span className="font-medium">Stock:</span> {product.stock}</li>
                <li className="text-gray-700 font-sans text-sm sm:text-base"><span className="font-medium">Lock Included:</span> {product.lockIncluded ? 'Yes' : 'No'}</li>
              </ul>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600 text-sm sm:text-base">• {feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-amber-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Contact for Inquiry</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactOptions.map((option, index) => (
                  <a
                    key={index}
                    href={`${option.type === 'phone' ? 'tel:' : 'https://wa.me/'}${option.value.replace(/\D/g, '')}`}
                    className="flex items-center bg-white p-3 sm:p-4 rounded-lg shadow-md hover:bg-amber-100 transition"
                  >
                    <option.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-800 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">{option.method}</p>
                      <p className="text-gray-600 text-xs sm:text-sm">{option.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;