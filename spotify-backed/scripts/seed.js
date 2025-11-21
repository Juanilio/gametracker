require('dotenv').config(); // carga variables de entorno
const mongoose = require('mongoose'); // importa mongoose (no estrictamente usado aquí)
const connectDB = require('../src/config/db'); // helper para conectar a la DB
const Game = require('../src/models/Game'); // modelo Game
const Review = require('../src/models/Review'); // modelo Review

const seed = async () => { // función principal de seed
  await connectDB(process.env.MONGO_URI); // conecta a MongoDB
  await Game.deleteMany({}); // limpia colección de juegos
  await Review.deleteMany({}); // limpia colección de reseñas

  const games = await Game.insertMany([ // inserta juegos iniciales
    { title: 'Hollow Knight', platform: 'PC', hoursPlayed: 42, completed: true, rating: 5, genres: ['Metroidvania'], coverUrl: '' },
    { title: 'EA FC 24', platform: 'PS5', hoursPlayed: 18, completed: false, rating: 4, genres: ['Sports'], coverUrl: '' }
  ]);

  const review = new Review({ author: 'Juan', content: 'Juego excelente', rating: 5, game: games[0]._id }); // crea reseña para el primer juego
  await review.save(); // guarda la reseña
  games[0].reviews.push(review._id); // asocia reseña al juego
  await games[0].save(); // guarda el juego actualizado

  console.log('Seed finalizado'); // confirma en consola
  process.exit(0); // termina proceso
};

seed(); // ejecuta el seeding

/* Resumen de estructura:
- Conecta a DB, limpia colecciones y crea datos de ejemplo
- Inserta juegos y una reseña, manteniendo relaciones */
