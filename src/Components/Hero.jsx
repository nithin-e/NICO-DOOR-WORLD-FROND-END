import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ProductSection } from './ProductSection';
import { FeaturesSection } from './FeaturesSection';
import {ContactSection} from './ContactSection'
import { useNavigate } from 'react-router-dom';



export const Hero = () => {
  const navigate = useNavigate();
  

  
  return (
    <>
      <Navbar />

      <div className="relative bg-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Quality Doors for Your Dream Home
              </h1>
              <p className="text-lg mb-8">
                Visit our showroom to explore our extensive collection of premium doors. Expert consultation available.
              </p>
              <div className="flex gap-4">
                <button  onClick={() => navigate('/ProductList')} className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-amber-800 transition cursor-pointer">
                  View Collection
                 
                </button>
              </div>
            </div>
            <div className="hidden md:block">
            </div>
          </div>
        </div>
      </div>

      <ProductSection />
      <FeaturesSection />
      <ContactSection/>

      
      <Footer />
    </>
  );
};
