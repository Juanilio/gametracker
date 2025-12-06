require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

const gamesRoutes = require('../routes/games');
const reviewsRoutes = require('../routes/reviews');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/games', gamesRoutes);
app.use('/api/reviews', reviewsRoutes);

app.get('/', (req, res) => res.send('GameTracker API is running'));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Fallo conexión DB', err);
});
