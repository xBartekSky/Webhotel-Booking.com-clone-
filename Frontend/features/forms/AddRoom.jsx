import { useState } from "react";
import styles from "/styles/AddRoomForm.module.css";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";

export const AddRoomForm = ({ hotelId }) => {
  const [roomData, setRoomData] = useState({
    description: "",
    pricePerNight: "",
    roomNumber: "",
    roomType: "",
    hotelId: hotelId,
  });

  const handleAddRoom = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8080/rooms/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...roomData,
      }),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <form
          data-testid="add-room-form"
          className={styles.form}
          onSubmit={handleAddRoom}
        >
          <h1 className={styles.title}>Dodaj pokój</h1>
          <InputField
            label="Opis pokoju"
            placeholder="Opis pokoju"
            inputClassName={styles.input}
            onChange={(e) =>
              setRoomData({ ...roomData, description: e.target.value })
            }
          ></InputField>
          <InputField
            label="Cena za noc"
            placeholder="Cena za noc"
            inputClassName={styles.input}
            onChange={(e) =>
              setRoomData({ ...roomData, pricePerNight: e.target.value })
            }
          ></InputField>
          <InputField
            label="Numer pokoju"
            inputClassName={styles.input}
            type="number"
            onChange={(e) =>
              setRoomData({ ...roomData, roomNumber: e.target.value })
            }
          ></InputField>
          <InputField
            label="Standard pokoju"
            inputClassName={styles.descInput}
            onChange={(e) =>
              setRoomData({ ...roomData, roomType: e.target.value })
            }
          ></InputField>
          <Button type="submit" label="Dodaj pokój"></Button>
        </form>
      </div>
    </div>
  );
};
