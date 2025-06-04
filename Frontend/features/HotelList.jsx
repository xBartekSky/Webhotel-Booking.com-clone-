import { useEffect, useState } from "react";
import styles from "/styles/HotelList.module.css";
import { useNavigate } from "react-router-dom";

export const HotelList = ({ searchParams }) => {
  const [allHotels, setAllHotels] = useState([]);
  const [page, setPage] = useState(0);
  const nav = useNavigate();

  const pageSize = 5;

  const totalPages = Math.ceil(allHotels.length / pageSize);

  useEffect(() => {
    const fetchHotels = async () => {
      let url = "http://localhost:8080/hotels";
      if (searchParams.city) {
        url = `http://localhost:8080/hotels/searchByCity?city=${encodeURIComponent(
          searchParams.city
        )}`;
      }

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setAllHotels(data);
          setPage(0); // reset strony przy nowych danych
        } else {
          console.error("Błąd podczas pobierania hoteli");
        }
      } catch (error) {
        console.error("Błąd: ", error);
      }
    };

    fetchHotels();
  }, [searchParams]);

  const currentHotels = allHotels.slice(page * pageSize, (page + 1) * pageSize);

  const nextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleCheckHotel = (hotel) => {
    nav(`/hotelDetails/${hotel?.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.app}>
        {currentHotels.length === 0 ? (
          <p>Brak hoteli do wyświetlenia</p>
        ) : (
          <>
            <div className={styles.hotelsContainer}>
              {currentHotels.map((hotel) => (
                <div className={styles.hotelContent} key={hotel.id}>
                  <div className={styles.hotelImage}>
                    <div className={styles.imageContainer}>
                      <img
                        className={styles.image}
                        src={
                          hotel.mainImageUrl ?? "src/assets/nowe_zdjecie.webp"
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.hotelDesc}>
                    <h3>{hotel.name}</h3>
                    <p>{hotel.city}</p>
                    <p>{hotel.description}</p>
                    <div className={styles.separator}></div>
                    <button
                      className={styles.button}
                      onClick={() => handleCheckHotel(hotel)}
                    >
                      Sprawdź dostępność
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.pagination}>
              <button onClick={prevPage} disabled={page === 0}>
                Poprzednia
              </button>
              <span>
                Strona {page + 1} z {totalPages}
              </span>
              <button onClick={nextPage} disabled={page === totalPages - 1}>
                Następna
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
