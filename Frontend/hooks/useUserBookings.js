import { useEffect, useState } from "react";

export const useUserBookings = (token) => {
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:8080/bookings", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Błąd podczas pobierania rezerwacji");
        }

        const data = await response.json();
        setAllBookings(data);
      } catch (error) {
        console.error("Błąd fetch:", error);
      }
    };

    if (token) {
      fetchBookings();
    }
  }, [token]);

  const now = new Date();

  const currentBookings = allBookings.filter(
    (b) => new Date(b.checkOutDate) >= now
  );

  const pastBookings = allBookings.filter(
    (b) => new Date(b.checkOutDate) < now
  );

  return { currentBookings, pastBookings };
};
