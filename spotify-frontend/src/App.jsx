import { Routes, Route, Link } from "react-router-dom"; // API de enrutado y enlaces
import BibliotecaJuegos from "./components/BibliotecaJuegos"; // listado de juegos
import FormularioJuego from "./components/FormularioJuego"; // crear/editar juego
import DetalleJuego from "./components/DetalleJuego"; // detalle de un juego
import EstadisticasPersonales from "./components/EstadisticasPersonales"; // métricas personales

export default function App() { // componente raíz que define navegación y rutas
  return (
    <div> {/* contenedor principal */}
      <nav className="nav"> {/* barra de navegación */}
        <Link to="/">Biblioteca</Link> {/* enlace a listado */}
        <Link to="/agregar">Agregar Juego</Link> {/* enlace a formulario de alta */}
        <Link to="/stats">Estadísticas</Link> {/* enlace a estadísticas */}
      </nav>

      <Routes> {/* declaración de rutas */}
        <Route path="/" element={<BibliotecaJuegos />} /> {/* home: biblioteca */}
        <Route path="/agregar" element={<FormularioJuego />} /> {/* ruta para crear */}
        <Route path="/editar/:id" element={<FormularioJuego />} /> {/* ruta para editar por id */}
        <Route path="/juego/:id" element={<DetalleJuego />} /> {/* detalle por id */}
        <Route path="/stats" element={<EstadisticasPersonales />} /> {/* estadísticas */}
      </Routes>
    </div>
  );
}

/* Resumen de estructura:
- Navbar con enlaces a secciones principales
- Configura 5 rutas: listado, alta, edición por id, detalle por id y estadísticas
- Actúa como layout raíz envolviendo las vistas de la aplicación */
