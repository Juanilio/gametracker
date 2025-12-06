import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function EstadisticasPersonales() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    api.get("/games").then(res => setGames(res.data));
  }, []);

  const total = games.length;
  const completados = games.filter(g => g.completed).length;
  const horas = games.reduce((sum, g) => sum + (g.hoursPlayed || 0), 0);
  const promedio =
    games.length > 0
      ? (games.reduce((s, g) => s + (g.rating || 0), 0) / games.length).toFixed(2)
      : "-";

  return (
    <div className="container">
      <h1>Estadísticas</h1>

      <p>Total de juegos: {total}</p>
      <p>Completados: {completados}</p>
      <p>Horas totales jugadas: {horas}</p>
      <p>Rating promedio: {promedio}</p>
    </div>
  );
}
