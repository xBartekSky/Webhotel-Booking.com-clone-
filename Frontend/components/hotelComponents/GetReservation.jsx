import React, { useState } from "react";

import styles from "/styles/GetReservation.module.css";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { useUser } from "../../context/UserContext";
import { useParams } from "react-router-dom";

export const GetReservation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
    checkInDate: "",
    checkOutDate: "",
    paymentRequired: true,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { id } = useParams();

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Imię jest wymagane";
    if (!formData.lastName.trim())
      newErrors.lastName = "Nazwisko jest wymagane";
    if (!formData.phone.trim()) newErrors.phone = "Telefon jest wymagany";
    if (!formData.address.trim()) newErrors.address = "Adres jest wymagany";
    if (!formData.email.trim()) newErrors.email = "Email jest wymagany";
    if (!formData.checkInDate)
      newErrors.checkInDate = "Data przyjazdu jest wymagana";
    if (!formData.checkOutDate)
      newErrors.checkOutDate = "Data wyjazdu jest wymagana";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomId: id,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate,
          paymentRequired: true,
          userId: user?.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: formData.address,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.status === 201 && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.message || "Błąd podczas tworzenia rezerwacji.");
      }
    } catch (error) {
      console.error("Błąd rezerwacji:", error);
      alert("Wystąpił błąd podczas rezerwacji.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleBooking();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Ostatni krok rezerwacji</h1>
          <div className={styles.inputs}>
            <InputField
              label="Data przyjazdu"
              type="date"
              onChange={(e) => handleChange("checkInDate", e.target.value)}
              iconName="calendar"
              error={errors.checkInDate}
            />
            <InputField
              label="Data wyjazdu"
              type="date"
              onChange={(e) => handleChange("checkOutDate", e.target.value)}
              iconName="calendar"
              error={errors.checkOutDate}
            />
            <InputField
              label="Imię"
              type="text"
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Wpisz imię"
              iconName="user"
              error={errors.firstName}
            />
            <InputField
              label="Nazwisko"
              type="text"
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Wpisz nazwisko"
              iconName="user"
              error={errors.lastName}
            />
            <InputField
              label="Telefon"
              type="tel"
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Wpisz numer telefonu"
              iconName="phone"
              error={errors.phone}
            />
          </div>
          <div className={styles.inputs}>
            <InputField
              label="Adres"
              type="text"
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Wpisz adres"
              iconName="map"
              error={errors.address}
            />
            <InputField
              label="E-mail"
              type="email"
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Wpisz adres e-mail"
              iconName="mail"
              error={errors.email}
            />
            <Button
              type="submit"
              label={loading ? "Przetwarzanie..." : "Zarezerwuj"}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetReservation;
