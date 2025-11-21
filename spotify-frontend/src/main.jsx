import { StrictMode } from "react"; // habilita comprobaciones adicionales en desarrollo
import { createRoot } from "react-dom/client"; // crea el root de React en modo concurrente
import { BrowserRouter } from "react-router-dom"; // proveedor de enrutamiento del lado del cliente
import "./styles.css"; // estilos globales de la app
import App from "./App.jsx"; // componente raíz de la aplicación

createRoot(document.getElementById('root')).render( // monta la app dentro del elemento #root
  <StrictMode> {/* activa StrictMode para detectar efectos y problemas comunes */}
    <BrowserRouter> {/* habilita rutas y navegación */}
      <App /> {/* renderiza el componente principal */}
    </BrowserRouter>
  </StrictMode>
);

/* Resumen de estructura:
- Importa utilidades de React y el enrutador
- Carga estilos globales y el componente App
- Crea el root y envuelve App con BrowserRouter y StrictMode para enrutamiento y verificaciones */
