import { useState } from "react";
import { InputField } from "../components/InputField";
import styles from "/styles/AddHotelForm.module.css";

export const AddHotelForm = ({ user, onHotelAdded }) => {
  const [name, setHotelName] = useState("");
  const [description, setDesc] = useState("");
  const [address, setHotelAddress] = useState("");
  const [city, setHotelCity] = useState("");
  const [country, setHotelCountry] = useState("");
  // [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmial] = useState("");
  const [mainImageUrl, setmainImageUrl] = useState("");

  const handleAddHotel = async (e) => {
    e.preventDefault();
    console.log(user?.email);
    setEmial(user?.email);
    const token = localStorage.getItem("token");
    const respone = await fetch("http://localhost:8080/hotels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
        city,
        description,
        address,
        country,
        mainImageUrl,
      }),
    });
    if (respone.ok) {
      const hotelData = await respone.json();
      onHotelAdded(hotelData);
      console.log("dodano hotel");
    }
  };
  return (
    <div className={styles.panel}>
      <h1 className={styles.title}>Dodawanie obiektu</h1>
      <form className={styles.form} onSubmit={handleAddHotel}>
        <div className={styles.inputs}>
          <InputField
            label="Nazwa hotelu"
            placeholder="Nazwa hotelu"
            inputClassName={styles.input}
            onChange={(e) => setHotelName(e.target.value)}
          ></InputField>
          <InputField
            label="Miasto"
            placeholder="Miasto"
            inputClassName={styles.input}
            onChange={(e) => setHotelCity(e.target.value)}
          ></InputField>
          <InputField
            label="Kraj"
            placeholder="Kraj"
            inputClassName={styles.input}
            onChange={(e) => setHotelCountry(e.target.value)}
          ></InputField>
          <InputField
            label="Ulica i nr lokalu"
            inputClassName={styles.input}
            onChange={(e) => setHotelAddress(e.target.value)}
          ></InputField>
          <InputField
            label="Opis obiektu"
            inputClassName={styles.descInput}
            onChange={(e) => setDesc(e.target.value)}
          ></InputField>
          <InputField
            type="text"
            label="Adres do zdjecia"
            inputClassName={styles.input}
            onChange={(e) => setmainImageUrl(e.target.value)}
          ></InputField>
          <button type="submit">Dodaj</button>
        </div>
        <div className={styles.facilitiesContainer}>
          <h1 className={styles.facilitiesTitle}>Udogodnienia</h1>
          <div className={styles.facilities}>
            <InputField
              type="checkbox"
              label="Wifi"
              inputClassName={styles.facilitiesInput}
            ></InputField>
            <InputField
              type="checkbox"
              label="Dostawka"
              inputClassName={styles.facilitiesInput}
            ></InputField>
            <InputField
              type="checkbox"
              label="Grill"
              inputClassName={styles.facilitiesInput}
            ></InputField>
            <InputField
              type="checkbox"
              label="Parking"
              inputClassName={styles.facilitiesInput}
            ></InputField>
            <InputField
              type="checkbox"
              label="Wifif"
              inputClassName={styles.facilitiesInput}
            ></InputField>
            <InputField
              type="checkbox"
              label="Wifif"
              inputClassName={styles.facilitiesInput}
            ></InputField>
            <InputField
              type="checkbox"
              label="Wifif"
              inputClassName={styles.facilitiesInput}
            ></InputField>
          </div>
        </div>
      </form>
    </div>
  );
};
