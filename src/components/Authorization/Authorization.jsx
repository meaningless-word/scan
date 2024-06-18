import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hook/useAuth";
import { API_URL } from "../../shared/api";

import "./Authorization.css";
import imgKey from "./key-keepers.svg";
import imgLock from "./lock.svg";
import imgGoogle from "./logo-google.svg";
import imgFacebook from "./logo-facebook.svg";
import imgYandex from "./logo-yandex.svg";

const Authorization = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const fromPage = location.state?.from?.pathname || "/";

  const [values, setValues] = useState({ login: "", password: "" });
  const [errorState, setErrorState] = useState({
    login: false,
    password: false,
  });

  const handleChange = (e) => {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.id]: e.target.value,
    }));

    setErrorState((oldValues) => ({
      ...oldValues,
      [e.target.id]: false,
    }));
  };

  const handleAuthorize = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL + "account/login", values);
      if (response.status === 200) {
        signIn(response.data, () => navigate(fromPage, { replace: true }));
      }
    } catch (error) {
      console.error("Ошибка атентификации:", error);
      setErrorState({ login: true, password: true });
    }
  };

  return (
    <article>
      <div className="auth-container">
        <h1>
          Для оформления подписки
          <br />
          на тариф, необходимо
          <br />
          авторизоваться.
        </h1>
        <img
          className="auth-container__decor-area_top"
          src={imgLock}
          alt="lock"
        />
        <div className="auth-container__input-area">
          <div className="auth-container__input-area_tab-container">
            <span className="active">Войти</span>
            <span className="unactive">
              <a href="#">Зарегистрироваться</a>
            </span>
          </div>
          <form onSubmit={handleAuthorize}>
            <div className="auth-container__input-area_text-field">
              <label htmlFor="login">Логин или номер телефона:</label>
              <input
                className={errorState.login ? "attention" : ""}
                type="text"
                id="login"
                value={values.login}
                onChange={handleChange}
                required
              />
              {errorState.login ? (
                <div className="auth-container__input-area_error">
                  логин или пароль указаны неверно
                </div>
              ) : null}
            </div>
            <div className="auth-container__input-area_text-field">
              <label htmlFor="password">Пароль:</label>
              <input
                className={errorState.login ? "attention" : ""}
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                required
              />
              {errorState.password ? (
                <div className="auth-container__input-area_error">
                  логин или пароль указаны неверно
                </div>
              ) : null}
            </div>
            <div className="auth-container__input-area_button-submit">
              <button
                type="submit"
                disabled={!(values.login && values.password)}
              >
                Войти
              </button>
            </div>
            <a href="#" className="auth-container__input-area_restore">
              Восстановить пароль
            </a>
          </form>
          <div className="auth-container__input-area_alter">
            <p>Войти через:</p>
            <button>
              <img src={imgGoogle} alt="Google" />
            </button>
            <button>
              <img src={imgFacebook} alt="facebook" />
            </button>
            <button>
              <img src={imgYandex} alt="Яndex" />
            </button>
          </div>
        </div>

        <img
          className="auth-container__decor-area_bottom"
          src={imgKey}
          alt="Key keepers"
        />
      </div>
    </article>
  );
};

export default Authorization;
