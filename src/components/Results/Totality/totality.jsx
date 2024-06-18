import React, { useState, useEffect } from "react";

import "./totality.css";

const Totality = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <>
          <div className="totality_place">
            <span>{item.date}</span>
            <span>{item.totalDocuments}</span>
            <span>{item.riskFactors}</span>
          </div>
          {index < data.length - 1 ? (
            <span className="totality_splitter"></span>
          ) : null}
        </>
      ))}
    </>
  );
};

export default Totality;
