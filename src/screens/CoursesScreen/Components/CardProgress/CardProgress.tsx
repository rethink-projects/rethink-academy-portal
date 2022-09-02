import EmptyModal from "../../../../components/EmptyModal/EmptyModal";
import styles from "./CardProgress.module.css"

type TypeCardProgress = {
  onClose: VoidFunction;
};

const CardProgress = ({ onClose }: TypeCardProgress) => {
  return (
    <EmptyModal onClose={onClose} id={""}>
      <div className={styles.progress_container}>SEU CONTEÚDO AQUI</div>
    </EmptyModal>
  );
};

export default CardProgress;
