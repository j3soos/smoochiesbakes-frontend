'use client'
import React, { useState, useEffect } from 'react';

function LocationPicker() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Load the Google Maps JavaScript API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA6fR9HKFU9nK1IWIIBgr1RBZkfMS5ZDTY&libraries=places`;
    script.defer = true;
    script.async = true;

    script.onload = () => {
      // Initialize the Google Maps Places Autocomplete
      const input = document.getElementById('location-input');
      const autocomplete = new google.maps.places.Autocomplete(input);

      // Listen for place changes
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          setSelectedLocation({
            name: place.name,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
          });
        }
      });
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <input
        id="location-input"
        type="text"
        placeholder="Search for a location"
        className="p-2 border border-gray-300 w-fit rounded"
      />
      {selectedLocation && (
        <div className="mt-4">
          <p>Selected Location: {selectedLocation.name}</p>
          <p>Latitude: {selectedLocation.latitude}</p>
          <p>Longitude: {selectedLocation.longitude}</p>
        </div>
      )}
    </div>
  );
}

export default LocationPicker;
