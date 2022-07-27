import React from "react";
import style from "./ButtonWithIconRight.module.css";
import { Images } from "../../assets/index";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type ButtonWithIconRightProps = {
  type: "primary" | "secondary" | "outline" | "disabled";
  size: "large" | "medium" | "small";
  text: string;
  icon: JSX.Element;
  onClick?: () => void;
  width?: number;
};

const ButtonWithIconRight = ({
  type,
  size,
  text,
  icon,
  width = 181,
  onClick,
}: ButtonWithIconRightProps) => {
  return (
    <button
      onClick={onClick}
      className={`${style.btn_w_icon_right_default} ${style[type]} ${style[size]}`}
      style={{ width: width }}
    >
      {text}
      {icon}
    </button>
  );
};

export default ButtonWithIconRight;
