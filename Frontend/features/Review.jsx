import styles from "/styles/Review.module.css";

export const Review = () => {
  return (
    <div className={styles.container}>
      <div className={styles.reviewContainer}>
        <div className={styles.stars}>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
        </div>
        <div className={styles.reviewTitle}>
          <a href="">Tytuł</a>
        </div>
        <div className={styles.reviewBody}>
          <a href=""> Opis OpisOpisOpisOpisOpis</a>
        </div>
        <div className={styles.reviewOwner}>
          <a href=""> Uzytkownik X</a>
        </div>
      </div>
    </div>
  );
};
