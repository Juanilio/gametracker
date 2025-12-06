const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  author: { type: String, default: 'Anon' },
  content: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
