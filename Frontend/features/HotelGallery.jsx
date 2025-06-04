import styles from "/styles/HotelGallery.module.css";

export const HotelGallery = ({ images }) => {
  if (!images || images.length === 0) return null;

  const mainImage = images[0];
  const otherImages = images.slice(1, 5);

  return (
    <div className={styles.galleryGrid}>
      <div className={styles.mainImage}>
        <img src={mainImage} />
      </div>
      {otherImages.map((img, index) => (
        <div className={styles.sideImage} key={index}>
          <img src={img ?? "src/assets/nowe_zdjecie.webp"} />
        </div>
      ))}
    </div>
  );
};
