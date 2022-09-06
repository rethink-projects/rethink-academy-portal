import React, { useState } from "react";
import ModalTrilhas from "../../components/TrailModal/TrailModal";
import styles from "./Playground.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import TableActivityPlan from "../CoursesScreen/Components/TableActivityPlan/TableActivityPlan";

function PlaygroundScreen() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className={styles.playground_container}>
      <div className={styles.playground_container_inner}>
        <TableActivityPlan />
        {/* <button onClick={() => setModalIsOpen(true)}>Modal</button>
        {modalIsOpen && (
          <ModalTrilhas
            onClose={() => setModalIsOpen(false)}
            title="Tem certeza que deseja excluir?"
          />
        )} */}
        {/* <DatePicker size={"large"} calendarPosition={"left"} placeholder={""} /> */}
      </div>
    </div>
  );
}

export default PlaygroundScreen;
