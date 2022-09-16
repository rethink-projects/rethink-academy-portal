import style from "./ButtonWithIcon.module.css";
type ButtonWithIconProps = {
  type: "primary" | "secondary" | "outline" | "disabled";
  size: "large" | "medium" | "small" | "block";
  text: string;
  icon: JSX.Element;
  onClick?: () => void;
  width?: number;
  position: "left" | "right";
  typeEmblemCheck?: boolean;
};

const ButtonWithIcon = ({
  type,
  position = "left",
  size,
  text,
  icon,
  width = 181,
  onClick,
  typeEmblemCheck = false,
}: ButtonWithIconProps) => {
  return (
    <button
      onClick={onClick}
      className={`${style.btn_w_icon_right_default} ${style[type]} ${
        style[size]
      } ${typeEmblemCheck && style.emblemCheck}`}
      style={{ width: size === "block" ? "" : width }}
      disabled={type === "disabled"}
    >
      {position === "left" && icon}
      {text}
      {position === "right" && icon}
    </button>
  );
};

export default ButtonWithIcon;
