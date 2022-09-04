import EmptyModal from "../../../../components/EmptyModal/EmptyModal";
import TableActivityPlan from "../TableActivityPlan/TableActivityPlan";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./CardSyllabus.module.css";

type TypeCardSyllabus = {
  onClose: VoidFunction;
  user?: string;
};

const CardSyllabus = ({ onClose, user = "student" }: TypeCardSyllabus) => {
  return (
    <EmptyModal onClose={onClose}>
      <div className={styles.content}>
        <TableActivityPlan onClose={onClose} />
        {user !== "student" && <div className={styles.modal_overlap_add}></div>}
        <div onClick={onClose} className={styles.modal_close}>
          <CloseIcon />
        </div>
      </div>
    </EmptyModal>
  );
};

export default CardSyllabus;
