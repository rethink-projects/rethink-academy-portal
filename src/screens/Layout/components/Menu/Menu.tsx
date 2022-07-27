import { useState } from "react";
import Images from "../../../../assets";
import styles from "./Menu.module.css";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const currentClass = isOpen
    ? styles.menu_container
    : styles.menu_container_closed;
  return (
    <div className={currentClass}>
      <div className={styles.menu_header}>
        <img
          onClick={handleClick}
          className={
            isOpen
              ? styles.menu_header_img_toggle
              : styles.menu_header_img_toggle_closed
          }
          src={Images.icons.IconToggle}
          alt='Icon Toggle Menu'
        />
        <img
          className={styles.menu_header_img}
          src={Images.logoRaSecondary}
          alt='RatRa'
        />
      </div>
    </div>
  );
}

export default Menu;
