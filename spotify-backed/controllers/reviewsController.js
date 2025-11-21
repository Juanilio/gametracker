const Review = require('../models/review'); // Importa el modelo de reseñas
const Game = require('../models/Game'); // Importa el modelo de juegos

exports.getReviewsForGame = async (req, res) => { // Lista reseñas para un juego concreto
  const reviews = await Review.find({ game: req.params.gameId }).sort('-createdAt'); // Busca reseñas por gameId y ordena descendente por fecha
  res.json(reviews); // Devuelve la lista de reseñas en JSON
};

exports.createReview = async (req, res) => { // Crea una reseña para un juego
  const { author, content, rating } = req.body; // Extrae campos del cuerpo de la petición
  const game = await Game.findById(req.params.gameId); // Busca el juego al que se asociará la reseña
  if (!game) return res.status(404).json({ message: 'Game not found' }); // Si el juego no existe, devuelve 404

  const review = new Review({ author, content, rating, game: game._id }); // Crea la reseña asociándola al juego
  await review.save(); // Guarda la reseña
  game.reviews.push(review._id); // Inserta el ID de la reseña en el array de 'reviews' del juego
  await game.save(); // Guarda el juego con la referencia actualizada

  res.status(201).json(review); // Devuelve la reseña creada con status 201 (creado)
};

exports.updateReview = async (req, res) => { // Actualiza una reseña por ID
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Busca y actualiza la reseña; devuelve la nueva versión
  if (!review) return res.status(404).json({ message: 'Review not found' }); // Si no existe, 404
  res.json(review); // Devuelve la reseña actualizada
};

exports.deleteReview = async (req, res) => { // Elimina una reseña por ID
  const review = await Review.findById(req.params.id); // Busca la reseña
  if (!review) return res.status(404).json({ message: 'Review not found' }); // Si no existe, 404
  await Game.findByIdAndUpdate(review.game, { $pull: { reviews: review._id } }); // Quita la referencia de la reseña en el juego
  await review.remove(); // Elimina la reseña de la base
  res.json({ message: 'Review eliminada' }); // Devuelve confirmación de eliminación
};

/* Resumen de estructura:
- CRUD parcial de reseñas: crear, listar por juego, actualizar y eliminar
- Al crear, añade referencia de la reseña al juego; al eliminar, la quita */
