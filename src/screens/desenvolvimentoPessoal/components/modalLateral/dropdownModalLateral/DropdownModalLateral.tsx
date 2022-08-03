import React, { useState } from "react";
import styles from "./DropdownModalLateral.module.css";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const DropdownModalLateral = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  const currentClass = isOpen
    ? styles.dropdown_container_open
    : styles.dropdown_container_closed;

  return (
    <div className={currentClass}>
      <div className={styles.dropdown_header}>
        <h1 className={styles.dropdown_header_title}> Avaliação de março </h1>
        <ExpandMoreRoundedIcon
          onClick={handleClick}
          className={
            isOpen
              ? styles.dropdown_header_img_toggle
              : styles.dropdown_header_img_toggle_closed
          }
        />
      </div>
    </div>
  );
};

export default DropdownModalLateral;
