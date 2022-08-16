import { Link } from "react-router-dom";
import styles from "./MenuItem.module.css";

type MenuItemProps = {
  isOpen: boolean;
  text: string;
  customCss?: React.CSSProperties;
  icon: string;
<<<<<<< HEAD
  link?: string;
};

function MenuItem({ link = "#", isOpen, text, icon }: MenuItemProps) {
  return (
    <Link to={link}>
      <div
        className={
          !isOpen ? styles.menu_body_item : styles.menu_body_item_closed
        }
      >
        <img className={styles.menu_body_item_img} src={icon} alt="Icon Home" />
        {isOpen ? (
          <span className={styles.menu_body_item_text}>{text}</span>
        ) : (
          <div />
        )}
      </div>
    </Link>
=======
  onClick?: () => void;
};

function MenuItem({ isOpen, text, icon, customCss, onClick }: MenuItemProps) {
  return (
    <div
      className={isOpen ? styles.menu_body_item : styles.menu_body_item_closed}
      style={customCss}
      onClick={onClick}
    >
      <img src={icon} alt="Icon Home" />
      {isOpen ? (
        <span className={styles.menu_body_item_text}>{text}</span>
      ) : (
        <div />
      )}
    </div>
>>>>>>> main
  );
}

export default MenuItem;
