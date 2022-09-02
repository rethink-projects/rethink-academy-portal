import EmptyModal from "../../../../components/EmptyModal/EmptyModal";
import styles from "./CardProgress.module.css";
import IndividualCard from "./components/IndividualCard";

type TypeCardProgress = {
  onClose: VoidFunction;
};

const CardProgress = ({ onClose }: TypeCardProgress) => {
  return (
    <EmptyModal onClose={onClose} id={""}>
      <div className={styles.progress_container}>
        <IndividualCard />
      </div>
    </EmptyModal>
  );
};

export default CardProgress;
