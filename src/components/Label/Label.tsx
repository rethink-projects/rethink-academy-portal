import style from "./Label.module.css";

type LabelProps = {
  color: "primary" | "secondary" | "accent" | "danger" | "warning" | "success";
  size?: "large" | "default" | "small" | "micro";
  iconPosition: "none" | "left" | "right" | "both";
  text: string;
  children?: JSX.Element;
};

const Label = ({
  color,
  size = "default",
  iconPosition = "none",
  text,
  children,
}: LabelProps) => {
  return (
    <div className={`${style.label_default} ${style[color]} ${style[size]} `}>
      {iconPosition === "left" || iconPosition === "both" ? children : ""}
      {/* {iconPosition == "both" && children} */}
      {text}
      {iconPosition === "right" || iconPosition === "both" ? children : ""}
      {/* {iconPosition == "right" && children}
      {iconPosition == "both" && children} */}
    </div>
  );
};

export default Label;
