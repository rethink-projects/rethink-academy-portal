import styles from "./EmptyModal.module.css";

type modalProps = {
  children?: React.ReactNode;
};

const EmptyModal = ({ children }: modalProps) => {
  return (
    <div className={styles.modal_outside}>
      <div className={styles.modal_container}>{children}</div>
    </div>
  );
};

export default EmptyModal;
