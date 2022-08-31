
import styles from "./EmptyModal.module.css";
import SimpleButton from "../SimpleButton/SimpleButton";
import CloseIcon from "@mui/icons-material/Close";

type modalProps = {
  children?: React.ReactNode;
  onClose: VoidFunction;
  id: string;
};

const EmptyModal = ({ children, onClose, id }: modalProps) => {
  const handleOutsideClick = (e: any) => {
    if (e.target.id === id) {
      onClose();
    }
  };
  return (
    <div id={id} className={styles.modal_outside} onClick={handleOutsideClick}>
      <div className={styles.modal_container}>{children}</div>
    </div>
  );
};

export default EmptyModal;