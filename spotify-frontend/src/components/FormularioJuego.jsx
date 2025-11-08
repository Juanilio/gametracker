import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function FormularioJuego() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    platform: "",
    coverUrl: "",
    hoursPlayed: 0,
    completed: false,
    rating: "",
    genres: "",
  });

  useEffect(() => {
    if (id) {
      api.get(`/games/${id}`).then(res => {
        const g = res.data;
        setForm({
          ...g,
          genres: g.genres?.join(", ") || ""
        });
      });
    }
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...form,
      genres: form.genres.split(",").map(s => s.trim())
    };

    if (id) {
      await api.put(`/games/${id}`, body);
    } else {
      await api.post("/games", body);
    }

    navigate("/");
  };

  return (
    <div className="container">
      <h2>{id ? "Editar Juego" : "Agregar Juego"}</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
        <input name="platform" placeholder="Plataforma" value={form.platform} onChange={handleChange} />
        <input name="coverUrl" placeholder="URL de portada" value={form.coverUrl} onChange={handleChange} />
        <input name="hoursPlayed" type="number" placeholder="Horas jugadas" value={form.hoursPlayed} onChange={handleChange} />
        <input name="rating" type="number" min="0" max="5" placeholder="Rating (0-5)" value={form.rating} onChange={handleChange} />

        <input name="genres" placeholder="Géneros (separados por coma)" value={form.genres} onChange={handleChange} />

        <label>
          <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} />
          Completado
        </label>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
