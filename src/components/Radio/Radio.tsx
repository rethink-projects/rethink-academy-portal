/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from "react";
import style from "./Radio.module.css";
interface checkboxProps {
  data: Array<{ title: string; disabled?: boolean }>;
  checked?: string;
  radioFor: string;
}

const Radio = ({ data, radioFor, checked }: checkboxProps) => {
  const [isChecked, setIsChecked] = useState(checked ? checked : "false");

  return (
    <>
      {data.map((item, index) => (
        <label className={style.container} key={index + radioFor}>
          <input
            className={style.radio_input}
            type="radio"
            onChange={() => setIsChecked(item.title)}
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
    </>
  );
};

export default Radio;
