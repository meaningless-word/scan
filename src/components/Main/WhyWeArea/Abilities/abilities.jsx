import React, { useRef } from "react";

import "./abilities.css";
import toLeft from "../../../../shared/images/to-left.svg";
import toRight from "../../../../shared/images/to-right.svg";
import imgSpeed from "./speed.svg";
import imgSearch from "./search.svg";
import imgShield from "./shield.svg";
import imgDummy from "./add_circle_48dp_FILL0_wght400_GRAD0_opsz48.svg";

const Abilities = () => {
  const bannerRef = useRef(null);
  const boxRef = useRef(null);

  const handleScrollPrev = () => {
    if (bannerRef.current) {
      bannerRef.current.scrollLeft -=
        bannerRef.current.clientWidth /
        Math.floor(bannerRef.current.clientWidth / boxRef.current.clientWidth);
    }
  };

  const handleScrollNext = () => {
    if (bannerRef.current) {
      bannerRef.current.scrollLeft +=
        bannerRef.current.clientWidth /
        Math.floor(bannerRef.current.clientWidth / boxRef.current.clientWidth);
    }
  };

  return (
    <div className="abilities-container">
      <button className="abilities__button" onClick={handleScrollPrev}>
        <img src={toLeft} alt="<" />
      </button>
      <div className="abilities__banner-slider" ref={bannerRef}>
        <div className="abilities__ability-box" ref={boxRef}>
          <img className="abilities__aility-box_img" src={imgSpeed} />
          <p>
            Высокая и оперативная скорость <br />
            обработки заявки
          </p>
        </div>
        <div className="abilities__ability-box">
          <img className="abilities__aility-box_img" src={imgSearch} />
          <p>
            Огромная комплексная база
            <br />
            данных, обеспечивающая
            <br />
            объективный ответ на запрос
          </p>
        </div>
        <div className="abilities__ability-box">
          <img className="abilities__aility-box_img" src={imgShield} />
          <p>
            Защита конфеденциальных сведений,
            <br />
            не подлежащих разглашению по
            <br />
            федеральному законодательству
          </p>
        </div>
        <div className="abilities__ability-box">
          <img className="abilities__aility-box_img" src={imgDummy} />
          <p>И много чего ещё</p>
        </div>
        <div className="abilities__ability-box">
          <img className="abilities__aility-box_img" src={imgDummy} />
          <p>И ещё...</p>
        </div>
        <div className="abilities__ability-box">
          <img className="abilities__aility-box_img" src={imgDummy} />
          <p>И ещё...</p>
        </div>
      </div>
      <button className="abilities__button" onClick={handleScrollNext}>
        <img src={toRight} />
      </button>
    </div>
  );
};

export default Abilities;
