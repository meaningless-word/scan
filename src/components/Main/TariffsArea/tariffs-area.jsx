import React from "react";

import "./tariffs-area.css";
import Tariff from "./Tariff/tariff.jsx";

import imgBeginner from "./Tariff/beginner.svg";
import imgPro from "./Tariff/pro.svg";
import imgBusiness from "./Tariff/business.svg";

const TariffsArea = ({ isSigned, userTariff }) => {
  return (
    <div className="tariffs-area">
      <h2>Наши тарифы</h2>
      <div className="tariffs">
        <Tariff
          name="Beginner"
          description="Для небольшого исследования"
          image={imgBeginner}
          price="799 ₽"
          priceBefore="1 200 ₽"
          priceSplit="или 150 ₽/мес. при рассрочке на 24 мес."
          inclusions={[
            "Безлимитная история запросов",
            "Безопасная сделка",
            "Поддержка 24/7",
          ]}
          isActive={isSigned && userTariff === "beginner"}
        />
        <Tariff
          name="Pro"
          description="Для HR и фрилансеров"
          image={imgPro}
          price="1 299 ₽"
          priceBefore="2 600 ₽"
          priceSplit="или 279 ₽/мес. при рассрочке на 24 мес."
          inclusions={[
            "Все пункты тарифа Beginner",
            "Экспорт истории",
            "Рекомендации по приоритетам",
          ]}
          isActive={isSigned && userTariff === "pro"}
        />
        <Tariff
          name="Business"
          description="Для корпоративных клиентов"
          image={imgBusiness}
          price="2 379 ₽"
          priceBefore="3 700 ₽"
          inspriceSplittallmentText=""
          inclusions={[
            "Все пункты тарифа Pro",
            "Безлимитное количество запросов",
            "Приоритетная поддержка",
          ]}
          isActive={isSigned && userTariff == "business"}
        />
      </div>
    </div>
  );
};

export default TariffsArea;
