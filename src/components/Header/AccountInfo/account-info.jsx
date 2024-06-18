import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../../../shared/api";
import "./account-info.css";
import Spiner from "../../../shared/Spiner/spiner.jsx";

import imgPortrait from "./portrait.svg";

const AccountInfo = ({
  token,
  signOut,
  setUserTariff,
  setMobileMenuVisible,
}) => {
  const navigate = useNavigate();
  const [isLoadingPortrait, setIsLoadingPortrait] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPortrait, setUserPortrait] = useState(null);

  const handleSignOut = () => {
    setMobileMenuVisible(false);
    signOut(() => navigate("/", { replace: true }));
  };

  const fetchOptions = () => {
    // здесь будто бы запрашивается информация из личного кабинета пользователя
    setIsLoadingPortrait(true);
    setUserName("Алексей А.");
    setUserPortrait(imgPortrait);
    setUserTariff("beginner");
    setIsLoadingPortrait(false);
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <div className="account-info__navigate">
      {isLoadingPortrait ? (
        <Spiner size="24" />
      ) : (
        <>
          <div className="account-info__navigate_options">
            <span>{userName}</span>
            <img src={userPortrait} alt="user portrait" />
            <a href="#" onClick={handleSignOut}>
              Выйти
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountInfo;
