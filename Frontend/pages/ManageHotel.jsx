import { useEffect, useState } from "react";
import { HotelInformation } from "../components/hotelComponents/HotelInformation";
import { LoggedUserHeader } from "../components/LoggedUserHeader";
import { useUser } from "../context/UserContext";
import styles from "/styles/ManageHotel.module.css";
import { useParams } from "react-router-dom";
import { HotelRooms } from "../features/forms/HotelRooms";
import HotelReviews from "../components/hotelComponents/HotelReviews";
import { MainPageNav } from "../features/MainPageNav";

export const ManageHotel = () => {
  const { user } = useUser();
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);

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
        console.log(data);
      } else {
        console.log("błąd");
      }
    };

    const fetchHotel = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/hotels/protected/id/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHotel(data);
      }
    };

    fetchReview();
    fetchHotel();
  }, []);

  return (
    <div className={styles.container}>
      <LoggedUserHeader name={user?.username}></LoggedUserHeader>
      <div className={styles.panel}>
        <div className={styles.app}>
          <MainPageNav></MainPageNav>
          <HotelInformation
            hotelName={hotel?.name}
            hotelAddress={hotel?.address}
            phoneNumber={hotel?.phoneNumber}
            hotelId={hotel?.id}
            label="Informacje o hotelu"
          ></HotelInformation>
          <HotelRooms label="Lista pokoi" hotelId={id}></HotelRooms>
          <HotelReviews label="Opinie hotelu" reviews={reviews}></HotelReviews>
        </div>
      </div>
    </div>
  );
};
