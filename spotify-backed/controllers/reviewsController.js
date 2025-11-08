const Review = require('../models/review');
const Game = require('../models/Game');

exports.getReviewsForGame = async (req, res) => {
  const reviews = await Review.find({ game: req.params.gameId }).sort('-createdAt');
  res.json(reviews);
};

exports.createReview = async (req, res) => {
  const { author, content, rating } = req.body;
  const game = await Game.findById(req.params.gameId);
  if (!game) return res.status(404).json({ message: 'Game not found' });

  const review = new Review({ author, content, rating, game: game._id });
  await review.save();
  game.reviews.push(review._id);
  await game.save();

  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  await Game.findByIdAndUpdate(review.game, { $pull: { reviews: review._id } });
  await review.remove();
  res.json({ message: 'Review eliminada' });
};
