import React, { useEffect, useState } from "react"; // React y hooks para efectos y estado
import { useParams, Link, useNavigate } from "react-router-dom"; // hooks de ruta y componentes de navegación
import api from "../services/api"; // cliente HTTP para la API
import ListaReseñas from "./ListaReseñas"; // lista de reseñas del juego
import FormularioReseña from "./FormularioReseña"; // formulario para agregar reseña

export default function DetalleJuego() { // vista de detalle de un juego
  const { id } = useParams(); // toma el id de la URL
  const navigate = useNavigate(); // permite redirigir
  const [game, setGame] = useState(null); // estado con el juego cargado

  const cargar = () => { // función que obtiene el detalle del juego
    api.get(`/games/${id}`).then(res => setGame(res.data)); // GET a /games/:id y guarda respuesta
  };

  useEffect(() => cargar(), [id]); // carga cuando cambia el id

  const eliminar = async () => { // elimina el juego actual
    await api.delete(`/games/${id}`); // DELETE a /games/:id
    navigate("/"); // vuelve a inicio
  };

  if (!game) return <p>Cargando...</p>; // estado de carga

  return (
    <div className="container"> {/* contenedor de contenido */}
      <h1>{game.title}</h1> {/* título del juego */}
      <img
        src={game.coverUrl || "https://via.placeholder.com/200"} // usa placeholder si no hay portada
        alt={game.title} // texto alternativo
      />

      <p>Plataforma: {game.platform}</p> // muestra plataforma
      <p>Horas: {game.hoursPlayed}</p> // horas jugadas
      <p>Rating: {game.rating ?? "—"}</p> // puntuación o guion
      <p>{game.completed ? "Completado" : "En progreso"}</p> // estado de avance
      <p>Géneros: {game.genres.join(", ")}</p> // lista de géneros

      <Link to={`/editar/${game._id}`}>Editar</Link> {/* enlace a edición */}
      <button onClick={eliminar}>Eliminar</button> {/* botón para borrar */}

      <h2>Reseñas</h2> {/* sección de reseñas */}
      <ListaReseñas gameId={id} /> {/* lista de reseñas del juego */}
      <FormularioReseña gameId={id} onDone={cargar} /> {/* formulario y recarga tras enviar */}
    </div>
  );
}
