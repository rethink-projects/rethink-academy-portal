import { Link } from "react-router-dom";
import styles from "./MenuItem.module.css";

type MenuItemProps = {
  isOpen: boolean;
  text: string;
  customCss?: React.CSSProperties;
  icon: string;
  onClick?: () => void;
  link?: string;
};

function MenuItem({
  link = "#",
  isOpen,
  text,
  icon,
  onClick,
  customCss,
}: MenuItemProps) {
  return (
    <Link to={link} className={styles.menu_item}>
      <div
        className={
          isOpen ? styles.menu_body_item : styles.menu_body_item_closed
        }
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
    </Link>
  );
}

export default MenuItem;
