import React, { useState, useEffect, useRef } from "react";

import "./edit-box.css";

const EditBox = ({
  className,
  type, //пока проверялся с text, number, data, необязательный, text по умолчанию
  name, //имя контрола, обяззательный
  caption, //надпись над контролом, необязательный, наличие определяет и отображение ошибки под контролом
  placeholder, //подсказка при пустом контроле
  isRequire, //указатель обязателности заполнения контрола в виде *
  value, //значение контрола для внешних связей
  setValue, //установка значения контрола при изменении
  validateValue, //функция проверки значения (значение: строка, ошибка: {код, сообщение}) возвращает true/false
  classList, //перечень классов контрола для управления снаружи
  setValidAll, //отметка о валидации в сводном объекте
}) => {
  const [errorState, setErrorState] = useState({});
  const inputRef = useRef(null);
  const requirerRef = useRef(null);

  const switchAlarm = (alarm) => {
    if (alarm) {
      requirerRef?.current?.classList.add("edit-box__error-state");
      inputRef?.current?.classList.add("edit-box__input_error-state");
    } else {
      requirerRef?.current?.classList.remove("edit-box__error-state");
      inputRef?.current?.classList.remove("edit-box__input_error-state");
    }
  };

  const validateMe = () => {
    const objError = {};
    const result = validateValue(value, objError);
    setValidAll((prev) => ({ ...prev, [name]: result }));
    setErrorState(objError); //для отображения ошибки под контролом

    if (classList === undefined) {
      //если снаружи не передан перечень классов, то сами управяем "ошибочной иллюминацией"
      switchAlarm(!result); //включить/погасить иллюминацию
    }
  };

  const handleBlur = (e) => {
    validateMe();

    e.target.type = e.target.value ? type : "text";
  };

  useEffect(() => {
    validateMe();
  }, [value]);

  return (
    <div className={className}>
      {caption ? (
        <label htmlFor={name} className="edit-box__caption">
          {caption}
          {isRequire ? (
            <span className="edit-box__requirer" ref={requirerRef}>
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <input
        type="text"
        id={name}
        name={name}
        className={classList || "edit-box__input"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onFocus={(e) => (e.target.type = type)}
        ref={inputRef}
      />
      {caption ? (
        <div className="edit-box__error_message edit-box__error-state ">
          {errorState?.message}
        </div>
      ) : null}
    </div>
  );
};

export default EditBox;
