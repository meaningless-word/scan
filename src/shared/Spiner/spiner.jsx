import React from "react";
import "./spiner.css";
import imgSpiner from "./spiner.svg";

const Spiner = ({ size }) => {
  return <img src={imgSpiner} className={"spiner" + size} alt="Loading..." />;
};

export default Spiner;
