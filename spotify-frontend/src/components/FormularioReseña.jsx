// ...
import React, { useState } from "react";
import api from "../services/api";

export default function FormularioReseña({ gameId, onDone }) {
  const [form, setForm] = useState({
    author: "",
    rating: "",
    content: ""
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post(`/reviews/game/${gameId}`, form);
    window.dispatchEvent(new CustomEvent('app:toast', { detail: { message: 'La reseña se ha subido correctamente' } }));
    setForm({ author: "", rating: "", content: "" });
    onDone();
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Agregar reseña</h3>
      <input type="text" name="author" placeholder="Autor" value={form.author} onChange={handleChange} />
      <input type="number" min="0" max="5" name="rating" placeholder="Puntuación (0-5)" value={form.rating} onChange={handleChange} />
      <textarea name="content" placeholder="Escribe tu reseña..." value={form.content} onChange={handleChange} />
      <button type="submit">Enviar</button>
    </form>
  );
}