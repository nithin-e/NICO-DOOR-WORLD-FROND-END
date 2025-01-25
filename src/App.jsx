import "./App.css";
import { Navbar } from "./Components/Navbar";
import { Hero } from "./Components/Hero";
import { ProductSection } from "./Components/ProductSection";
import { FeaturesSection } from "./Components/FeaturesSection";
import { ContactSection } from "./Components/ContactSection";
import { Footer } from "./Components/Footer";

function App() {
  return (
    <>
      {/* <div className=" min-h-screen flex flex-col gap-8 items-center justify-center  text-white text-[48px] font-bold bg-black">
        <h1 className="text-[56px]">🗿</h1>
        <h1>Hello World</h1>
      </div> */}
      <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <ProductSection />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </div> 
    </>
  );
}

export default App;
