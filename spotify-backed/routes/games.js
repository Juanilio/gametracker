const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');

router.get('/', gamesController.getGames);
router.post('/', gamesController.createGame);
router.get('/:id', gamesController.getGameById);
router.put('/:id', gamesController.updateGame);
router.delete('/:id', gamesController.deleteGame);

module.exports = router;
