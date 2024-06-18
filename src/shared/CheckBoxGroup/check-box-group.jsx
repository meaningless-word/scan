import React from "react";

import "./check-box-group.css";

const CheckBoxGroup = ({ className, value, setValue }) => {
  const handleCheckBoxChange = (e) => {
    const option = { ...value[e.target.id], value: e.target.checked };
    setValue((prev) => ({ ...prev, [e.target.id]: option }));
  };

  return (
    <div className={className}>
      {Object.keys(value).map((x) => (
        <label key={`label-${x}`} className="check-box__wrapper">
          <input
            type="checkbox"
            key={x}
            id={x}
            onChange={handleCheckBoxChange}
            checked={value[x].value}
          />
          <span>{value[x].name}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckBoxGroup;
