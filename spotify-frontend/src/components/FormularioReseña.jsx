import React, { useState } from "react"; // hook de estado local
import api from "../services/api"; // cliente API

export default function FormularioReseña({ gameId, onDone }) { // formulario para crear reseña
  const [form, setForm] = useState({ // estado del formulario
    author: "", // autor
    rating: "", // puntuación
    content: "" // contenido
  });

  const handleChange = e => { // actualiza el estado al escribir
    setForm({
      ...form,
      [e.target.name]: e.target.value // asignación por nombre de campo
    });
  };

  const handleSubmit = async e => { // envía datos a la API
    e.preventDefault(); // evita recarga
    await api.post(`/reviews/game/${gameId}`, form); // POST: crea reseña para el juego
    setForm({ author: "", rating: "", content: "" }); // limpia el formulario
    onDone(); // callback para actualizar la vista padre
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}> {/* layout del formulario */}
      <h3>Agregar reseña</h3>
      <input name="author" placeholder="Autor" value={form.author} onChange={handleChange} /> {/* autor */}
      <input type="number" min="0" max="5" name="rating" placeholder="Puntuación (0-5)" value={form.rating} onChange={handleChange} /> {/* rating */}
      <textarea name="content" placeholder="Escribe tu reseña..." value={form.content} onChange={handleChange} /> {/* contenido */}
      <button type="submit">Enviar</button> {/* enviar */}
    </form>
  );
}

/* Resumen de estructura:
- Mantiene estado controlado para autor, rating y contenido
- Envía POST a /reviews/game/:gameId y notifica al padre vía onDone
- Limpia los campos tras el envío */
