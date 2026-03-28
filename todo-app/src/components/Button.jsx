import React from 'react';
import '../styles/Button.css';

/**
 * Componente Button reutilizable
 * @param {Object} props
 * @param {function} props.onClick - Función al hacer click
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {string} props.type - Tipo de botón ('button', 'submit', 'reset')
 * @param {string} props.variant - Variante de estilo ('primary', 'secondary', 'danger')
 * @param {boolean} props.disabled - Estado deshabilitado del botón
 * @returns {JSX.Element}
 */
const Button = ({ 
  onClick, 
  children, 
  type = 'button', 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
