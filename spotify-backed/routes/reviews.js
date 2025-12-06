const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.get('/game/:gameId', reviewsController.getReviewsForGame);
router.post('/game/:gameId', reviewsController.createReview);
router.put('/:id', reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
