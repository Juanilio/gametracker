import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TarjetaJuego from './TarjetaJuego';

export default function BibliotecaJuegos() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const load = async () => {
      const res = await api.get('/games');
      setGames(res.data);
    };
    load();
  }, []);

  return (
    <div>
      <h2>Mi Biblioteca</h2>
      <div className="grid">
        {games.map(g => <TarjetaJuego key={g._id} game={g} />)}
      </div>
    </div>
  );
}
