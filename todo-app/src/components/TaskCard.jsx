import React from 'react';
import '../styles/TaskCard.css';
import Button from './Button';

/**
 * Componente TaskCard para renderizar cada tarea individual
 * @param {Object} props
 * @param {string} props.id - ID único de la tarea
 * @param {string} props.text - Texto de la tarea
 * @param {boolean} props.completed - Estado de completitud
 * @param {function} props.onToggle - Función para marcar como completada
 * @param {function} props.onDelete - Función para eliminar la tarea
 * @returns {JSX.Element}
 */
const TaskCard = ({ 
  id, 
  text, 
  completed = false, 
  onToggle, 
  onDelete 
}) => {
  return (
    <div className={`task-card ${completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="task-checkbox"
          aria-label={`Marcar como completada: ${text}`}
        />
        <span className="task-text">{text}</span>
      </div>
      
      <Button 
        onClick={() => onDelete(id)}
        variant="danger"
      >
        Eliminar
      </Button>
    </div>
  );
};

export default TaskCard;
