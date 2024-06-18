import React, { useState, useEffect } from "react";

import "./Main.css";
import { useAuth } from "../../hook/useAuth";
import QueryArea from "./QueryArea/query-area";
import WhyWeArea from "./WhyWeArea/why-we-area";
import TariffsArea from "./TariffsArea/tariffs-area";

const Main = ({ isSigned, userTariff }) => {
  const { user, isExpired } = useAuth();

  return (
    <article>
      <QueryArea isSigned={isSigned} />
      <WhyWeArea />
      <TariffsArea isSigned={isSigned} userTariff={userTariff} />
    </article>
  );
};

export default Main;
