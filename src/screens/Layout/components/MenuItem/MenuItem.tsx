import styles from "./MenuItem.module.css";

type MenuItemProps = {
  isOpen: boolean;
  text: string;
  icon: string;
};

function MenuItem({ isOpen, text, icon }: MenuItemProps) {
  return (
    <div
      className={!isOpen ? styles.menu_body_item : styles.menu_body_item_closed}
    >
      <img className={styles.menu_body_item_img} src={icon} alt='Icon Home' />
      {isOpen ? (
        <span className={styles.menu_body_item_text}>{text}</span>
      ) : (
        <div />
      )}
    </div>
  );
}

export default MenuItem;
