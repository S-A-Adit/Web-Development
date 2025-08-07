// src/components/UI/Input.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  min,
  max,
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      min={min}
      max={max}
      {...props}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default Input;