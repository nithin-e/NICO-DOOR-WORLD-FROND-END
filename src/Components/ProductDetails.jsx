import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Phone, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true); // ✅ Track loading state

  const location = useLocation();
  const product = location.state?.product;

  console.log('Product Data:', product);

  // ✅ Simulate loading delay to show the loader effect
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Adjust delay if needed
  }, []);

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-600"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading product details...</p>
      </div>
    );
  }

  // ✅ Handle case when no product data is found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Product not found
      </div>
    );
  }

  // ✅ Contact options
  const contactOptions = [
    { icon: Phone, method: 'Call Us', value: '+1 (234) 567-8900', type: 'phone' },
    { icon: MessageCircle, method: 'WhatsApp', value: '+1 (234) 567-8901', type: 'whatsapp' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Header */}
       <div className="bg-amber-800 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Door Collections</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Explore our wide range of doors designed to match every style, need, and budget.
        </p>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Image Gallery */}
          <div>
            <div className="mb-4">
              <img
                src={product.images && product.images.length > 0 ? product.images[selectedImage] : 'https://via.placeholder.com/300'}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images && product.images.length > 0 &&
                product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className={`w-full h-24 object-cover rounded cursor-pointer 
                      ${selectedImage === index ? 'border-4 border-amber-800' : 'opacity-70 hover:opacity-100'}`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">{product.name}</h1>
            <p className="text-lg font-sans text-gray-700 leading-relaxed mb-8">{product.description}</p>
            <p className="text-2xl font-sans font-semibold text-amber-700 mb-6">
              ₹{product.price.toLocaleString('en-IN')}
            </p>

            {/* Product Specifications */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-2xl font-bold mb-4 font-serif">Product Specifications</h3>
              <ul className="space-y-3">
                <li className="text-gray-700 font-sans"><span className="font-medium">Material:</span> {product.material}</li>
                <li className="text-gray-700 font-sans"><span className="font-medium">Color:</span> {product.color}</li>
                <li className="text-gray-700 font-sans"><span className="font-medium">Suitable For:</span> {product.suitableFor}</li>
                <li className="text-gray-700 font-sans"><span className="font-medium">Stock:</span> {product.stock}</li>
                <li className="text-gray-700 font-sans"><span className="font-medium">Lock Included:</span> {product.lockIncluded ? 'Yes' : 'No'}</li>
              </ul>
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">• {feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Section */}
            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Contact for Inquiry</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {contactOptions.map((option, index) => (
                  <a
                    key={index}
                    href={`${option.type === 'phone' ? 'tel:' : 'https://wa.me/'}${option.value.replace(/\D/g, '')}`}
                    className="flex items-center bg-white p-4 rounded-lg shadow-md hover:bg-amber-100 transition"
                  >
                    <option.icon className="w-6 h-6 text-amber-800 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800">{option.method}</p>
                      <p className="text-gray-600">{option.value}</p>
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
