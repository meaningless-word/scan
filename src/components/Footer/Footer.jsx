import React from "react";

import "./Footer.css";
import bottom_logo from "./logo.svg";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-container__logo">
          <img className="img" src={bottom_logo} alt="СКАН" />
        </div>
        <div className="footer-container__about">
          <div className="contacts">
            г. Москва, Цветной б-р, 40
            <br />
            +7 495 771 21 11
            <br />
            info@skan.ru
            <br />
          </div>
          <div className="copyright">Copyright. 2022</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
