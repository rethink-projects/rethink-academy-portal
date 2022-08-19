import styles from "./TrailModal.module.css";
import SimpleButton from "../SimpleButton/SimpleButton";
import CloseIcon from "@mui/icons-material/Close";

type modalProps = {
  title: string;
  children?: React.ReactNode;
  onClose: VoidFunction;
  onClickConfirm?: VoidFunction;
  onClickCancel?: VoidFunction;
  oneButton?: boolean;
  nameButtonRight?: string;
  nameButtonLeft?: string;
};

const TrailModal = ({
  oneButton = false,
  children,
  title,
  onClose = () => {},
  onClickConfirm,
  onClickCancel,
  nameButtonRight = "Confirmar",
  nameButtonLeft = "Cancelar",
}: modalProps) => {
  return (
    <div className={styles.modal_outside}>
      <div className={styles.modal_container}>
        <div className={styles.modal_header}>
          <h1 className={styles.modal_title}>{title}</h1>
          <div onClick={onClose} className={styles.modal_header_icon}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.modal_divider}></div>
        <div className={styles.modal_content}>{children}</div>

        <div className={styles.modal_actions}>
          {!oneButton && (
            <SimpleButton
              type="secondary"
              size="block"
              text={nameButtonLeft}
              onClick={onClickCancel!}
            />
          )}
          <SimpleButton
            size="block"
            text={nameButtonRight}
            onClick={onClickConfirm!}
          />
        </div>
      </div>
    </div>
  );
};

export default TrailModal;
