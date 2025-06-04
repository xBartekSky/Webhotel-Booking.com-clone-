import { useState } from "react";
import { InputField } from "./InputField";
import styles from "/styles/SearchBar.module.css";

export const SearchBar = ({ setSearchParams }) => {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    console.log("Wyszukiwanie dla miasta:", city);

    setSearchParams({
      city,
      date,
      guests,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.barContainer}>
        <div className={styles.bar}>
          <div className={styles.inputs}>
            <input
              className={styles.input}
              placeholder="Miejsce podróży"
              type="text"
              onChange={(e) => setCity(e.target.value)}
            ></input>
            <input
              className={styles.input}
              placeholder="Data"
              type="date"
              onChange={(e) => setDate(e.target.value)}
            ></input>
            <input
              className={styles.input}
              placeholder="Ilośc osób"
              type="number"
              onChange={(e) => setGuests(e.target.value)}
            ></input>
            <button className={styles.searchButton} onClick={handleSearch}>
              Szukaj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
