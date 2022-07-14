import styles from "./IconButton.module.css";

type IconButton = {
  type: "primary" | "secundary" | "ghost";
  children: JSX.Element;
  size: "small" | "big";
  onClick: () => void;
};

const IconButton = ({ type, children, size, onClick }: IconButton) => {
  const classNameStyleButton =
    type === "primary"
      ? `${styles.btn_icon_primary}`
      : type === "secundary"
      ? `${styles.btn_icon_secundary} `
      : `${styles.btn_icon_ghost} `;

  const classNameSizeButton =
    size === "small" ? `${styles.btn_icon_small} ` : `${styles.btn_icon_big} `;

  return (
    <div>
      <button className={`${classNameStyleButton} ${classNameSizeButton}`}>
        {children}
      </button>
    </div>
  );
};

export default IconButton;
