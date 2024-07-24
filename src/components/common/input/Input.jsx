import React from 'react';
import PropTypes from 'prop-types';

import styles from './input.module.css';

function Input({ type, name, label, title, pattern, required, handleChange }) {
  return (
    <div className={styles.field}>
      {' '}
      <input
        className={styles.input}
        type={type}
        name={name}
        title={title}
        pattern={pattern}
        required={required}
        onChange={handleChange}
      ></input>
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  required: PropTypes.bool,
  handleChange: PropTypes.func,
};

export default Input;
