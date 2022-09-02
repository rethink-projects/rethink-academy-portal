import React, { useEffect, useRef, RefObject, useState } from "react";
import style from "./DeleteModal.module.css";
import SimpleButton from "../../../../components/SimpleButton/SimpleButton";

type modalProps = {
  title: string;
  description: string;
  onClose: VoidFunction;
  id?: "outside";
  onClickConfirm?: VoidFunction;
};
const DeleteModal = ({
  title,
  description,
  onClose = () => {},
  id = "outside",
  onClickConfirm,
}: modalProps) => {
  const [disabledConfirm, setDisabledConfirm] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const disabledConfirmClass = disabledConfirm
    ? style.modal_actions_confirm_disabled
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
    <div id={id} className={style.modal_outside} onClick={handleOutsideClick}>
      <div className={style.modal_container}>
        <div className={style.modal_content}>
          <div className={style.modal_text}>
            <div className={style.modal_title}>
              <h1>{title}</h1>
            </div>

            <p className={style.modal_description}>{description}</p>
          </div>
          <div className={style.modal_actions}>
            <div className={style.modal_actions_buttons}>
              <SimpleButton
                type="secondary"
                text="Sim"
                size="small"
                onClick={onClickConfirm}
              />
              <SimpleButton
                type="primary"
                text="Não"
                size="small"
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
