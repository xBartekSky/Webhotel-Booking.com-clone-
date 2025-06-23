import styles from "/styles/Button.module.css";

export const Button = ({ label, onClick, color, type }) => {
  return (
    <div className={styles.container}>
      <button
        type={type}
        onClick={onClick}
        className={styles.button}
        style={{ backgroundColor: color }}
      >
        {label}
      </button>
    </div>
  );
};
