import { LoggedUserHeader } from "../components/LoggedUserHeader";
import { HelloUser } from "../components/HelloUser";
import styles from "/styles/DashboardPage.module.css";
import { useUser } from "../context/UserContext";
import { MainPageNav } from "../features/MainPageNav";
import { ReservationPanel } from "../features/ReservationPanel";
import { Footer } from "../components/Footer";

export const DashboardPage = () => {
  const { user } = useUser();

  console.log(user);

  return (
    <div className={styles.container}>
      <LoggedUserHeader name={user?.username}></LoggedUserHeader>
      <MainPageNav></MainPageNav>
      <div className={styles.app}>
        <div className={styles.panel}>
          <div className={styles.helloContainer}>
            <HelloUser name={user?.username}></HelloUser>
          </div>
          <div className={styles.dashboardContent}>
            <ReservationPanel user={user}></ReservationPanel>
            <div className={styles.contents}>
              <div className={styles.content}>
                <h1 className={styles.contentTitle}>Moje rezerwacje</h1>
                <button className={styles.contentButton}>
                  Wyświetl historie rezerwacji
                </button>
                <button className={styles.contentButton}>
                  Wyświetl aktualne rezerwacje
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
