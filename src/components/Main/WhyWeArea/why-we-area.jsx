import Reat from "react";

import "./why-we-area.css";
import why_we_area_pic from "./why-we-area.svg";

import Abilities from "./Abilities/abilities";

const WhyWeArea = () => {
  return (
    <div className="why-we-are">
      <div className="why-we-are_header">
        <h2>Почему именно мы</h2>
      </div>
      <Abilities />
      <div className="why-we-are_img">
        <img src={why_we_area_pic} alt="image illustrating our superiority" />
      </div>
    </div>
  );
};

export default WhyWeArea;
