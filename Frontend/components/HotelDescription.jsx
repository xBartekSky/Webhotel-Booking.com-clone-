import { HotelGallery } from "../features/HotelGallery";
import { Review } from "../features/Review";
import styles from "/styles/HotelDescription.module.css";

export const HotelDescription = ({ name, desc, address, city, country }) => {
  //testowo
  const images = [
    "/images/hotel1.jpg",
    "/images/hotel2.jpg",
    "/images/hotel3.jpg",
    "/images/hotel4.jpg",
    "/images/hotel5.jpg",
  ];
  return (
    <div className={styles.container}>
      <div className={styles.app}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{name}</h1>
          <a className={styles.info}>
            ul. {address}, {city}, {country}
          </a>
        </div>
        <div className={styles.panel}>
          <HotelGallery
            images={images}
            className={styles.hotelGallery}
          ></HotelGallery>
          <div className={styles.rateContainer}>
            <Review></Review>
          </div>
        </div>
      </div>
    </div>
  );
};
