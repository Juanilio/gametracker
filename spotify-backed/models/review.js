const mongoose = require('mongoose'); // Importa Mongoose

const ReviewSchema = new mongoose.Schema({ // Define el esquema de un documento 'Review'
  author: { type: String, default: 'Anon' }, // Autor de la reseña (por defecto 'Anon')
  content: { type: String, required: true }, // Texto de la reseña (obligatorio)
  rating: { type: Number, min: 0, max: 5, required: true }, // Puntuación (0 a 5, obligatoria)
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true }, // ID del juego al que pertenece (referencia a Game)
  createdAt: { type: Date, default: Date.now } // Fecha de creación automática
});

module.exports = mongoose.model('Review', ReviewSchema); // Crea el modelo 'Review' y lo exporta

/* Resumen de estructura:
- Esquema de reseña con autor, contenido, rating y relación al juego
- Modelo 'Review' para CRUD sobre la colección de reseñas */
