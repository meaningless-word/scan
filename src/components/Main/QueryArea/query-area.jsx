import React from "react";
import { useNavigate } from "react-router-dom";

import "./query-area.css";
import query_area_pic from "./query-area.svg";

const QueryArea = ({ isSigned }) => {
  const navigate = useNavigate();

  const handlePrepareQuery = () => {
    navigate("/search");
  };

  return (
    <div className="query-area">
      <div className="query-area_image">
        <img src={query_area_pic} alt="image illustrating the search" />
      </div>
      <div className="query-area_about">
        <h1>
          сервис по поиску
          <br />
          публикаций
          <br />
          о компании
          <br />
          по его ИНН
        </h1>
        <p>
          Комплексный анализ публикаций, получение данных в формате PDF на
          электронную почту.
        </p>
        {isSigned ? (
          <button onClick={handlePrepareQuery}>Запросить данные</button>
        ) : null}
      </div>
    </div>
  );
};

export default QueryArea;
