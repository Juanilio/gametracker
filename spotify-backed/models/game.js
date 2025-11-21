const mongoose = require('mongoose'); // Importa Mongoose para definir esquemas y modelos

const GameSchema = new mongoose.Schema({ // Define el esquema de un documento 'Game'
  title: { type: String, required: true }, // Título del juego (obligatorio)
  platform: { type: String, default: 'PC' }, // Plataforma (por defecto 'PC')
  coverUrl: { type: String, default: '' }, // URL de la portada del juego
  hoursPlayed: { type: Number, default: 0 }, // Horas jugadas (número, empieza en 0)
  completed: { type: Boolean, default: false }, // Si el juego está completado (booleano)
  rating: { type: Number, min: 0, max: 5, default: null }, // Puntuación (0 a 5), puede ser nulo
  genres: [String], // Lista de géneros (array de strings)
  releaseDate: Date, // Fecha de lanzamiento (opcional)
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // IDs de reseñas relacionadas (referencia a Review)
  createdAt: { type: Date, default: Date.now } // Fecha de creación automática
});

module.exports = mongoose.model('Game', GameSchema); // Crea el modelo 'Game' y lo exporta

/* Resumen de estructura:
- Esquema del juego con campos básicos, métricas y relaciones a reseñas
- Modelo 'Game' para operaciones con la colección en MongoDB */
