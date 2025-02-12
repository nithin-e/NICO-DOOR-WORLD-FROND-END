import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAf6mjA62U0Z1XLEG5xKfnEyrfk92ogTvM';

const LocationMap = () => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Default Location: "Q76G+JH Shoranur, Kerala"
  const center = { lat: 10.7652, lng: 76.2707 };

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (!containerRef.current) return;

      try {
        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places'],
        });

        await loader.load();

        if (!isMounted || !containerRef.current) return;

        // Initialize map
        if (!mapRef.current) {
          mapRef.current = new window.google.maps.Map(containerRef.current, {
            center,
            zoom: 15, // ✅ Adjusted zoom level
            mapTypeId: 'roadmap',
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          });
        } else {
          mapRef.current.setCenter(center);
        }

        // ✅ Add marker at Shoranur, Kerala
        if (!markerRef.current) {
          markerRef.current = new window.google.maps.Marker({
            position: center,
            map: mapRef.current,
            title: 'Shoranur, Kerala',
          });
        } else {
          markerRef.current.setPosition(center);
        }

        setIsLoading(false);
      } catch (err) {
        if (isMounted) {
          console.error('Error initializing map:', err);
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    initMap();

    return () => {
      isMounted = false;
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []); // ✅ Runs only once when component mounts

  if (error) {
    return (
      <div className="w-full h-64 bg-red-50 rounded-lg flex items-center justify-center">
        <p className="text-red-600">Failed to load map: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 relative rounded-lg overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-600">Loading map...</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
