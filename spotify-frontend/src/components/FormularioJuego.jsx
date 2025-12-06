import React, { useEffect, useState } from "react"; // React y hooks
import { Link } from 'react-router-dom'; // componente de enlace (no usado aquí)
import { useNavigate, useParams } from "react-router-dom"; // hooks para navegación y parámetros
import api from "../services/api"; // cliente HTTP

export default function FormularioJuego() { // formulario para crear/editar juego
  const { id } = useParams(); // id del juego si se edita
  const navigate = useNavigate(); // para redirigir tras guardar

  const [form, setForm] = useState({ // estado controlado del formulario
    title: "", // título
    platform: "", // plataforma
    hoursPlayed: '', // horas jugadas
    completed: false, // estado completado
    rating: "", // puntuación
    genres: "", // géneros como texto separado por comas
  });

  useEffect(() => { // carga datos si existe id
    if (id) {
      api.get(`/games/${id}`).then(res => { // GET juego por id
        const g = res.data; // respuesta
        setForm({
          ...g, // precarga campos
          genres: g.genres?.join(", ") || "" // convierte array a texto
        });
      });
    }
  }, [id]); // se ejecuta cuando cambia id

  const handleChange = e => { // actualiza campos del formulario
    const { name, value, type, checked } = e.target; // datos del input
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value // maneja checkbox vs texto
    });
  };

  const handleSubmit = async (e) => { // envía formulario
    e.preventDefault(); // evita recarga

    const body = { // normaliza payload
      ...form,
      genres: form.genres.split(",").map(s => s.trim()) // texto -> array de géneros
    };

    if (id) { // decide crear o actualizar
      await api.put(`/games/${id}`, body); // actualizar
    } else {
      await api.post("/games", body); // crear
    }

    window.dispatchEvent(new CustomEvent('app:toast', { detail: { message: 'El juego se ha subido correctamente' } }));

    navigate("/"); // vuelve al inicio
  };

  return (
    <div className="container"> {/* layout */}
      <h2>{id ? "Editar Juego" : "Agregar Juego"}</h2> {/* encabezado dinámico */}

      <form className="form" onSubmit={handleSubmit}> {/* formulario controlado */}
        <input name="title" placeholder="Título" value={form.title} onChange={handleChange} required /> {/* título */}
        <input name="platform" placeholder="Plataforma" value={form.platform} onChange={handleChange} /> {/* plataforma */}
        <input name="hoursPlayed" type="number" placeholder="Horas jugadas" value={form.hoursPlayed} onChange={handleChange} /> {/* horas */}
        <input name="rating" type="number" min="0" max="5" placeholder="Rating (0-5)" value={form.rating} onChange={handleChange} /> {/* rating */}

        <input name="genres" placeholder="Géneros (separados por coma)" value={form.genres} onChange={handleChange} /> {/* géneros texto */}

        <label> {/* checkbox de completado */}
          <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} />
          Completado
        </label>

        <button type="submit">Guardar</button> {/* acción guardar */}
      </form>
    </div>
  );
}

/* Resumen de estructura:
- Usa estado controlado para los campos del juego
- Si hay id, precarga datos y convierte géneros array->texto
- Al enviar, normaliza géneros texto->array y hace POST/PUT
- Redirige a la biblioteca al finalizar */
