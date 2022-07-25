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
  const both_gap = iconPosition == "both" ? "both_gap_padding" : "";

  return (
    <div
      className={`${style.label_default} ${style[color]} ${style[size]} ${
        style[both_gap + "_" + size]
      } }  `}
    >
      {(iconPosition === "left" || iconPosition === "both") && children}
      <span>{text}</span>
      {(iconPosition === "right" || iconPosition === "both") && children}
    </div>
  );
};

export default Label;
