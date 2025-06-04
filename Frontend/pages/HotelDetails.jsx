import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "/styles/HotelDetails.module.css";
import { LoggedUserHeader } from "../components/LoggedUserHeader";
import { GuestHeader } from "../components/GuestHeader";
import { Wrapper } from "../components/Wrapper";
import { SearchBar } from "../components/SearchBar";
import { Footer } from "../components/Footer";
import { HotelGallery } from "../features/HotelGallery";
import { HotelDescription } from "../components/HotelDescription";
import { MainPageNav } from "../features/MainPageNav";
export const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const { user } = useUser();
  useEffect(() => {
    const fetchHotel = async () => {
      const response = await fetch(`http://localhost:8080/hotels/id/${id}`, {
        method: "GET",
      });

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
        {user ? (
          <LoggedUserHeader name={user?.username}></LoggedUserHeader>
        ) : (
          <GuestHeader></GuestHeader>
        )}
        <MainPageNav></MainPageNav>
        <Wrapper
          title="Zaplanuj swój urlop już dziś..."
          subtitle="Szukaj ofert hoteli i wielu innych obiektów"
        ></Wrapper>

        <SearchBar></SearchBar>
      </div>
      <div className={styles.panel}>
        <HotelDescription
          name={hotel.name}
          address={hotel.address}
          city={hotel.city}
          country={hotel.country}
        ></HotelDescription>
      </div>
      <Footer adLabel="Zniżka 15% dla nowych użytkowników!"></Footer>
    </div>
  );
};
