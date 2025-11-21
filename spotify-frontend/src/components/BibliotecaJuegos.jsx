import React, { useEffect, useState } from 'react'; // React y hooks
import api from '../services/api'; // cliente para llamar a la API
import TarjetaJuego from './TarjetaJuego'; // componente tarjeta de juego

export default function BibliotecaJuegos() { // vista de listado de juegos
  const [games, setGames] = useState([]); // estado con el array de juegos
  useEffect(() => { // efecto al montar el componente
    const load = async () => { // función asíncrona de carga
      const res = await api.get('/games'); // GET /games para obtener todos los juegos
      setGames(res.data); // guarda los juegos recibidos
    };
    load(); // ejecuta la carga inicial
  }, []); // sin dependencias: solo una vez

  return (
    <div> {/* contenedor */}
      <h2>Mi Biblioteca</h2> {/* título de sección */}
      <div className="grid"> {/* rejilla de tarjetas */}
        {games.map(g => <TarjetaJuego key={g._id} game={g} />)} {/* renderiza cada juego */}
      </div>
    </div>
  );
}

/* Resumen de estructura:
- Al montar, solicita /games y guarda el resultado
- Renderiza una grilla de tarjetas con cada juego
- Delegación de detalles visuales a TarjetaJuego */
