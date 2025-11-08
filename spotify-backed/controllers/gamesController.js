const Game = require('../models/Game');
const Review = require('../models/review');

exports.getGames = async (req, res) => {
  const q = req.query.q || '';
  const filter = q ? { title: { $regex: q, $options: 'i' } } : {};
  const games = await Game.find(filter).populate('reviews');
  res.json(games);
};

exports.getGameById = async (req, res) => {
  const game = await Game.findById(req.params.id).populate('reviews');
  if (!game) return res.status(404).json({ message: 'Game not found' });
  res.json(game);
};

exports.createGame = async (req, res) => {
  const data = req.body;
  const game = new Game(data);
  await game.save();
  res.status(201).json(game);
};

exports.updateGame = async (req, res) => {
  const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!game) return res.status(404).json({ message: 'Game not found' });
  res.json(game);
};

exports.deleteGame = async (req, res) => {
  // eliminar reseñas asociadas
  const game = await Game.findById(req.params.id);
  if (!game) return res.status(404).json({ message: 'Game not found' });
  await Review.deleteMany({ game: game._id });
  await game.remove();
  res.json({ message: 'Game y reseñas eliminadas' });
};
