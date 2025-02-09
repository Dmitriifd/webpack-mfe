import React from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button = ({ onClick, children, disabled = false }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} type="button" className={styles.button}>
      {children}
    </button>
  );
};

export { Button };
