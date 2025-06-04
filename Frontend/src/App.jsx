import { Routes, Route } from "react-router-dom";
import { LoginForm } from "../features/LoginForm";
import { RegisterForm } from "../features/RegisterForm";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { MainPage } from "../pages/MainPage";
import { RegisterPage } from "../pages/RegisterPage";
import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { AddHotelForm } from "../features/AddHotelForm";
import { ConfirmChoose } from "../components/ConfirmChoose";
import { HotelDetails } from "../pages/HotelDetails";
import { Footer } from "../components/Footer";
import { HotelDescription } from "../components/HotelDescription";
import { Review } from "../features/Review";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) return;

      const response = await fetch("http://localhost:8080/userinfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("Zalogowany użytkownik:", userData);
        setUser(userData);
      } else {
        console.error("Błąd podczas pobierania użytkownika");
      }
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/myaccount" element={<DashboardPage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/hotelDetails/:id" element={<HotelDetails />} />
        <Route path="/test" element={<HotelDescription />} />
        <Route path="/test2" element={<Review />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
