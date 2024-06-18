import React from "react";

import "./tariff.css";
import checkMark from "./check-mark.svg";

const Tariff = ({
  name,
  description,
  image,
  price,
  priceBefore,
  priceSplit,
  inclusions,
  isActive,
}) => {
  return (
    <div className="tariff-card">
      <div className={`tariff-header tariff-header-coloring__${name}`}>
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <img src={image} />
      </div>
      <div
        className={`tariff-body ${
          isActive ? "tariff-body-bordering__" + name : ""
        }`}
      >
        <div className="tariff-body__current">
          {isActive ? (
            <div className="tariff-body__current_active">Текущий тариф</div>
          ) : null}
        </div>
        <div className="tariff-body__price">
          <span className="tariff-body__price_now">{price}</span>
          <span className="tariff-body__price_old">{priceBefore}</span>
          <span className="tariff-body__price_split">{priceSplit}</span>
        </div>
        <div className="tariff-body__inclusions">
          В тариф входит:
          <ul className="tariff-body__inclusions_list">
            {inclusions.map((t, i) => (
              <li key={i}>
                <img src={checkMark} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        {isActive ? (
          <button className="tariff-body__button tariff-body__button_active">
            Перейти в личный кабинет
          </button>
        ) : (
          <button className="tariff-body__button">Подробнее</button>
        )}
      </div>
    </div>
  );
};

export default Tariff;
