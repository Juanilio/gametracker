import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ListaReseñas({ gameId }) {
  const [reviews, setReviews] = useState([]);

  const cargar = () => {
    api.get(`/reviews/game/${gameId}`).then(res => setReviews(res.data));
  };

  useEffect(() => cargar(), [gameId]);

  const eliminar = async (id) => {
    await api.delete(`/reviews/${id}`);
    cargar();
  };

  return (
    <div>
      {reviews.map(r => (
        <div key={r._id} className="review">
          <p><strong>{r.author}</strong> — {r.rating}/5</p>
          <p>{r.content}</p>
          <button onClick={() => eliminar(r._id)}>Eliminar</button>
        </div>
      ))}

      {reviews.length === 0 && <p>No hay reseñas todavía.</p>}
    </div>
  );
}
