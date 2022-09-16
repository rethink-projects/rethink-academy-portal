import React from "react";
import style from "./Emblem.module.css";
import Images from "../../assets";

type EmblemProps = {
  badge:
    | "academy"
    | "studies"
    | "design"
    | "engineering"
    | "goals"
    | "product"
    | "timeRecord"
    | "welcome"
    | "troll";
  number?: number;
  size?: "big" | "default" | "small";
};

const Emblem = ({ badge, number = 1, size = "default" }: EmblemProps) => {
  return (
    <div
      className={
        number > 0
          ? `${style[size]} ${style.image}`
          : `${style[size]} ${style.image}  ${style.zero}`
      }
    >
      <img src={Images.badge[badge]} alt={`Emblema de ${badge}`} />
      {number > 1 && (
        <div className={style.numberContainer}>
          {number < 10 ? `0${number}` : number}
        </div>
      )}
    </div>
  );
};

export default Emblem;
