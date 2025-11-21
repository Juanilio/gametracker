import axios from 'axios'; // cliente HTTP

const api = axios.create({ // instancia configurada de axios
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' // URL base desde env o localhost
});

export default api; // exporta cliente para usar en componentes

/* Resumen de estructura:
- Crea una instancia de axios con baseURL configurable
- Facilita llamadas a la API desde el frontend */
