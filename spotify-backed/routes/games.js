const express = require('express'); // Importa Express
const router = express.Router(); // Crea un enrutador modular para las rutas de juegos
const gamesController = require('../controllers/gamesController'); // Importa el controlador con la lógica de juegos

router.get('/', gamesController.getGames); // GET /api/games -> lista juegos (con búsqueda opcional)
router.post('/', gamesController.createGame); // POST /api/games -> crea un nuevo juego
router.get('/:id', gamesController.getGameById); // GET /api/games/:id -> obtiene un juego por ID
router.put('/:id', gamesController.updateGame); // PUT /api/games/:id -> actualiza un juego por ID
router.delete('/:id', gamesController.deleteGame); // DELETE /api/games/:id -> elimina un juego y sus reseñas

module.exports = router; // Exporta el router para montarlo en server.js

/* Resumen de estructura:
- Define endpoints REST para juegos
- Delegación al controlador de juegos para la lógica */
