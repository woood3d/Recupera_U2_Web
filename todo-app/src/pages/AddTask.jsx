import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../components';
import { useTasks } from '../context/TasksContext';
import '../styles/AddTask.css';

/**
 * Página AddTask
 * Formulario para agregar una nueva tarea con validaciones estrictas
 */
const AddTask = () => {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const [taskText, setTaskText] = useState('');
  const [error, setError] = useState('');

  // Regex para validar que contenga al menos una letra (incluyendo acentos y ñ)
  const LETTER_REGEX = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/;

  /**
   * Validar el texto de la tarea
   * @param {string} text - Texto a validar
   * @returns {string} Mensaje de error o string vacío si es válido
   */
  const validateTask = (text) => {
    // Validar 1: No permitir campo vacío o solo espacios
    if (!text || text.trim() === '') {
      return 'La tarea no puede estar vacía.';
    }

    // Validar 2: Debe contener al menos una letra
    if (!LETTER_REGEX.test(text)) {
      return 'La tarea debe contener al menos una letra. (No se permiten solo números o símbolos)';
    }

    // Validaciones pasadas
    return '';
  };

  /**
   * Manejar el submit del formulario
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Aplicar trim y validar
    const trimmedText = taskText.trim();
    const validationError = validateTask(trimmedText);

    // Si hay error, mostrarlo
    if (validationError) {
      setError(validationError);
      return;
    }

    // Limpiar errores si la validación pasó
    setError('');

    // Agregar la tarea
    const success = addTask(trimmedText);

    // Si se agregó exitosamente, redirigir a la página principal
    if (success) {
      setTaskText(''); // Limpiar el input
      navigate('/'); // Redirigir a la lista de tareas
    }
  };

  /**
   * Manejar cambios en el input
   * Limpiar el error cuando el usuario comience a escribir
   * @param {Event} e - Evento del input
   */
  const handleInputChange = (e) => {
    setTaskText(e.target.value);
    // Limpiar el error cuando el usuario empieza a escribir
    if (error) {
      setError('');
    }
  };

  return (
    <div className="add-task-container">
      <div className="add-task-card">
        <h1>Agregar Nueva Tarea</h1>

        <form onSubmit={handleSubmit} className="add-task-form">
          <Input
            id="task-input"
            type="text"
            value={taskText}
            onChange={handleInputChange}
            placeholder="Ingresa el texto de tu tarea..."
            error={error}
          />

          <div className="form-actions">
            <Button type="submit" variant="primary">
              Agregar Tarea
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
            >
              Cancelar
            </Button>
          </div>
        </form>

        <div className="validation-hints">
          <p className="hint-title">📋 Requisitos:</p>
          <ul>
            <li>No puede estar vacía (espacios en blanco tampoco cuentan)</li>
            <li>Debe contener al menos una letra</li>
            <li>Puede contener números y símbolos además de la letra</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
