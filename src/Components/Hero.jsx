import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ProductSection } from './ProductSection';
import { FeaturesSection } from './FeaturesSection';
import { ContactSection } from './ContactSection';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, Star, Shield, Wrench, Award } from 'lucide-react';

export const Hero = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { title: "Custom Design", description: "Tailored to your exact specifications", icon: Star },
    { title: "Premium Materials", description: "Highest quality materials sourced globally", icon: Shield },
    { title: "Expert Craftsmanship", description: "Master artisans with decades of experience", icon: Wrench },
    { title: "Perfect Finish", description: "Flawless execution and attention to detail", icon: Award }
  ];

  return (
    <>
      <Navbar />
      <div 
        ref={heroRef}
        className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 text-white mt-[60px] overflow-hidden"
      >
        {/* Background gradient following mouse movement (disabled on small screens) */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000 ease-out hidden sm:block"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(251, 191, 36, 0.15), transparent 50%)`,
          }}
        ></div>

        <motion.div 
          className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-12 sm:py-16 lg:py-20 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div 
              className="lg:col-span-6 text-center lg:text-left"
              ref={ref}
              initial={{ opacity: 0, x: -100 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              {/* Small banner text */}
              <motion.div 
                className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full mb-4 shadow-lg shadow-amber-900/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 20px -4px rgba(217, 119, 6, 0.5)" }}
              >
                <span className="text-sm font-medium uppercase tracking-wider text-white flex items-center gap-2">
                  <Star className="w-4 h-4" /> Handcrafted Excellence
                </span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <motion.span 
                  className="block mb-2 text-white relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Elevate Your Home
                </motion.span>
                <motion.span 
                  className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  With Masterpiece Doors
                </motion.span>
              </h1>

              <motion.p 
                className="text-base sm:text-lg mb-8 max-w-2xl mx-auto lg:mx-0 text-amber-100/90 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Experience the perfect blend of artistry and engineering. Our doors aren't just entryways—they're statements of style, guardians of privacy, and showcases of exceptional craftsmanship.
              </motion.p>

              {/* Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/ProductList')}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg flex items-center gap-2"
                >
                  Discover Our Collection <ChevronRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/')}
                  className="border-2 border-amber-400 text-amber-200 px-6 py-3 rounded-lg font-semibold hover:bg-amber-400/10 transition flex items-center gap-2"
                >
                  Schedule Consultation <ChevronRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Feature Cards */}
            <motion.div 
              className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {features.map((feature, index) => (
                <motion.div key={index} className="p-4 rounded-xl bg-amber-800/50 border border-amber-700">
                  <feature.icon className="w-6 h-6 text-white mb-2" />
                  <h3 className="text-lg font-semibold text-amber-200">{feature.title}</h3>
                  <p className="text-sm text-amber-100/80">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <ProductSection />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Hero;
