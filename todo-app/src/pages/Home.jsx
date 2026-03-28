import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';
import { TaskCard, Button } from '../components';
import '../styles/Home.css';

/**
 * Página Home
 * Lista principal de tareas con renderizado condicional
 */
const Home = () => {
  const { tasks, toggleTask, deleteTask } = useTasks();

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Header */}
        <div className="home-header">
          <h1>📝 Mis Tareas</h1>
          <p className="task-count">
            {tasks.length === 0
              ? 'Sin tareas'
              : `${tasks.length} tarea${tasks.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Lista de tareas o mensaje vacío */}
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✨</div>
            <h2>No hay tareas pendientes.</h2>
            <p>¡Agrega una nueva para comenzar!</p>
            <Link to="/agregar" className="link-button">
              <Button variant="primary">+ Crear Primera Tarea</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Lista de tareas */}
            <div className="tasks-list">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  text={task.text}
                  completed={task.completed}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>

            {/* Botón flotante para agregar nueva tarea */}
            <Link to="/agregar" className="fab">
              <button className="fab-button" aria-label="Agregar nueva tarea">
                +
              </button>
            </Link>
          </>
        )}

        {/* Footer con enlace adicional */}
        {tasks.length > 0 && (
          <div className="home-footer">
            <Link to="/agregar">
              <Button variant="secondary">Agregar Nueva Tarea</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
