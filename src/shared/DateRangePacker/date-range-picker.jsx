import Reat, { useState, useRef, useEffect } from "react";

import "./date-range-picker.css";
import EditBox from "../EditBox/edit-box";

const DateRangePicker = ({
  className,
  name,
  caption,
  placeholder,
  isRequire,
  value,
  setValue,
  validateValue,
  setValidAll,
}) => {
  const [errorState, setErrorState] = useState({});
  const [startDate, setStartDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const requirerRef = useRef(null);

  const [startClassList, setStartClassList] = useState("");
  const [finalClassList, setFinalClassList] = useState("");

  const switchAlarm = (alarm) => {
    if (alarm) {
      requirerRef?.current?.classList.add("date-range-picker__error-state");
      setStartClassList("edit-box__input edit-box__input_error-state");
      setFinalClassList("edit-box__input edit-box__input_error-state");
    } else {
      requirerRef?.current?.classList.remove("date-range-picker__error-state");
      setStartClassList("edit-box__input");
      setFinalClassList("edit-box__input");
    }
  };

  const validateMe = () => {
    const objError = {};
    const result = validateValue(value, objError);
    setValidAll((prev) => ({ ...prev, [name]: result }));
    switchAlarm(!result);
    setErrorState(objError);
  };

  useEffect(() => {
    setValue({ startDate: startDate, finalDate: finalDate });
    validateMe();
  }, [startDate, finalDate]);

  return (
    <div className={className}>
      {caption ? (
        <label htmlFor={name} className="date-range-picker__caption">
          {caption}
          {isRequire ? (
            <span className="date-range-picker__requirer" ref={requirerRef}>
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <div className="date-range-picker__wrapper">
        <EditBox
          type="date"
          name="startDate"
          placeholder={placeholder[0]}
          isRequire={false}
          value={startDate}
          setValue={setStartDate}
          validateValue={(v, e) => {
            setValue((prev) => ({ ...prev, startDate: v }));
            validateMe();
            return true;
          }}
          classList={startClassList}
          setValidAll={setValidAll}
        />
        <EditBox
          type="date"
          name="finalDate"
          placeholder={placeholder[1]}
          isRequire={false}
          value={finalDate}
          setValue={setFinalDate}
          validateValue={(v, e) => {
            setValue((prev) => ({ ...prev, finalDate: v }));
            validateMe();
            return true;
          }}
          classList={finalClassList}
          setValidAll={setValidAll}
        />
      </div>
      {caption ? (
        <div className="date-range-picker__error_message date-range-picker__error-state ">
          {errorState?.message}
        </div>
      ) : null}
    </div>
  );
};

export default DateRangePicker;
