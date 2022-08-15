import React, { useState } from 'react'
import IconButton from '../IconButton/IconButton';
import styles from "./ModalTrilhas.module.css"
import Checkbox from '../Checkbox/Checkbox';
import { style } from '@mui/system';

type modalProps = {
    title: string;
    iconClose?: JSX.Element;
    children?: React.ReactNode;
    onClose: VoidFunction;
    id?: string;
    onClickConfirm?: VoidFunction;
}

const Modal = ({ children, iconClose, title, onClose = () => { }, id = "outside", onClickConfirm }: modalProps) => {

    const [disabledConfirm, setDisabledConfirm] = useState(false);
    const disabledConfirmClass = disabledConfirm ? styles.modal_actions_confirm_disabled : "";

    const handleOutsideClick = (e: any) => {
        if (e.target.id === id) {
            onClose();
        }
    }

    // parte para mostrar o onClick do confirm.
    const handleClickConfirm = () => {
        console.log(true);
    }

    if (!onClickConfirm) {
        onClickConfirm = handleClickConfirm;
    }

    return (
        <div id={id} className={styles.modal_outside} onClick={handleOutsideClick}>
            <div className={styles.modal_container}>
                <div className={styles.modal_header} >
                    <h1 className={styles.modal_title} >{title}</h1>
                    <div onClick={onClose} className={styles.modal_header_icon}>
                        {iconClose}
                    </div>
                </div>


                <div className={styles.modal_divider}></div>


                <div className={styles.modal_content}>
                    {children}
                </div>

                <div className={styles.modal_actions}>
                    Colocar os botões aqui
                </div>
            </div>
        </div>
    )
}

export default Modal