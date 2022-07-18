import style from "./Label.module.css";

type LabelProps = {
  color: "primary" | "secondary" | "accent" | "danger" | "warning" | "success";
  size: "large" | "default" | "small" | "micro";
  iconPosition: "none" | "left" | "right" | "both";
  text: string;
  children: JSX.Element;
};

const Label = ({ color, size, iconPosition, text, children }: LabelProps) => {
  let hasIcon = false;
  if (iconPosition != "none") {
    hasIcon = true;
  }

  return (
    <div className={`${style.label_default} ${style[color]} ${style[size]} `}>
      {iconPosition == "left" && children }
      {iconPosition == "both" && children }
      {text}

      {iconPosition == "right" && children}
      {iconPosition == "both" &&  children}
    </div>
  );
};

export default Label;
