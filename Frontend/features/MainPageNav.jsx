import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "/styles/MainPageNav.module.css";

export const MainPageNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <i
          className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"} ${
            styles.hamburgerIcon
          }`}
        ></i>
      </button>

      <div
        className={`${styles.navContainer} ${isMenuOpen ? styles.open : ""}`}
      >
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
          }
          to="/mainpage"
          onClick={() => setIsMenuOpen(false)}
        >
          <i className={`fa-solid fa-hotel ${styles.icon}`}></i> Hotele
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
          }
          to="/rooms"
          onClick={() => setIsMenuOpen(false)}
        >
          <i className={`fa-solid fa-bed ${styles.icon}`}></i> Pokoje
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
          }
          to="/dashboard"
          onClick={() => setIsMenuOpen(false)}
        >
          <i className={`fa-solid fa-gauge ${styles.icon}`}></i> Panel
        </NavLink>
      </div>
    </div>
  );
};
