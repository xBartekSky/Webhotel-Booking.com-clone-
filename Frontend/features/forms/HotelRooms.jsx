import { useEffect, useState } from "react";
import { RoomCard } from "../../components/RoomCard";
import styles from "/styles/HotelRooms.module.css";
import { Button } from "../../components/Button";
import Modal from "../../components/Modal";
import { AddRoomForm } from "./AddRoom";

export const HotelRooms = ({ label, hotelId }) => {
  const [rooms, setRooms] = useState([]);
  const [showAddForm, setShowAddForm] = useState(null);

  const closeModal = () => {
    setShowAddForm(false);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchRooms = async () => {
      const response = await fetch(
        `http://localhost:8080/hotels/protected/${hotelId}/rooms`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      }
    };
    fetchRooms();
  }, [hotelId]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{label}</div>
      <div className={styles.content}>
        {rooms.length === 0 ? (
          <p>Żaden pokój jeszcze nie został dodany do tego hotelu.</p>
        ) : (
          <>
            {rooms.map((key) => (
              <RoomCard
                key={key.roomNumber}
                roomNr={key.roomNumber}
                type={key.roomType}
                price={key.pricePerNight}
              />
            ))}
          </>
        )}
      </div>

      <Modal isOpen={showAddForm} onClose={closeModal}>
        <AddRoomForm hotelId={hotelId}></AddRoomForm>
      </Modal>
      <Button label="Dodaj pokój" onClick={() => setShowAddForm(true)}></Button>
    </div>
  );
};
