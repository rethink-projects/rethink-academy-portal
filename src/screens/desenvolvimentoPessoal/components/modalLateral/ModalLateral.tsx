import React, { useEffect, useRef, RefObject, useState  } from 'react'
import styles from "./ModalLateral.module.css"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { style } from '@mui/system';
import DropdownModalLateral from './dropdownModalLateral/DropdownModalLateral';

type modalProps = {
    onClose: VoidFunction;
}

const ModalLateral = ({onClose = () => {}} : modalProps) => {

    const [disabledConfirm, setDisabledConfirm] = useState(false);
    const disabledConfirmClass = disabledConfirm ? styles.modal_actions_confirm_disabled : "";

    const handleOutsideClick = (e:any) => {
        if(e.target.id === "outside"){
            onClose();
        }
    }

    // parte para mostrar o onClick do confirm.
    const handleClickConfirm = () => {
        console.log(true);
    }
    
    return (
        <div id={"outside"} className={styles.modal_outside} onClick={handleOutsideClick}>
        <div  className={styles.modal_container}>
            <div className={styles.modal_header} >
                <div className={styles.modal_header_text}>
                    <h1 className={styles.modal_header_title} >Suas metas</h1>
                    <p className={styles.modal_header_description} >Acompanhe suas metas </p>
                </div>
                <CloseRoundedIcon onClick={onClose} className={styles.modal_header_escape} />
            </div>
            <div className={styles.modal_down}><DropdownModalLateral /></div>
        </div>
    </div>
  )
}

export default ModalLateral