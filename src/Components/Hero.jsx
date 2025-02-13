import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ProductSection } from './ProductSection';
import { FeaturesSection } from './FeaturesSection';
import { ContactSection } from './ContactSection';
import { useNavigate } from 'react-router-dom';
import doorImage from '../uploads/WhatsApp Image 2025-02-10 at 10.43.36_e45b50d3.jpg';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="relative bg-amber-800 text-white mt-[60px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text Section */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Quality Doors for Your Dream Home
              </h1>
              <p className="text-base sm:text-lg mb-6 md:mb-8">
                Visit our showroom to explore our extensive collection of premium doors. Expert consultation available.
              </p>
              <div className="flex justify-center md:justify-start">
                <button
                  onClick={() => navigate('/ProductList')}
                  className="border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium hover:bg-white hover:text-amber-800 transition"
                >
                  View Collection
                </button>
              </div>
            </div>
            {/* Image Section */}
            <div className="flex justify-center md:justify-end">
              <img
                src={doorImage}
                alt="Premium Doors"
                className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <ProductSection />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </>
  );
};