// pages/HotelDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "/styles/HotelDetails.module.css";
import { LoggedUserHeader } from "../components/LoggedUserHeader";
import { GuestHeader } from "../components/GuestHeader";
import { Wrapper } from "../components/Wrapper";
import { SearchBar } from "../components/SearchBar";
import { Footer } from "../components/Footer";
import { MainPageNav } from "../features/MainPageNav";
import { Button } from "../components/Button";
import { AddReviewForm } from "../features/forms/AddReviewForm";
import Modal from "../components/Modal";
import { HotelOverview } from "../components/hotelComponents/HotelOverview";
import { ReservationHotelRooms } from "../components/hotelComponents/ReservationHotelRooms";

export const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const { user } = useUser();

  const [searchParams] = useSearchParams();

  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  useEffect(() => {
    const fetchHotel = async () => {
      const response = await fetch(`http://localhost:8080/hotels/id/${id}`);
      if (response.ok) {
        const data = await response.json();
        setHotel(data);
      }
    };
    fetchHotel();
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {user ? <LoggedUserHeader name={user?.username} /> : <GuestHeader />}
        <MainPageNav />
        <Wrapper
          title="Zaplanuj swój urlop już dziś..."
          subtitle="Szukaj ofert hoteli i wielu innych obiektów"
        />
        <SearchBar />
      </div>

      <div className={styles.panel}>
        <HotelOverview hotel={hotel} checkIn={checkIn} checkOut={checkOut} />
      </div>

      <Footer adLabel="Zniżka 15% dla nowych użytkowników!" />
    </div>
  );
};
