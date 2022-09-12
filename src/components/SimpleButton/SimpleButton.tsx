import styles from "./SimpleButton.module.css";

type SimpleButtonProps = {
  type?: "primary" | "secondary" | "outline";
  text: string;
  onClick: () => void;
  size?: "big" | "small" | "medium" | "block";
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
      {text}
    </button>
  );
};

export default SimpleButton;
