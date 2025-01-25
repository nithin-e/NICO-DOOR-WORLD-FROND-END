export const Hero = () => {
    return (
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
                <button className="bg-white text-amber-800 px-8 py-3 rounded-full font-medium hover:bg-amber-50 transition">
                  View Catalogue
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-amber-800 transition">
                  Book Consultation
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/api/placeholder/600/400" 
                alt="Showroom Display" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };