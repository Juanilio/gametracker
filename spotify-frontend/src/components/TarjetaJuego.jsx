import React from 'react';

export default function TarjetaJuego({ game }) {
  return (
    <div className="card">
      <img src={game.coverUrl || '/placeholder.png'} alt={game.title} />
      <h3>{game.title}</h3>
      <p>Plataforma: {game.platform}</p>
      <p>Horas: {game.hoursPlayed}</p>
      <p>Puntuación: {game.rating ?? '—'}</p>
      <p>{game.completed ? 'Completado' : 'En progreso'}</p>
      {/* botones: ver, editar, eliminar (llamar a API correspondiente) */}
    </div>
  );
}
