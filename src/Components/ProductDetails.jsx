// src/pages/ProductDetailPage.jsx
import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Phone, MessageCircle } from 'lucide-react';

const ProductDetailPage = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Sample product (you'd typically pass this from a parent component or fetch)
  const dummyProduct = {
    id: 1,
    name: 'Classic Wooden Door',
    description: 'Elegant solid wood door crafted with precision and care.',
    price: 599,
    images: [
      '/api/placeholder/600/800',
      '/api/placeholder/600/800',
      '/api/placeholder/600/800',
      '/api/placeholder/600/800'
    ],
    specifications: [
      'Material: Solid Oak Wood',
      'Thickness: 45mm',
      'Finish: Hand-rubbed Walnut Stain',
      'Size: Standard 36" x 80"',
      'Weight: 65 lbs',
      'Frame: Solid Hardwood'
    ],
    features: [
      'Hand-carved Decorative Panels',
      'Weather-resistant Coating',
      'Multi-point Locking System',
      'Thermal Insulation',
      'Soundproofing Properties'
    ]
  };

  const contactOptions = [
    {
      icon: Phone,
      method: 'Call Us',
      value: '+1 (234) 567-8900',
      type: 'phone'
    },
    {
      icon: MessageCircle,
      method: 'WhatsApp',
      value: '+1 (234) 567-8901',
      type: 'whatsapp'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="bg-amber-800 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Door Collections</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Explore our wide range of doors designed to match every style, need, and budget.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="mb-4">
              <img 
                src={dummyProduct.images[selectedImage]} 
                alt={dummyProduct.name}
                className="w-full h-[500px] object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {dummyProduct.images.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`${dummyProduct.name} view ${index + 1}`}
                  className={`w-full h-24 object-cover rounded cursor-pointer 
                    ${selectedImage === index 
                      ? 'border-4 border-amber-800' 
                      : 'opacity-70 hover:opacity-100'
                    }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {dummyProduct.name}
            </h1>
            <p className="text-gray-600 mb-6">{dummyProduct.description}</p>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
              <ul className="space-y-2">
                {dummyProduct.specifications.map((spec, index) => (
                  <li key={index} className="text-gray-600">
                    • {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {dummyProduct.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>

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