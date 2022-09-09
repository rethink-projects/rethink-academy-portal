import React from "react";

// Assets
import Images from "../../../assets";
import styles from "./Gamification.module.css";
import CloseIcon from "@mui/icons-material/Close";

type modalProps = {
  onClose: VoidFunction;
  id?: string;
};

const Modal = ({ onClose = () => {}, id = "outside" }: modalProps) => {
  const handleOutsideClick = (e: any) => {
    if (e.target.id === id) {
      onClose();
    }
  };

  return (
    <div id={id} className={styles.modal_outside} onClick={handleOutsideClick}>
      <div className={styles.modal_container}>
        <div className={styles.modal_content}>
          <img
            src={Images.hatDelivery}
            alt="A GIF of a mage delivering a hat"
          />
          <CloseIcon onClick={onClose} className={styles.modal_content_icon} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
