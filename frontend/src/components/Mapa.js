import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Token de acceso a Mapbox
mapboxgl.accessToken = 'TU_MAPBOX_ACCESS_TOKEN';

const Mapa = ({ experiencias }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    // Crear el mapa
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-77.0428, -12.0464], // Coordenadas iniciales (Lima, Perú)
      zoom: 5,
    });

    // Añadir marcadores dinámicos
    experiencias.forEach((exp) => {
      const { lat, lng, titulo } = exp;

      // Crear un popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(titulo);

      // Crear el marcador
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(popup) // Asociar el popup al marcador
        .addTo(map);
    });

    // Limpiar el mapa al desmontar
    return () => map.remove();
  }, [experiencias]);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '500px' }}
    ></div>
  );
};

export default Mapa;
