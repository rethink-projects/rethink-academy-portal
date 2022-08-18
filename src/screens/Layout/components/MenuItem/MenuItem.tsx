import styles from "./MenuItem.module.css";

type MenuItemProps = {
  isOpen: boolean;
  text: string;
  customCss?: React.CSSProperties;
  icon: string;
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
  );
}

export default MenuItem;
