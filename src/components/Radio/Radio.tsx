/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from "react";
import style from "./Radio.module.css";
interface checkboxProps {
  data: Array<{ title: string; disabled?: boolean }>;
  checked?: string;
  radioFor: string;
  disabled?: boolean;
}

const Radio = ({
  data,
  radioFor,
  checked,
  disabled = false,
}: checkboxProps) => {
  const [isChecked, setIsChecked] = useState(checked ? checked : "false");

  const handleChange = (setter: string) => {
    if (disabled) return;
    setIsChecked(setter);
  };

  return (
    <div className={style.container}>
      {data.map((item, index) => (
        <label className={style.form_item} key={index + radioFor}>
          <input
            className={style.radio_input}
            type="radio"
            onChange={() => handleChange(item.title)}
            disabled={item.disabled}
            name={radioFor}
          />
          <div
            className={`${style.radio} ${
              !item.disabled && isChecked === item.title
                ? style.radio_active
                : style.radio_disabled
            }  ${
              isChecked === item.title && item.disabled
                ? style.radio_active_disabled
                : ""
            } `}
          >
            <div
              className={`${style.radio_inner} ${
                isChecked === item.title
                  ? style.radio_inner_active
                  : style.radio_inner_disabled
              } ${
                isChecked === item.title && item.disabled
                  ? style.radio_inner_active_disabled
                  : ""
              } 
             `}
            ></div>
          </div>
          {item.title}
        </label>
      ))}
    </div>
  );
};

export default Radio;
