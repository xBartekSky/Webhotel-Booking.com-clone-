import { useEffect, useState } from "react";
import styles from "/styles/ReservationPanel.module.css";
import Modal from "../components/Modal";
import { AddHotelForm } from "./AddHotelForm";
import { ConfirmChoose } from "../components/ConfirmChoose";

export const ReservationPanel = ({ user }) => {
  const [hotels, setHotels] = useState([]);
  const [showAddForm, setShowAddForm] = useState(null);
  const [showConfirmForm, setShowConfirmForm] = useState(null);

  const closeModal = () => {
    setShowAddForm(false);
    setShowConfirmForm(false);
  };

  const handleHotelAdded = (newHotel) => {
    console.log("Update");
    setHotels((prevHotels) => {
      [...prevHotels, newHotel];
    });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:8080/hotels/deleteHotel/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setHotels((prevHotels) => prevHotels.filter((hotel) => hotel.id !== id));
      console.log("Usunieto hotel");
      closeModal();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchOwnHotels = async () => {
      try {
        const response = await fetch("http://localhost:8080/hotels/myHotels", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setHotels(data);
          console.log(data);
        } else {
          console.log("Błąd podczas ładowania hoteli");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOwnHotels();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <label className={styles.panelTitle}>Twoje obiekty</label>
        <Modal isOpen={showAddForm} onClose={closeModal}>
          <AddHotelForm
            user={user}
            onHotelAdded={handleHotelAdded}
          ></AddHotelForm>
        </Modal>

        <div className={styles.hotelContainer}>
          {hotels &&
            hotels.map((key) => (
              <div className={styles.hotelContent}>
                <Modal isOpen={showConfirmForm} onClose={closeModal}>
                  <ConfirmChoose
                    label="Czy napewno chcesz usunać ten obiekt?"
                    onClick={() => handleDelete(key.id)}
                    onCancel={closeModal}
                  />
                </Modal>
                <div className={styles.imageContainer}>
                  <div className={styles.imageSize}>
                    <img
                      src={key.mainImageUrl ?? "src/assets/nowe_zdjecie.webp"}
                      className={styles.image}
                      alt=""
                    />
                  </div>
                </div>
                <div className={styles.hotelDetails}>
                  <a href="" className={styles.hotelTitle}>
                    {key.city ?? "Brak tytułu"}
                  </a>
                  <a href="" className={styles.hotelSubTitle}>
                    {key.description ?? "BrakOpisu"}
                  </a>
                  <button className={styles.editButton}>Edytuj</button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => setShowConfirmForm(true)}
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))}
        </div>
        <button
          className={styles.addHotelButton}
          onClick={() => setShowAddForm(true)}
        >
          Dodaj obiekt
        </button>
      </div>
    </div>
  );
};
