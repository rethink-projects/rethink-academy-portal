import React, { useState } from "react";
import IconButton from "../IconButton/IconButton";
import styles from "./ModalTrilhas.module.css";
import CloseIcon from "@mui/icons-material/Close";
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
  nameButtonGreen?: string;
  nameButtonBlack?: string;
};

const ModalTrails = ({
  oneButton = false,
  children,
  iconClose,
  title,
  onClose = () => {},
  id = "outside",
  onClickConfirm,
  onClickCancel,
  nameButtonGreen = "Confirmar",
  nameButtonBlack = "Cancelar",
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
              size="block"
              type="secondary"
              text={nameButtonBlack}
              onClick={onClickCancel!}
            />
          )}
          <SimpleButton
            size="block"
            text={nameButtonGreen}
            onClick={onClickConfirm!}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalTrails;
