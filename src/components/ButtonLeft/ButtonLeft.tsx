// CSS
import styles from "./ButtonLeft.module.css";

// Assets
import Images from "../../../src/assets/index";

type ButtonLeftProps = {
  type: "primary" | "secondary" | "outline";
  size?: "large" | "medium" | "small";
  iconPosition?: "left" | "right";
  text: string;
  icon: "LightBulb";
  onClick: () => void;
};

const ButtonLeft = ({
  type = "primary",
  size = "large",
  iconPosition = "left",
  text,
  onClick,
  icon,
}: ButtonLeftProps) => {
  let iconImg = Images.icons[iconPosition];

  return (
    <button
      className={`${styles[type]} ${styles[size]} ${styles.btn_default}`}
      onClick={onClick}
    >
      <img src={iconImg} alt="A light bulb Icon on the Left" />
      <span>{text}</span>
    </button>
  );
};

export default ButtonLeft;
