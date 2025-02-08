import styles from './Button.module.scss';

const Button2 = () => {
  return (
    // TypeScript подскажет доступные классы из styles
    // и выдаст ошибку если класс не существует
    <button className={styles.button}>Click me</button>
  );
};

export default Button2;
