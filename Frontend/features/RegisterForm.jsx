import { useState } from "react";
import { InputField } from "../components/InputField";
import styles from "/styles/RegisterPage.module.css";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const nav = useNavigate();
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.emailFormatError = "Podaj poprawny adres e-mail";
    }

    if (email !== confirmedEmail) {
      newErrors.emailConflict = "Podane adresy e-mail nie pasują do siebie";
    }

    if (password.length < 6) {
      newErrors.passwordError = "Hasło musi się składać z conajmniej 6 znaków";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Zarejestrowano");
      console.log(data);
      setErrors("");
      nav("/login");
    } else if (response.status === 409) {
      newErrors.emailAlreadyError = "Podany adres e-mail jest zajęty";

      console.error("Nieprawidlowe dane");
    }
  };

  return (
    <form className="registerForm" onSubmit={handleRegister}>
      <InputField
        label="Nazwa użytkownika"
        placeholder="Podaj nazwę użytkownika"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        iconName="fa-solid fa-user"
        label="Adres e-mail"
        placeholder="Podaj adres e-mail"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.emailFormatError && (
        <div className={styles.errorMessage}>{errors.emailFormatError}</div>
      )}
      {errors.emailAlreadyError && (
        <div className={styles.errorMessage}>{errors.emailAlreadyError}</div>
      )}
      <InputField
        label="Powtórz adres e-mail"
        placeholder="Powtórz adres e-mail"
        type="text"
        onChange={(e) => setConfirmedEmail(e.target.value)}
      />
      {errors.emailConflict && (
        <div className={styles.errorMessage}>{errors.emailConflict}</div>
      )}
      <InputField
        iconName="fa-solid fa-key"
        label="Hasło"
        placeholder="Podaj hasło"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.passwordError && (
        <div className={styles.errorMessage}>{errors.passwordError}</div>
      )}
      <button className={styles.submitRegisterButton} type="submit">
        Zarejestruj
      </button>
    </form>
  );
};
