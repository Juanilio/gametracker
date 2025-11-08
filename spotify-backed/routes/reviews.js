const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

// Rutas anidadas para reseñas de un juego
router.get('/game/:gameId', reviewsController.getReviewsForGame);
router.post('/game/:gameId', reviewsController.createReview);

// Operaciones por id de reseña
router.put('/:id', reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
