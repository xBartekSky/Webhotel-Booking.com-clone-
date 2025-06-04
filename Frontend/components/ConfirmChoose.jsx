import styles from "/styles/ConfirmChoose.module.css";

export const ConfirmChoose = ({ label, onClick, onCancel }) => {
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.labels}>
          <h1 className={styles.title}>Potwierdź wybór</h1>
          <label className={styles.label}>{label}</label>
        </div>

        <div className={styles.buttons}>
          <button className={styles.apply} onClick={onClick}>
            Potwierdź
          </button>
          <button className={styles.cancel} onClick={onCancel}>
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};
