import { useEffect, useState } from "react";
import { HotelGallery } from "../../features/HotelGallery";
import { Review } from "../../features/Review";
import styles from "/styles/HotelOverview.module.css";
import { useParams } from "react-router-dom";
import { HotelDescription } from "./HotelDescription";
import { HotelFacilities } from "./HotelFacilities";
import HotelReviews from "./HotelReviews";
import { ReservationHotelRooms } from "./ReservationHotelRooms";

export const HotelOverview = ({ hotel, checkOut, checkIn }) => {
  const [reviews, setReviews] = useState([]);
  const [randomReview, setRandomReview] = useState(null);
  const [rooms, setRooms] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetch(
        `http://localhost:8080/reviews/hotel/${id}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setReviews(data);
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomReview(data[randomIndex]);
      } else {
        console.log("błąd");
      }
    };

    const fetchRooms = async () => {
      const response = await fetch(`http://localhost:8080/hotels/${id}/rooms`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setRooms(data);
        console.log("Pokoje: ", data);
      } else {
        console.log("Błąd podczas pobierania listy pokoji");
      }
    };

    fetchRooms();
    fetchReview();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.app}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{hotel.name}</h1>
          <a className={styles.info}>
            ul. {hotel.address}, {hotel.city}, {hotel.country}
          </a>
        </div>
        <div className={styles.panel}>
          <HotelGallery
            images={hotel.images}
            className={styles.hotelGallery}
          ></HotelGallery>
          <div className={styles.rateContainer}>
            <Review
              rating={randomReview?.rating}
              comment={`„${randomReview?.comment}”`}
              createdAt={randomReview?.createdAt}
              userName={randomReview?.username}
            ></Review>
          </div>
        </div>
        <div className={styles.sectionsContainer}>
          <div className={styles.leftSection}>
            <HotelDescription
              description={hotel.description}
            ></HotelDescription>
            <HotelFacilities hotel={hotel}></HotelFacilities>
          </div>
          <div className={styles.rightSection}></div>
        </div>

        <ReservationHotelRooms
          room={rooms}
          checkOut={checkOut}
          checkIn={checkIn}
        ></ReservationHotelRooms>
        <HotelReviews
          hotelId={hotel?.id}
          label="Opinie hotelu"
          reviews={reviews}
          allowAdd="true"
        ></HotelReviews>
      </div>
    </div>
  );
};
