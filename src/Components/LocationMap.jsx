import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAf6mjA62U0Z1XLEG5xKfnEyrfk92ogTvM';

const LocationMap = () => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

        if (!mapRef.current) {
          mapRef.current = new window.google.maps.Map(containerRef.current, {
            center,
            zoom: 15,
            mapTypeId: 'roadmap',
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: [
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#44403c" }]
              },
              {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [{ color: "#e2e8f0" }]  // Lighter blue color
              },
              {
                featureType: "landscape",
                elementType: "geometry.fill",
                stylers: [{ color: "#f8fafc" }]  // Very light background
              },
              {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [{ color: "#94a3b8" }]  // Medium gray for roads
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#64748b" }]  // Darker gray for road borders
              }
            ]
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 12px; min-width: 200px;">
                <h3 style="font-weight: 600; margin-bottom: 8px; color: #292524;">Nice Door World</h3>
                <p style="color: #57534e; font-size: 14px;">Near SMP junction, kulapully</p>
                <p style="color: #57534e; font-size: 14px; margin-top: 4px;">Open Today: 9:00 AM - 6:00 PM</p>
              </div>
            `
          });

          if (!markerRef.current) {
            markerRef.current = new window.google.maps.Marker({
              position: center,
              map: mapRef.current,
              title: 'Nice Door World',
              animation: window.google.maps.Animation.DROP
            });

            markerRef.current.addListener('click', () => {
              infoWindow.open(mapRef.current, markerRef.current);
            });
          }
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
    };
  }, []);

  return (
    <div className="w-full h-[350px] relative rounded-lg overflow-hidden shadow-md border border-stone-200">
      {error && (
        <div className="absolute inset-0 bg-stone-50 flex items-center justify-center">
          <p className="text-stone-600 text-center px-4">Unable to load map: {error}</p>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 bg-stone-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-stone-700 border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default LocationMap;