import { LoggedUserHeader } from "../components/LoggedUserHeader";
import { HelloUser } from "../components/HelloUser";
import styles from "/styles/DashboardPage.module.css";
import { useUser } from "../context/UserContext";
import { MainPageNav } from "../features/MainPageNav";
import { ReservationPanel } from "../features/ReservationPanel";
import { Footer } from "../components/Footer";
import { GuestHeader } from "../components/GuestHeader";
import { useUserBookings } from "../hooks/useUserBookings";
import { useState } from "react";
import Modal from "../components/Modal";
import UserReservation from "../components/UserReservation";

export const DashboardPage = () => {
  const { user } = useUser();
  const token = localStorage.getItem("token");
  const { currentBookings, pastBookings } = useUserBookings(token);
  const [showCurrentReservation, setShowCurrentReservation] = useState(false);
  const [showPastReservation, setShowPastReservation] = useState(false);
  console.log(user);

  const closeModal = () => {
    setShowCurrentReservation(false);
    setShowPastReservation(false);
  };

  return (
    <div className={styles.container}>
      {user ? (
        <LoggedUserHeader name={user?.username}></LoggedUserHeader>
      ) : (
        <GuestHeader></GuestHeader>
      )}
      <MainPageNav></MainPageNav>
      <div className={styles.app}>
        <div className={styles.panel}>
          <div className={styles.helloContainer}>
            <HelloUser name={user?.username}></HelloUser>
          </div>
          <div className={styles.dashboardContent}>
            <ReservationPanel user={user}></ReservationPanel>

            <div className={styles.contents}>
              <Modal isOpen={showCurrentReservation} onClose={closeModal}>
                <UserReservation
                  label="Aktualne rezerwacje"
                  bookings={currentBookings}
                ></UserReservation>
              </Modal>
              <Modal isOpen={showPastReservation} onClose={closeModal}>
                <UserReservation
                  label="Historia rezerwacji"
                  bookings={pastBookings}
                ></UserReservation>
              </Modal>
              <div className={styles.content}>
                <h1 className={styles.contentTitle}>Moje rezerwacje</h1>
                <button
                  className={styles.contentButton}
                  onClick={() => {
                    setShowCurrentReservation(true);
                  }}
                >
                  Wyświetl aktualne rezerwacje
                </button>
                <button
                  onClick={() => {
                    setShowPastReservation(true);
                  }}
                  className={styles.contentButton}
                >
                  Wyświetl historie rezerwacji
                </button>
                <button className={styles.contentButton}>
                  Zgłoś problem dot. rezerwacji
                </button>
              </div>
              <div className={styles.content}>
                <h1 className={styles.contentTitle}>Pomoc</h1>
              </div>
              <div className={styles.content}>
                <h1 className={styles.contentTitle}>Zarządzaj kontem</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer adLabel="Zniżka 15% dla nowych użytkowników!"></Footer>
    </div>
  );
};
