import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Importar estilos de Mapbox

// Configurar token de acceso
mapboxgl.accessToken = 'TU_MAPBOX_ACCESS_TOKEN';

const MapaExperiencias = ({ experiencias }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Inicializar mapa
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.0, -9.0], // Coordenadas iniciales (Perú)
      zoom: 5
    });

    // Agregar marcadores al mapa
    experiencias.forEach(exp => {
      const { latitud, longitud, titulo } = exp;

      // Crear un popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(titulo);

      // Crear un marcador
      new mapboxgl.Marker()
        .setLngLat([longitud, latitud])
        .setPopup(popup) // Asociar el popup
        .addTo(map);
    });

    // Limpiar el mapa al desmontar el componente
    return () => map.remove();
  }, [experiencias]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '500px' }} // Ajusta el tamaño según sea necesario
    ></div>
  );
};

export default MapaExperiencias;
