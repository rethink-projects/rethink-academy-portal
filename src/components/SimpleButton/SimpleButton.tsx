import styles from "./SimpleButton.module.css";

type SimpleButtonProps = {
  type?: "primary" | "secondary" | "outline";
  text: string;
  onClick: () => void;
  size?: "big" | "small" | "medium";
};

const SimpleButton = ({
  type = "primary",
  text,
  onClick,
  size = "big",
}: SimpleButtonProps) => {
  return (
    <button
      className={`${styles[type]} ${styles[size]} ${styles.btn_default}`}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
};

export default SimpleButton;
