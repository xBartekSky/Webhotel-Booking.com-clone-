import { NavLink } from "react-router-dom";
import styles from "/styles/MainPageNav.module.css";
export const MainPageNav = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
          }
          to="/mainpage"
        >
          <i className={`fa-solid fa-hotel ${styles.icon}`}></i> Hotele
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
          }
          to="/rooms"
        >
          <i className={`fa-solid fa-bed ${styles.icon}`}></i>Pokoje
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
          }
          to="/myaccount"
        >
          <i className={`fa-solid fa-champagne-glasses ${styles.icon}`}></i>
          Atrakcje
        </NavLink>
      </div>
    </div>
  );
};
