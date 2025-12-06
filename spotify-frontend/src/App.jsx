import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BibliotecaJuegos from "./components/BibliotecaJuegos";
import FormularioJuego from "./components/FormularioJuego";
import DetalleJuego from "./components/DetalleJuego";
import EstadisticasPersonales from "./components/EstadisticasPersonales";

export default function App() {
  const [toastMessage, setToastMessage] = useState(null);
  useEffect(() => {
    const handler = (e) => {
      setToastMessage(e.detail?.message || "");
      setTimeout(() => setToastMessage(null), 3000);
    };
    window.addEventListener('app:toast', handler);
    return () => window.removeEventListener('app:toast', handler);
  }, []);
  return (
    <div>
      <nav className="nav">
        <Link to="/">Biblioteca</Link>
        <Link to="/agregar">Agregar Juego</Link>
        <Link to="/stats">Estadísticas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<BibliotecaJuegos />} />
        <Route path="/agregar" element={<FormularioJuego />} />
        <Route path="/editar/:id" element={<FormularioJuego />} />
        <Route path="/juego/:id" element={<DetalleJuego />} />
        <Route path="/stats" element={<EstadisticasPersonales />} />
      </Routes>
      {toastMessage && <div className="toast">{toastMessage}</div>}
    </div>
  );
}
