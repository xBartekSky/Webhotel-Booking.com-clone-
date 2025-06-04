import { useState } from "react";
import { LoggedUserHeader } from "../components/LoggedUserHeader";
import { SearchBar } from "../components/SearchBar";
import { Wrapper } from "../components/Wrapper";
import { HotelList } from "../features/HotelList";
import { MainPageNav } from "../features/MainPageNav";
import { useUser } from "../context/UserContext";
import { GuestHeader } from "../components/GuestHeader";
import styles from "/styles/MainPage.module.css";
import { Footer } from "../components/Footer";
export const MainPage = () => {
  const [searchParams, setSearchParams] = useState({
    city: "",
    date: "",
    guests: 1,
  });
  const { user } = useUser();
  console.log("dupa:", user);

  return (
    <div className={styles.container}>
      {user ? (
        <LoggedUserHeader name={user?.username}></LoggedUserHeader>
      ) : (
        <GuestHeader></GuestHeader>
      )}
      <div>
        <MainPageNav></MainPageNav>
        <Wrapper
          title="Zaplanuj swój urlop już dziś..."
          subtitle="Szukaj ofert hoteli i wielu innych obiektów"
        ></Wrapper>
        <SearchBar setSearchParams={setSearchParams}></SearchBar>
      </div>
      <div className={styles.article}>
        <HotelList searchParams={searchParams}></HotelList>
      </div>
      <div className={styles.footer}>
        <Footer adLabel="Zniżka 15% dla nowych użytkowników!"></Footer>
      </div>
    </div>
  );
};
