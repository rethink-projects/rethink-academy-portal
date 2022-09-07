import styles from "./EmptyModal.module.css";

type modalProps = {
  children?: React.ReactNode;
  onClose: VoidFunction;
};

const EmptyModal = ({ children, onClose }: modalProps) => {
  return (
    <div className={styles.modal_outside}>
      <div className={styles.modal_container}>{children}</div>
    </div>
  );
};

export default EmptyModal;
