import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../../../shared/api";
import "./balance.css";
import Spiner from "../../../shared/Spiner/spiner.jsx";

const Balance = ({
  token,
  signOut,
  setUserTariff,
  mobileMenuVisible,
  setMobileMenuVisible,
}) => {
  const navigate = useNavigate();
  const [usedCompanyCount, setUsedCompanyCount] = useState(0);
  const [companyLimit, setCompanyLimit] = useState(0);
  const [isLoadingLimit, setIsLoadingLimit] = useState(false);
  const [isLoadingPortrait, setIsLoadingPortrait] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPortrait, setUserPortrait] = useState(null);

  const handleSignOut = () => {
    setMobileMenuVisible(false);
    signOut(() => navigate("/", { replace: true }));
  };

  const fetchInfo = async () => {
    setIsLoadingLimit(true);
    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      };
      const response = await axios.get(API_URL + "account/info", { headers });
      if (response.status === 200) {
        setCompanyLimit(response.data.eventFiltersInfo.companyLimit);
        setUsedCompanyCount(response.data.eventFiltersInfo.usedCompanyCount);
      }
    } catch (error) {
      console.error("Ошибка обращения к account info:", error);
    } finally {
      setIsLoadingLimit(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className={"balance__limit"}>
      {isLoadingLimit ? (
        <div className="balance__limit_loading">
          <Spiner size="24" />
        </div>
      ) : (
        <div className="balance__limit_grid">
          <span className="box1">Использовано компаний</span>
          <span className="box2">{usedCompanyCount}</span>
          <span className="box1">Лимит по компаниям</span>
          <span className="box4">{companyLimit}</span>
        </div>
      )}
    </div>
  );
};

export default Balance;
