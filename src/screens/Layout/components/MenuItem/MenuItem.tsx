import { Link, useNavigate } from "react-router-dom";
import styles from "./MenuItem.module.css";

type MenuItemProps = {
  isOpen: boolean;
  text: string;
  customCss?: React.CSSProperties;
  icon: string;
  link?: string;
};

function MenuItem({ link = "#", isOpen, text, icon }: MenuItemProps) {
  const navigate = useNavigate();
  return (
    <div
      className={isOpen ? styles.menu_body_item : styles.menu_body_item_closed}
      // style={customCss}
      onClick={() => navigate(link)}
    >
      <img src={icon} alt="Icon Home" />
      {isOpen ? (
        <span className={styles.menu_body_item_text}>{text}</span>
      ) : (
        <div />
      )}
    </div>
  );
}

export default MenuItem;
