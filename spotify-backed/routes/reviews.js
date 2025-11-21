const express = require('express'); // Importa Express
const router = express.Router(); // Crea un enrutador para rutas de reseñas
const reviewsController = require('../controllers/reviewsController'); // Importa el controlador de reseñas

// Rutas anidadas para reseñas de un juego
router.get('/game/:gameId', reviewsController.getReviewsForGame); // GET /api/reviews/game/:gameId -> lista reseñas del juego
router.post('/game/:gameId', reviewsController.createReview); // POST /api/reviews/game/:gameId -> crea reseña para ese juego

// Operaciones por id de reseña
router.put('/:id', reviewsController.updateReview); // PUT /api/reviews/:id -> actualiza una reseña por ID
router.delete('/:id', reviewsController.deleteReview); // DELETE /api/reviews/:id -> elimina una reseña por ID

module.exports = router; // Exporta el router para usarlo en server.js

/* Resumen de estructura:
- Rutas para listar/crear reseñas por juego y actualizar/eliminar por ID
- Separa responsabilidades en un router modular */
