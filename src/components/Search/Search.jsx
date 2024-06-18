import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { validateInn } from "../../shared/functions";

import "./Search.css";
import imgTop from "./documents.svg";
import imgBottom from "./searcher.svg";
import EditBox from "../../shared/EditBox/edit-box";
import DropDownList from "../../shared/DropDownList/drop-down-list";
import DateRangePicker from "../../shared/DateRangePacker/date-range-picker";
import CheckBoxGroup from "../../shared/CheckBoxGroup/check-box-group";

const Search = () => {
  const moods = [
    { k: "any", v: "Любая" },
    { k: "positive", v: "Позитивная" },
    { k: "negative", v: "Негативная" },
  ];

  const checkBoxes = {
    maxFullness: { name: "Признак максимальной полноты", value: false },

    inBusinessNews: {
      name: "Упоминания в бизнес-контексте",
      value: false,
    },

    onlyMainRole: {
      name: "Главная роль в публикации",
      value: false,
    },

    onlyWithRiskFactors: {
      name: "Публикации только с риск-факторами",
      value: false,
    },

    includeTechNews: {
      name: "Включать технические новости рынков",
      value: true,
    },

    includeAnnouncements: {
      name: "Включать анонсы и календари",
      value: true,
    },

    includeDigests: {
      name: "Включать сводки новостей",
      value: true,
    },
  };

  const navigate = useNavigate();

  const [inn, setInn] = useState("");
  const [mood, setMood] = useState("any");
  const [quantity, setQuantity] = useState("");
  const [range, setRange] = useState({});
  const [options, setOptions] = useState(checkBoxes);
  const [validAll, setValidAll] = useState({
    inn: false,
    quantity: false,
    range: false,
  });
  const [isValidAll, setIsValidAll] = useState(false);

  const validateForm = () => {
    let result = true;
    for (let key in validAll) {
      result &&= validAll[key];
    }
    setIsValidAll(result);
  };

  const validateQuantity = (quantity, error) => {
    let result = false;
    if (!quantity) {
      error.code = 1;
      error.message = "Обязательное поле";
    } else {
      const n = parseInt(quantity, 10);
      if (isNaN(n) || n < 1 || n > 1000) {
        error.code = 2;
        error.message = "Некорректные данные";
      } else {
        result = true;
      }
    }
    return result;
  };

  const validateRange = (range, error) => {
    let result = false;
    const currentDate = new Date();
    currentDate.setHours(23, 59, 59, 0);

    if (!range?.startDate || !range?.finalDate) {
      error.code = 1;
      error.message = "Обязательное поле";
    } else if (new Date(range.startDate) > new Date(range.finalDate)) {
      error.code = 2;
      error.message = "Некорректные границы периода";
    } else if (
      new Date(range.startDate) > currentDate ||
      new Date(range.finalDate) > currentDate
    ) {
      error.code = 3;
      error.message = "Диапазон за границей текущей даты";
    } else {
      result = true;
    }

    return result;
  };

  useEffect(() => {
    validateForm();
  }, [inn, mood, quantity, range, options, validAll]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const offset = new Date().getTimezoneOffset() / 60;
    const strOffset =
      (Math.sign(offset) <= 0 ? "+" : "-") +
      Math.abs(offset).toString().padStart(2, "0");

    if (isValidAll) {
      const objQuery = {
        issueDateInterval: {
          startDate: `${range.startDate}T00:00:00${strOffset}:00`,
          endDate: `${range.finalDate}T23:59:59${strOffset}:00`,
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: "company",
                inn: inn,
                maxFullness: options.maxFullness.value,
              },
            ],
            onlyMainRole: options.onlyMainRole.value,
            tonality: mood,
            onlyWithRiskFactors: options.onlyWithRiskFactors.value,
          },
        },
        attributeFilters: {
          excludeTechNews: !options.includeTechNews.value,
          excludeAnnouncements: !options.includeAnnouncements.value,
          excludeDigests: !options.includeDigests.value,
        },
        limit: Number(quantity),
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
      };

      console.log("objQuery:", objQuery);
      navigate("/results", { state: { search: objQuery } });
    }
  };

  return (
    <div className="search">
      <div className="search-content">
        <h1>
          Найдите необходимые <br />
          данные в пару кликов.
        </h1>
        <div className="search-decor_mobile">
          <img src={imgTop} alt="unordered documents and folders" />
        </div>
        <p>
          Задайте параметры поиска.
          <br />
          Чем больше заполните, тем точнее поиск
        </p>
        <form onSubmit={handleSubmit}>
          <div className="search-content__form">
            <div className="column">
              <EditBox
                className="search-content__form_edit-box"
                type="text"
                name="inn"
                caption="ИНН компании"
                placeholder="10 или 12 цифр"
                isRequire={true}
                value={inn}
                setValue={setInn}
                validateValue={validateInn}
                setValidAll={setValidAll}
              />
              <DropDownList
                className="search-content__form_drop-down-list"
                name="mood"
                caption="Тональность"
                value={mood}
                setValue={setMood}
                valueList={moods}
              />
              <EditBox
                className="search-content__form_edit-box"
                type="number"
                name="quantity"
                caption="Количество документов в выдаче"
                placeholder="От 1 до 1000"
                isRequire={true}
                value={quantity}
                setValue={setQuantity}
                validateValue={validateQuantity}
                setValidAll={setValidAll}
              />
              <DateRangePicker
                className="search-content__form_date-range-picker"
                name="range"
                caption="Диапазон поиска"
                placeholder={["Дата начала", "Дата конца"]}
                isRequire={true}
                value={range}
                setValue={setRange}
                validateValue={validateRange}
                setValidAll={setValidAll}
              />
            </div>
            <div className="column">
              <CheckBoxGroup
                className="search-content__form_check-box-group"
                value={options}
                setValue={setOptions}
              />
              <div className="search-content__form_submit-area">
                <button type="submit" disabled={!isValidAll}>
                  Поиск
                </button>
                <p>* Обязательные к заполнению поля</p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="search-decor">
        <img src={imgTop} alt="unordered documents and folders" />
        <img
          src={imgBottom}
          alt="a man with a large magnifying glass looks beyond"
        />
      </div>
    </div>
  );
};

export default Search;
