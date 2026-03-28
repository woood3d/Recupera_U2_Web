import React from 'react';
import '../styles/Input.css';

/**
 * Componente Input reutilizable con soporte para mensajes de error
 * @param {Object} props
 * @param {string} props.value - Valor actual del input
 * @param {function} props.onChange - Función al cambiar el valor
 * @param {string} props.placeholder - Texto placeholder
 * @param {string} props.error - Mensaje de error a mostrar
 * @param {string} props.type - Tipo de input ('text', 'email', 'password', etc.)
 * @param {string} props.id - ID del input
 * @returns {JSX.Element}
 */
const Input = ({ 
  value, 
  onChange, 
  placeholder = '', 
  error = '',
  type = 'text',
  id = ''
}) => {
  return (
    <div className="input-wrapper">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input ${error ? 'input-error' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;
