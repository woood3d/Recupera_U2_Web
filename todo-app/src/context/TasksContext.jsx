import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Context para tareas globales
 */
const TasksContext = createContext();

const STORAGE_KEY = 'tasks';

/**
 * Proveedor de tareas (TasksProvider)
 * Envuelve la app para proporcionar estado global de tareas
 */
export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // useEffect 1: Leer tareas de localStorage al montar
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
  }, []);

  // useEffect 2: Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error al guardar tareas en localStorage:', error);
    }
  }, [tasks]);

  const addTask = (text) => {
    if (!text || typeof text !== 'string') {
      return false;
    }

    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    return true;
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const value = {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

/**
 * Hook para usar el contexto de tareas
 * @returns {Object} {tasks, addTask, toggleTask, deleteTask}
 */
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks debe ser usado dentro de TasksProvider');
  }
  return context;
};
