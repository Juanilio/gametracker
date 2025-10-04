const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, default: 'PC' },
  coverUrl: { type: String, default: '' },
  hoursPlayed: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  rating: { type: Number, min: 0, max: 5, default: null },
  genres: [String],
  releaseDate: Date,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);
