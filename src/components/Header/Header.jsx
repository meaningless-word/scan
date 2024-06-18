import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hook/useAuth";
import "./Header.css";

import AccountInfo from "./AccountInfo/account-info.jsx";
import Balance from "./Balance/balance.jsx";

import top_logo from "./logo.svg";
import bottom_logo from "../Footer/logo.svg";
import imgBurgerMenu from "./burger-menu.svg";
import imgClose from "./close.svg";

const Header = ({ setUserTariff, isSigned, setSigned }) => {
  const navigate = useNavigate();
  const { token, signOut, isExpired } = useAuth();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  useEffect(() => {
    setSigned(!isExpired());
  }, [isExpired()]);

  const handleSignIn = () => {
    setMobileMenuVisible(false);
    navigate("/login");
  };

  const handleMenuSwitcher = (e) => {
    setMobileMenuVisible((prev) => !prev);
  };

  return (
    <header>
      <div className="header-container">
        <div className="header-container__logo">
          <img className="img" src={top_logo} alt="СКАН" />
        </div>
        <div className="header-container__burger">
          {isSigned ? (
            <Balance
              token={token}
              signOut={signOut}
              setUserTariff={setUserTariff}
              mobileMenuVisible={mobileMenuVisible}
              setMobileMenuVisible={setMobileMenuVisible}
            />
          ) : (
            <span className="balance__place-keeper"></span>
          )}
          <img src={imgBurgerMenu} alt="Menu" onClick={handleMenuSwitcher} />
        </div>
        <div
          className={
            mobileMenuVisible
              ? "header-container-wrapper"
              : "header-container-wrapper_invisible"
          }
        >
          <div className="header-container__burger_active">
            <div className="header-container__burger_logo">
              <img className="img" src={bottom_logo} alt="СКАН" />
            </div>
            <div className="header-container__burger">
              <span className="balance__place-keeper"></span>
              <img src={imgClose} alt="Clsoe" onClick={handleMenuSwitcher} />
            </div>
          </div>
          <div className="header-container__navigate">
            <a href="/">Главная</a>
            <a href="#">Тарифы</a>
            <a href="#">FAQ</a>
          </div>
          <div className="header-container__user">
            {isSigned ? (
              <>
                {!mobileMenuVisible ? (
                  <Balance
                    token={token}
                    signOut={signOut}
                    setUserTariff={setUserTariff}
                    mobileMenuVisible={mobileMenuVisible}
                    setMobileMenuVisible={setMobileMenuVisible}
                  />
                ) : null}
                <AccountInfo
                  token={token}
                  signOut={signOut}
                  setUserTariff={setUserTariff}
                  setMobileMenuVisible={setMobileMenuVisible}
                />
              </>
            ) : (
              <div className="header-container__user-unsigned">
                <a href="#">Зарегистрироваться</a>
                <span></span>
                <button id="btnSignIn" onClick={handleSignIn}>
                  Войти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
