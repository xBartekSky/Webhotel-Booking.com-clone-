import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../components/InputField";
import styles from "/styles/LoginPage.module.css";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setUser } = useContext(UserContext);
  const nav = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.emailFormatError = "Podaj poprawny adres e-mail";
    }

    if (password.trim() === "") {
      newErrors.passwordError = "Hasło nie może być puste";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);

      const responseUser = await fetch("http://localhost:8080/userinfo", {
        headers: { Authorization: `Bearer ${data.token}` },
      });

      if (responseUser.ok) {
        const userData = await responseUser.json();
        setUser(userData);
        nav("/dashboard");
      }
    } else {
      setErrors({ loginError: "Nieprawidłowy e-mail lub hasło" });
    }
  };

  return (
    <form onSubmit={handleLogin} className="loginForm">
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

      {errors.loginError && (
        <div className={styles.errorMessage}>{errors.loginError}</div>
      )}

      <button type="submit" className="submitLoginButton">
        Zaloguj się za pomocą Webhotel.com
      </button>
    </form>
  );
};
