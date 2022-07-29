import { Link } from "react-router-dom";
import styles from "./MenuItem.module.css";

type MenuItemProps = {
  isOpen: boolean;
  text: string;
  icon: string;
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
  );
}

export default MenuItem;
