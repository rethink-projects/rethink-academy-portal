import React, { useState } from "react";
import IconButton from "../IconButton/IconButton";
import styles from "./ModalTrilhas.module.css";
<<<<<<< HEAD
import CloseIcon from "@mui/icons-material/Close";
=======
>>>>>>> 320d541a699f48fce4f2a9c87af6a179e1b9404f
import Checkbox from "../Checkbox/Checkbox";
import { style } from "@mui/system";
import SimpleButton from "../SimpleButton/SimpleButton";

type modalProps = {
  title: string;
  iconClose?: JSX.Element;
  children?: React.ReactNode;
  onClose: VoidFunction;
  id?: string;
  onClickConfirm?: VoidFunction;
  onClickCancel?: VoidFunction;
  oneButton?: boolean;
<<<<<<< HEAD
};

const ModalTrails = ({
=======
  nameButtonGreen?: string;
  nameButtonBlack?: string;
};

const Modal = ({
>>>>>>> 320d541a699f48fce4f2a9c87af6a179e1b9404f
  oneButton = false,
  children,
  iconClose,
  title,
  onClose = () => {},
  id = "outside",
  onClickConfirm,
  onClickCancel,
<<<<<<< HEAD
=======
  nameButtonGreen = "Confirmar",
  nameButtonBlack = "Cancelar",
>>>>>>> 320d541a699f48fce4f2a9c87af6a179e1b9404f
}: modalProps) => {
  const handleOutsideClick = (e: any) => {
    if (e.target.id === id) {
      onClose();
    }
  };

  return (
    <div id={id} className={styles.modal_outside} onClick={handleOutsideClick}>
      <div className={styles.modal_container}>
        <div className={styles.modal_header}>
          <h1 className={styles.modal_title}>{title}</h1>
          <div onClick={onClose} className={styles.modal_header_icon}>
            {iconClose}
          </div>
        </div>

        <div className={styles.modal_divider}></div>

        <div className={styles.modal_content}>{children}</div>

        <div className={styles.modal_actions}>
          {!oneButton && (
            <SimpleButton
              type="outline"
<<<<<<< HEAD
              text="Cancelar"
              onClick={onClickCancel!}
            />
          )}
          <SimpleButton text="Confirmar" onClick={onClickConfirm!} />
=======
              text={nameButtonBlack}
              onClick={onClickCancel!}
            />
          )}
          <SimpleButton text={nameButtonGreen} onClick={onClickConfirm!} />
>>>>>>> 320d541a699f48fce4f2a9c87af6a179e1b9404f
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ModalTrails;
=======
export default Modal;
>>>>>>> 320d541a699f48fce4f2a9c87af6a179e1b9404f
