import React from "react";
import style from "./ButtonWithIconRight.module.css";
import { Icons } from "../../assets/index";

type ButtonWithIconRightProps = {
  type: "primary" | "secondary" | "outline" | "disabled";
  size: "large" | "medium" | "small";
  text: string;
  icon: "arrow";
  onClick?: () => void;
  //iconPosition: "left" | "right";
};

const ButtonWithIconRight = ({
  type,
  size,
  text,
  icon,
  //iconPosition
  onClick,
}: ButtonWithIconRightProps) => {
  return (
    <button
      onClick={onClick}
      className={`${style.btn_w_icon_right_default} ${style[type]} ${style[size]}`}
    >
      {text} <img src={Icons[icon]} alt={`${icon} icon`} />
    </button>
  );
};

export default ButtonWithIconRight;
