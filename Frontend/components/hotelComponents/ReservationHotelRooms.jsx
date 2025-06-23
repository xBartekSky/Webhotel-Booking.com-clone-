import { useEffect, useState } from "react";
import { ReservationRoomCard } from "../ReservationRoomCard";
import styles from "/styles/ReservationHotelRooms.module.css";

export const ReservationHotelRooms = ({ room, checkIn, checkOut }) => {
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      console.log("fetchAvailableRooms start");
      const result = [];

      for (const r of room) {
        try {
          const res = await fetch(
            `http://localhost:8080/rooms/${r.id}/unavailable-dates`
          );
          const dates = await res.json();

          const available = isRoomAvailable(dates, checkIn, checkOut);
          if (available) result.push(r);
        } catch (error) {
          console.error("Błąd przy sprawdzaniu pokoju", r.id, error);
        }
      }

      setAvailableRooms(result);
    };

    if (checkIn && checkOut && room.length > 0) {
      fetchAvailableRooms();
    }
  }, [room, checkIn, checkOut]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Rezerwuj wymarzony pokój</h1>
      <div className={styles.content}>
        {availableRooms.length > 0 ? (
          availableRooms.map((r) => (
            <ReservationRoomCard
              key={r.id}
              roomNumber={r.roomNumber}
              price={r.pricePerNight}
              roomType={r.roomType}
              roomId={r.id}
            />
          ))
        ) : (
          <p>Brak dostępnych pokoi w wybranym terminie</p>
        )}
      </div>
    </div>
  );
};

function isRoomAvailable(unavailableDates, checkIn, checkOut) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  for (const { checkIn: uStart, checkOut: uEnd } of unavailableDates) {
    const uStartDate = new Date(uStart);
    const uEndDate = new Date(uEnd);

    if (start < uEndDate && end > uStartDate) {
      return false;
    }
  }

  return true;
}
