import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';
import clsx from 'clsx';

function Button({ variant = false, type, children, disabled, handleClick }) {
  return (
    <button
      className={clsx(styles.button, variant && styles.delete)}
      type={type}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default Button;
