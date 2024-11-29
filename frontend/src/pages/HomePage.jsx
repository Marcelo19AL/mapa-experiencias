import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapaExperiencias from '../components/MapaExperiencias';

const HomePage = () => {
  const [experiencias, setExperiencias] = useState([]);

  useEffect(() => {
    // Obtener experiencias de la API
    const fetchExperiencias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/experiencias'); // Cambia el endpoint si es necesario
        setExperiencias(response.data);
      } catch (error) {
        console.error('Error al obtener experiencias:', error);
      }
    };

    fetchExperiencias();
  }, []);

  return (
    <div>
      <h1>Mapa de Experiencias Compartidas</h1>
      <MapaExperiencias experiencias={experiencias} />
    </div>
  );
};

export default HomePage;
