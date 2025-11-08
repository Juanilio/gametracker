require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const Game = require('../src/models/Game');
const Review = require('../src/models/Review');

const seed = async () => {
  await connectDB(process.env.MONGO_URI);
  await Game.deleteMany({});
  await Review.deleteMany({});

  const games = await Game.insertMany([
    { title: 'Hollow Knight', platform: 'PC', hoursPlayed: 42, completed: true, rating: 5, genres: ['Metroidvania'], coverUrl: '' },
    { title: 'FIFA 24', platform: 'PS5', hoursPlayed: 18, completed: false, rating: 4, genres: ['Sports'], coverUrl: '' }
  ]);

  const review = new Review({ author: 'Juan', content: 'Juego excelente', rating: 5, game: games[0]._id });
  await review.save();
  games[0].reviews.push(review._id);
  await games[0].save();

  console.log('Seed finalizado');
  process.exit(0);
};

seed();
