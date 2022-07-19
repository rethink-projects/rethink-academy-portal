import styles from "./IconButton.module.css";

type IconButtonType = {
  type?: "primary" | "secundary" | "ghost";
  children: JSX.Element;
  size?: "small" | "big";
  onClick: () => void;
};

const IconButton = ({
  type = "secundary",
  children,
  size = "small",
  onClick,
}: IconButtonType) => {
  const classNameSizeButton =
    size === "small" ? `${styles.btn_icon_small} ` : `${styles.btn_icon_big} `;

  return (
    <div
      onClick={onClick}
      className={`${styles[`btn_icon_${type}`]} ${classNameSizeButton}`}
    >
      {children}
    </div>
  );
};

export default IconButton;
