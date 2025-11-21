import React, { useEffect, useState } from "react"; // React y hooks
import api from "../services/api"; // cliente API

export default function EstadisticasPersonales() { // vista de estadísticas
  const [games, setGames] = useState([]); // estado con juegos

  useEffect(() => { // carga inicial de juegos
    api.get("/games").then(res => setGames(res.data)); // GET /games
  }, []);

  const total = games.length; // conteo total
  const completados = games.filter(g => g.completed).length; // juegos completados
  const horas = games.reduce((sum, g) => sum + (g.hoursPlayed || 0), 0); // suma de horas
  const promedio = // promedio de rating
    games.length > 0
      ? (games.reduce((s, g) => s + (g.rating || 0), 0) / games.length).toFixed(2)
      : "-";

  return (
    <div className="container"> {/* layout */}
      <h1>Estadísticas</h1> {/* título */}

      <p>Total de juegos: {total}</p> {/* total */}
      <p>Completados: {completados}</p> {/* completados */}
      <p>Horas totales jugadas: {horas}</p> {/* horas */}
      <p>Rating promedio: {promedio}</p> {/* promedio */}
    </div>
  );
}

/* Resumen de estructura:
- Obtiene juegos y calcula métricas derivadas (total, completados, horas, rating promedio)
- Presenta estadísticas simples en una vista */
