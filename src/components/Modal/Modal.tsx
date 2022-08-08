import React, { useEffect, useRef, RefObject, useState } from "react";
import IconButton from "../IconButton/IconButton";
import styles from "./Modal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "../Checkbox/Checkbox";
import { style } from "@mui/system";

type modalProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  onClose: VoidFunction;
  nameCheckbox?: string;
  id?: string;
  onClickConfirm?: VoidFunction;
};

const Modal = ({
  children,
  title,
  description,
  onClose = () => {},
  nameCheckbox,
  id = "outside",
  onClickConfirm,
}: modalProps) => {
  const [disabledConfirm, setDisabledConfirm] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const disabledConfirmClass = disabledConfirm
    ? styles.modal_actions_confirm_disabled
    : "";

  const handleOutsideClick = (e: any) => {
    if (e.target.id === id) {
      onClose();
    }
  };

  // parte para mostrar o onClick do confirm.
  const handleClickConfirm = () => {
    console.log(true);
  };

  if (!onClickConfirm) {
    onClickConfirm = handleClickConfirm;
  }

  return (
    <div id={id} className={styles.modal_outside} onClick={handleOutsideClick}>
      <div className={styles.modal_container}>
        <div className={styles.modal_content}>
          <CloseIcon onClick={onClose} className={styles.modal_content_icon} />
          <div className={styles.modal_text}>
            <h1 className={styles.modal_title}>{title}</h1>
            <p className={styles.modal_description}>{description}</p>
          </div>
          <div className={styles.modal_children}>{children}</div>
          <div className={styles.modal_actions}>
            <div>
              {nameCheckbox ? (
                <Checkbox
                  name={nameCheckbox}
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                />
              ) : (
                ""
              )}
            </div>
            <div className={styles.modal_actions_buttons}>
              <button className={styles.modal_actions_cancel} onClick={onClose}>
                Cancel
              </button>
              <button
                className={[
                  styles.modal_actions_confirm,
                  disabledConfirmClass,
                ].join(" ")}
                onClick={onClickConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
