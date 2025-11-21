import React, { useEffect, useState } from "react"; // React y hooks
import api from "../services/api"; // cliente API

export default function ListaReseñas({ gameId }) { // lista de reseñas para un juego
  const [reviews, setReviews] = useState([]); // estado con reseñas

  const cargar = () => { // obtiene reseñas del juego
    api.get(`/reviews/game/${gameId}`).then(res => setReviews(res.data)); // GET por gameId
  };

  useEffect(() => cargar(), [gameId]); // recarga cuando cambia el juego

  const eliminar = async (id) => { // elimina reseña por id
    await api.delete(`/reviews/${id}`); // DELETE /reviews/:id
    cargar(); // vuelve a cargar lista
  };

  return (
    <div> {/* contenedor de reseñas */}
      {reviews.map(r => (
        <div key={r._id} className="review"> {/* tarjeta de reseña */}
          <p><strong>{r.author}</strong> — {r.rating}/5</p> {/* autor y rating */}
          <p>{r.content}</p> {/* contenido */}
          <button onClick={() => eliminar(r._id)}>Eliminar</button> {/* acción borrar */}
        </div>
      ))}

      {reviews.length === 0 && <p>No hay reseñas todavía.</p>} {/* mensaje vacío */}
    </div>
  );
}

/* Resumen de estructura:
- Carga reseñas de /reviews/game/:gameId
- Mapea reseñas en tarjetas con autor, rating y contenido
- Permite eliminar y recargar la lista */
