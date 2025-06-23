import React, { useState } from "react";
import styles from "/styles/HotelReviews.module.css";
import { Review } from "../../features/Review";
import Modal from "../Modal";
import { AddHotelForm } from "../../features/forms/AddHotelForm";
import { Button } from "../Button";
import { AddReviewForm } from "../../features/forms/AddReviewForm";

export const HotelReviews = ({ hotelId, label, reviews, allowAdd }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const closeModal = () => {
    setShowAddForm(false);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{label}</h1>
      <div className={styles.content}>
        {reviews.map((review) => (
          <Review
            rating={review?.rating}
            comment={review?.comment}
            userName={review?.username}
            createdAt={review?.createdAt}
          ></Review>
        ))}
        <Modal isOpen={showAddForm} onClose={closeModal}>
          <AddReviewForm idHotel={hotelId} />
        </Modal>
      </div>
      {allowAdd ? (
        <Button label="Dodaj opinię" onClick={() => setShowAddForm(true)} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default HotelReviews;
