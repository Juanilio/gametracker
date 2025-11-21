require('dotenv').config(); // Carga variables de entorno desde .env para usar process.env
const express = require('express'); // Importa Express para crear el servidor HTTP
const morgan = require('morgan'); // Importa Morgan para registrar peticiones en consola
const cors = require('cors'); // Importa CORS para permitir llamadas desde otros orígenes (frontend)
const connectDB = require('./config/db'); // Importa la función que conecta a MongoDB

const gamesRoutes = require('../routes/games'); // Importa el enrutador de rutas de juegos
const reviewsRoutes = require('../routes/reviews'); // Importa el enrutador de rutas de reseñas

const app = express(); // Crea la instancia principal de la aplicación Express

// Middlewares
app.use(cors()); // Activa CORS en todas las rutas para aceptar peticiones del frontend
app.use(express.json()); // Permite que Express parsee cuerpos JSON en las peticiones
app.use(morgan('dev')); // Muestra logs de cada petición en formato de desarrollo

// Routes
app.use('/api/games', gamesRoutes); // Monta las rutas de juegos bajo el prefijo /api/games
app.use('/api/reviews', reviewsRoutes); // Monta las rutas de reseñas bajo el prefijo /api/reviews

app.get('/', (req, res) => res.send('GameTracker API is running')); // Ruta raíz para comprobar que el servidor responde

// Start
const PORT = process.env.PORT || 5000; // Define el puerto del servidor (de .env o 5000 por defecto)
const MONGO_URI = process.env.MONGO_URI; // Lee la URI de MongoDB desde variables de entorno

connectDB(MONGO_URI).then(() => { // Intenta conectar a la base de datos
  app.listen(PORT, () => { // Si conecta, inicia el servidor HTTP en el puerto indicado
    console.log(`Server running on port ${PORT}`); // Muestra en consola que el servidor está activo
  });
}).catch(err => { // Si la conexión falla, captura el error
  console.error('Fallo conexión DB', err); // Muestra el motivo del fallo de conexión
});

/* Resumen de estructura:
- Inicializa Express con CORS, JSON y logging
- Monta routers para juegos y reseñas bajo /api
- Expone ruta raíz de salud
- Conecta a MongoDB y arranca el servidor en PORT */
