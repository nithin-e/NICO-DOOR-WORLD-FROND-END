import { useEffect, useRef, useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Phone, Clock, Mail, MapPin } from "lucide-react";
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_MAPS_API_KEY = 'AIzaSyAf6mjA62U0Z1XLEG5xKfnEyrfk92ogTvM';


const ContactForNicco = () => {
  const [isVisible, setIsVisible] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsVisible(true);

  
    const center = { lat: 10.7652, lng: 76.2707 };

    const initMap = async () => {
      if (!mapContainerRef.current) return;

      try {
        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: "weekly",
        });

        await loader.load();

        if (!mapContainerRef.current) return;

        if (!mapRef.current) {
          mapRef.current = new google.maps.Map(mapContainerRef.current, {
            center,
            zoom: 15,
            mapTypeId: "roadmap",
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          });
        } else {
          mapRef.current.setCenter(center);
        }

        if (!markerRef.current) {
          markerRef.current = new google.maps.Marker({
            position: center,
            map: mapRef.current,
            title: "Our Location",
          });
        } else {
          markerRef.current.setPosition(center);
        }
      } catch (err) {
        console.error("Error loading Google Maps:", err);
        setError(err.message);
      }
    };

    initMap();
  }, []);

  const contactInfo = [
    { icon: <Phone className="w-6 h-6" />, title: "Phone", content: "+1 (555) 123-4567" },
    { icon: <Mail className="w-6 h-6" />, title: "Email", content: "info@doorshopping.com" },
    { icon: <Clock className="w-6 h-6" />, title: "Working Hours", content: "Mon-Sat: 9AM-6PM" },
    { icon: <MapPin className="w-6 h-6" />, title: "Location", content: "123 Door Street, NY" },
  ];

  const services = ["High-quality doors", "Custom door designs", "Fast delivery", "Door installation services"];
  const history =
    "Our shop has been providing the best quality doors for over 20 years. We are known for our commitment to customer satisfaction and our ability to offer a wide range of styles to suit every home and business.";

  return (
    <>
      <Navbar />
      <div className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        {/* Hero Section */}
        <div className="bg-amber-800 text-white py-16 mt-[60px]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Visit our showroom to explore our collection or contact us for expert consultation
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-amber-100 rounded-full text-amber-800">{info.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg text-amber-800">{info.title}</h3>
                    <p className="text-amber-900">{info.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            {error ? (
              <div className="w-full h-64 bg-red-50 flex items-center justify-center">
                <p className="text-red-600">Failed to load map: {error}</p>
              </div>
            ) : (
              <div ref={mapContainerRef} className="w-full h-64" />
            )}
          </div>

         
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-6 text-amber-800">Our Services</h3>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center space-x-3 text-amber-900 hover:translate-x-2 transition-transform duration-300">
                    <span className="w-2 h-2 bg-amber-800 rounded-full"></span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* History Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-6 text-amber-800">Our History</h3>
              <p className="text-amber-900 leading-relaxed">{history}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactForNicco;
