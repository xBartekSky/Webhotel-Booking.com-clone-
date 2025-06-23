import { Button } from "./Button";
import styles from "/styles/RoomCard.module.css";

export const RoomCard = ({ roomNr, price, type }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <p>
          Pokój {roomNr} - {type}
        </p>
        <p>Cena: {price} PLN/noc</p>
        <Button label="Zarządzaj"></Button>
      </div>
    </div>
  );
};
