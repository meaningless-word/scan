import React, { useState } from "react";

import "./drop-down-list.css";

const DropDownList = ({
  className,
  name,
  caption,
  value,
  setValue,
  valueList,
}) => {
  const [errorState, setErrorState] = useState({});
  return (
    <div className={`drop-down-list ${className}`}>
      {caption ? (
        <label htmlFor={name} className="drop-down-list__caption">
          {caption}
        </label>
      ) : null}
      <select
        className={className}
        id={name}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {valueList.map((i) => (
          <option key={i.k} value={i.k}>
            {i.v}
          </option>
        ))}
      </select>
      {caption ? (
        <div className="drop-down-list__error_message">
          {errorState?.message}
        </div>
      ) : null}
    </div>
  );
};

export default DropDownList;
