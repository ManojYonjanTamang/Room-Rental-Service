// LeafletMap.jsx

import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ onMapClick }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Initialize the map at Kathmandu, Nepal
    const leafletMap = L.map('map').setView([27.7172, 85.3240], 13);

    // Add a tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap);

    // Add a marker at Kathmandu
    const marker = L.marker([27.7172, 85.3240]).addTo(leafletMap);
    marker.bindPopup('Kathmandu, Nepal').openPopup();

    // Set the map instance to state
    setMap(leafletMap);

    // Add a click event listener to the map
    leafletMap.on('click', handleMapClick);

    return () => {
      // Clean up the map instance when the component unmounts
      leafletMap.off('click', handleMapClick);
      leafletMap.remove();
    };
  }, []); // Empty dependency array to run this effect only once

  const handleMapClick = (event) => {
    onMapClick({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
    });
  };

  return <div id="map" style={{ height: '400px' }}></div>;
};

export default LeafletMap;
