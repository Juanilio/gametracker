const mongoose = require('mongoose'); // Importa Mongoose para interactuar con MongoDB

const connectDB = async (mongoUri) => { // Define función asíncrona que conecta a MongoDB recibiendo la URI
  try { // Intenta ejecutar la conexión
    await mongoose.connect(mongoUri, { // Conecta a Mongo con la URI dada
      useNewUrlParser: true, // Usa el nuevo parser de URL (opción recomendada)
      useUnifiedTopology: true // Usa el nuevo motor de topología (opción recomendada)
    });
    console.log('MongoDB conectado'); // Mensaje indicando conexión exitosa
  } catch (err) { // Si ocurre un error conectando
    console.error('Error conectando a MongoDB:', err.message); // Muestra el mensaje del error
    process.exit(1); // Termina el proceso con código de error para no seguir sin DB
  }
};

module.exports = connectDB; // Exporta la función para usarla en server.js

/* Resumen de estructura:
- Provee una función async para conectar Mongoose usando una URI
- Configura opciones recomendadas y corta el proceso si falla la conexión */
