const Game = require('../models/Game'); // Importa el modelo de juegos (colección Game)
const Review = require('../models/review'); // Importa el modelo de reseñas (colección Review)

exports.getGames = async (req, res) => { // Controlador para listar juegos
  const q = req.query.q || ''; // Lee parámetro de búsqueda 'q' (si no viene, usa cadena vacía)
  const filter = q ? { title: { $regex: q, $options: 'i' } } : {}; // Si hay 'q', filtra por título con regex insensible a mayúsculas
  const games = await Game.find(filter).populate('reviews'); // Busca juegos aplicando el filtro y rellena el campo 'reviews'
  res.json(games); // Devuelve la lista de juegos en formato JSON
};

exports.getGameById = async (req, res) => { // Controlador para obtener un juego por ID
  const game = await Game.findById(req.params.id).populate('reviews'); // Busca el juego por ID y rellena sus reseñas
  if (!game) return res.status(404).json({ message: 'Game not found' }); // Si no existe, devuelve 404
  res.json(game); // Si existe, devuelve el juego en JSON
};

exports.createGame = async (req, res) => { // Controlador para crear un juego nuevo
  const data = req.body; // Toma los datos del cuerpo de la petición
  const game = new Game(data); // Crea una instancia de Game con esos datos
  await game.save(); // Guarda el juego en la base de datos
  res.status(201).json(game); // Devuelve el juego creado con status 201 (creado)
};

exports.updateGame = async (req, res) => { // Controlador para actualizar un juego
  const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Busca y actualiza por ID; 'new: true' devuelve el actualizado
  if (!game) return res.status(404).json({ message: 'Game not found' }); // Si no existe, devuelve 404
  res.json(game); // Devuelve el juego actualizado en JSON
};

exports.deleteGame = async (req, res) => { // Controlador para eliminar un juego y sus reseñas
  // eliminar reseñas asociadas
  const game = await Game.findById(req.params.id); // Busca el juego por ID
  if (!game) return res.status(404).json({ message: 'Game not found' }); // Si no existe, devuelve 404
  await Review.deleteMany({ game: game._id }); // Borra todas las reseñas que referencian a este juego
  await game.remove(); // Elimina el juego de la base de datos
  res.json({ message: 'Game y reseñas eliminadas' }); // Devuelve confirmación de la eliminación
};

/* Resumen de estructura:
- CRUD de juegos con búsqueda por título
- Población de reseñas asociadas
- Al borrar un juego, elimina también sus reseñas relacionadas */
