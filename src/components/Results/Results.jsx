import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../../shared/api";
import { useAuth } from "../../hook/useAuth";

import "./Results.css";

import imgDecorate from "./results-decorate.svg";
import Totality from "./Totality/totality";
import Ribbon from "./Ribbon/ribbon";
import Spiner from "../../shared/Spiner/spiner";

import imgToLeft from "../../shared/images/to-left.svg";
import imgToRight from "../../shared/images/to-right.svg";

const Results = () => {
  const location = useLocation();
  const { token, signOut, isExpired } = useAuth();
  const bannerRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [histograms, setHistograms] = useState("");
  const [documentIds, setDocumentIds] = useState("");
  const [counter, setCounter] = useState(0);
  const [summary, setSummary] = useState(null);

  const objQuery = location.state?.search;

  const fetchHistograms = async () => {
    if (!objQuery) {
      console.error("Empty query");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsError(false);

    await axios
      .post(API_URL + "objectsearch/histograms/", objQuery, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(
            `HTTP error while requesting histograms! status: ${response.status}`
          );
        }
        console.log("histograms.response=", response.data.data);
        setHistograms(response.data.data);
      })
      .catch((error) => {
        console.error("Ошибка во время выполнения запроса:", error.message);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchObjects = async () => {
    if (!objQuery) {
      console.error("Empty query");
      return;
    }

    await axios
      .post(API_URL + "objectsearch/", objQuery, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(
            `HTTP error while requesting object search! status: ${response.status}`
          );
        }
        console.log("objectsearch.response=", response.data);
        const ids = response.data.items.map((item) => item.encodedId);
        setDocumentIds(ids);
      })
      .catch((error) => {
        console.error("Ошибка во время выполнения запроса:", error.message);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const pivot = () => {
    if (histograms && !isLoading && !isError) {
      const objPivot = {};
      const objTotal = {};

      histograms.forEach((row) => {
        objTotal[row.histogramType] = row.data.reduce(
          (sum, current) => sum + current.value,
          0
        );

        const objSorted = row.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        objSorted.forEach((col) => {
          const d = col.date.substr(0, 10);
          if (!objPivot[d]) {
            objPivot[d] = {
              date: d.split("-").reverse().join("."),
              totalDocuments: 0,
              riskFactors: 0,
            };
          }
          objPivot[d][row.histogramType] += col.value;
        });
      });

      setCounter(objTotal["totalDocuments"]);
      setSummary(Object.values(objPivot));
    }
  };

  useEffect(() => {
    fetchHistograms();
  }, []);

  useEffect(() => {
    console.log("histograms=", histograms);
    pivot();
    fetchObjects();
  }, [histograms]);

  const handleScrollPrev = (e) => {
    if (bannerRef.current) {
      bannerRef.current.scrollLeft -= 298;
    }
  };

  const handleScrollNext = (e) => {
    if (bannerRef.current) {
      bannerRef.current.scrollLeft += 298;
    }
  };

  return (
    <div className="results">
      <div className="results-decorate">
        <div className="results-decorate__text-area">
          <h1>
            Ищем. Скоро
            <br />
            будут результаты
          </h1>
          <p>
            Поиск может занять некоторое время,
            <br />
            просим сохранять терпение.
          </p>
        </div>
        <img
          src={imgDecorate}
          alt="woman looking through a magnifying glass and holding an archery target with an arrow in it's center"
        />
      </div>
      <div className="results-totality">
        <h1>Общая сводка</h1>
        <p>Найдено {counter.toLocaleString()} вариантов</p>
        <div className="results-totality__banner">
          <button
            className="results-totality__button"
            onClick={handleScrollPrev}
          >
            <img src={imgToLeft} />
          </button>
          <div className="results-totality__banner-slider">
            <div className="results-totality__banner-slider_header">
              <span>Период</span>
              <span>Всего</span>
              <span>Риски</span>
            </div>
            {isLoading ? (
              <div className="results-totality__banner-slider_loading">
                <Spiner size={50}></Spiner>
                <div>Загружаем данные</div>
              </div>
            ) : isError ? (
              <div className="results-totality__banner-slider_error">
                <p>Ошибка сервера. Возможно превышение лимита запросов.</p>
              </div>
            ) : (
              <div
                className="results-totality__banner-slider_body"
                ref={bannerRef}
              >
                <Totality data={summary} />
              </div>
            )}
          </div>
          <button
            className="results-totality__button"
            onClick={handleScrollNext}
          >
            <img src={imgToRight} />
          </button>
        </div>
      </div>

      {!isLoading && !isError ? <Ribbon ids={documentIds} /> : null}
    </div>
  );
};

export default Results;
