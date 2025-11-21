import React from 'react'; // componente funcional
import { useNavigate } from 'react-router-dom'; // hook para navegar programáticamente

export default function TarjetaJuego({ game }) { // tarjeta que muestra datos resumidos
  const navigate = useNavigate(); // obtiene función de navegación
  return (
    <div className="card" onClick={() => navigate(`/juego/${game._id}`)}> // al hacer clic, va al detalle
      <h3>{game.title}</h3> // título del juego
      <p>Plataforma: {game.platform}</p> // plataforma
      <p>Horas: {game.hoursPlayed}</p> // horas jugadas
      <p>Puntuación: {game.rating ?? '—'}</p> // rating o guion si falta
      <p>{game.completed ? 'Completado' : 'En progreso'}</p> // estado
      {/* botones: ver, editar, eliminar (llamar a API correspondiente) */}
    </div>
  );
}

/* Resumen de estructura:
- Muestra información básica del juego en una tarjeta
- Navega al detalle del juego al hacer clic
- Presentación concisa para usar en listados */
