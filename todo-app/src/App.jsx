import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TasksProvider } from './context/TasksContext';
import { Home, AddTask } from './pages';
import './styles/App.css';

/**
 * Componente App
 * Configuración principal de rutas con React Router DOM v6+
 */
function App() {
  return (
    <TasksProvider>
      <Router>
        <Routes>
          {/* Ruta: Lista de tareas (página principal) */}
          <Route path="/" element={<Home />} />

          {/* Ruta: Formulario para agregar tarea */}
          <Route path="/agregar" element={<AddTask />} />

          {/* Ruta 404: Página no encontrada */}
          <Route
            path="*"
            element={
              <div className="not-found">
                <h1>404 - Página no encontrada</h1>
                <p>La página que buscas no existe.</p>
                <a href="/">Volver al inicio</a>
              </div>
            }
          />
        </Routes>
      </Router>
    </TasksProvider>
  );
}

export default App;
