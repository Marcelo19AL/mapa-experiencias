import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Mapa from './components/Mapa';

function App() {
  const [experiencias, setExperiencias] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener experiencias
    const fetchExperiencias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/experiencias'); // Ajusta el endpoint según tu backend
        setExperiencias(response.data); // Establece las experiencias obtenidas en el estado
      } catch (error) {
        console.error('Error al obtener experiencias:', error);
      }
    };

    fetchExperiencias();
  }, []);

  return (
    <div>
      <h1>Mapa de Experiencias</h1>
      <Mapa experiencias={experiencias} />
    </div>
  );
}

export default App;
