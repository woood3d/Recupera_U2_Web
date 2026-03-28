import { useState, useEffect } from 'react';

const STORAGE_KEY = 'tasks';

/**
 * Custom Hook useTasks
 * Maneja toda la lógica de estado y persistencia de tareas en localStorage
 * 
 * @returns {Object} Objeto con el estado de tareas y funciones para manipularlas
 * @returns {Array} tasks - Array de objetos tarea {id, text, completed}
 * @returns {Function} addTask - Función para agregar una nueva tarea
 * @returns {Function} deleteTask - Función para eliminar una tarea por id
 * @returns {Function} toggleTask - Función para cambiar el estado completed de una tarea
 */
const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  // useEffect 1: Leer tareas de localStorage solo al montar el componente
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error('Error al leer tareas de localStorage:', error);
      setTasks([]);
    }
  }, []); // Dependencia vacía: se ejecuta solo una vez al montar

  // useEffect 2: Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error al guardar tareas en localStorage:', error);
    }
  }, [tasks]); // Dependencia en tasks: se ejecuta cuando tasks cambia

  /**
   * Agregar una nueva tarea
   * @param {string} text - Texto de la tarea
   * @returns {boolean} true si se agregó exitosamente, false si hay error
   */
  const addTask = (text) => {
    if (!text || typeof text !== 'string') {
      return false;
    }

    const newTask = {
      id: Date.now(), // Usar timestamp como id único
      text: text.trim(),
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    return true;
  };

  /**
   * Cambiar el estado de completada/pendiente de una tarea
   * @param {number} id - ID de la tarea
   */
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Eliminar una tarea por ID
   * @param {number} id - ID de la tarea a eliminar
   */
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
};

export default useTasks;
