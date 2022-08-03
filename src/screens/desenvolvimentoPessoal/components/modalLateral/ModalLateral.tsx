import React, { useEffect, useRef, RefObject, useState  } from 'react'
import styles from "./ModalLateral.module.css"
import CloseIcon from '@mui/icons-material/Close';
import { style } from '@mui/system';

type modalProps = {
    onClose: VoidFunction;
    id?: string;
}

const ModalLateral = ({onClose = () => {}, id="outside"} : modalProps) => {

    const [disabledConfirm, setDisabledConfirm] = useState(false);
    const disabledConfirmClass = disabledConfirm ? styles.modal_actions_confirm_disabled : "";

    const handleOutsideClick = (e:any) => {
        if(e.target.id === id){
            onClose();
        }
    }

    // parte para mostrar o onClick do confirm.
    const handleClickConfirm = () => {
        console.log(true);
    }
    
    return (
        <div id={id} className={styles.modal_outside} onClick={handleOutsideClick}>
        <div  className={styles.modal_container}>
            <div className={styles.modal_content} >
                    <CloseIcon onClick={onClose} className={styles.modal_content_icon} />
                <div className={styles.modal_text}>
                    <h1 className={styles.modal_title} >titulo</h1>
                    <p className={styles.modal_description} >descrição</p>
                </div>
                <div className={styles.modal_children }>
                    children
                </div>
            </div>
        </div>
    </div>
  )
}

export default ModalLateral