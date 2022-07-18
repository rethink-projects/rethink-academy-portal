import style from "./Label.module.css";
import { Images } from "../../assets/index";

type LabelProps = {
  color: "primary" | "secondary" | "accent" | "danger" | "warning" | "success";
  size: "large" | "default" | "small" | "micro";
  iconPosition: "none" | "left" | "right" | "both";
  text: string;
  icon: "arrow" | "google" | "info";
};

const Label = ({ color, size, iconPosition, text, icon }: LabelProps) => {
  let hasIcon = false;
  if (iconPosition != "none") {
    hasIcon = true;
  }

  return (
    <div className={`${style.label_default} ${style[color]} ${style[size]} `}>
      {/* <img src={Images[icon]} alt={`${icon} icon`} /> */}
      {text}
      <img src={Images[icon]} alt={`${icon} icon`} />
    </div>
  );
};

export default Label;
