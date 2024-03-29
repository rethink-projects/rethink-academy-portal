import React, { useEffect, useState } from "react";

// Assets
import Images from "../../../assets";
import styles from "./Gamification.module.css";
import CloseIcon from "@mui/icons-material/Close";

type modalProps = {
  setActive: VoidFunction;
  id?: string;
  type: "Win" | "Degrading" | "Losing";
};

const Modal = ({
  setActive: onClose = () => {},
  id = "outside",
  type = "Win",
}: modalProps) => {
  const [loadingGif, setLoadingGif] = useState(true);

  useEffect(() => {
    setLoadingGif(true);
    setTimeout(() => {
      setLoadingGif(false);
    }, 3400);
  }, []);

  const handleOutsideClick = (e: any) => {
    if (e.target.id === id && loadingGif === false) {
      onClose();
    }
    if (e.target.id === id) {
      onClose();
    }
  };

  return (
    <div id={id} className={styles.modal_outside} onClick={handleOutsideClick}>
      <div className={styles.modal_container} onClick={onClose}>
        <div className={styles.modal_content} onClick={onClose}>
          {loadingGif && type === "Win" ? (
            <img
              src={Images.hatDelivery}
              alt="A GIF of a mage delivering a hat"
            />
          ) : (
            type === "Win" && (
              <img src={Images.hatWin} alt="A hat with a text message" />
            )
          )}

          {type === "Degrading" && (
            <img
              src={Images.hatDegrading}
              alt="A GIF of a mage delivering a hat"
            />
          )}
          {type === "Losing" && (
            <img
              src={Images.hatStolen}
              alt="A GIF of a mage delivering a hat"
            />
          )}
          <CloseIcon onClick={onClose} className={styles.modal_content_icon} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
