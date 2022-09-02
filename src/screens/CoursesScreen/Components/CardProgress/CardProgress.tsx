import { useState } from "react";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import EmptyModal from "../../../../components/EmptyModal/EmptyModal";
import styles from "./CardProgress.module.css";
import IndividualCard from "./components/IndividualCard";
import IconCourse from "@mui/icons-material/TopicOutlined";
import IconAvatar from "@mui/icons-material/SupervisorAccountOutlined";
import IconClose from "@mui/icons-material/Close";

type TypeCardProgress = {
  onClose: (value: boolean) => void;
};

const CardProgress = ({ onClose }: TypeCardProgress) => {
  const [course, setCourse] = useState("Nome do curso");
  const [intern, setIntern] = useState("");
  return (
    <EmptyModal onClose={() => ""} id={""}>
      <div className={styles.progress_container}>
        <div className={styles.title}>
          Progresso
          <div className={styles.fields}>
            <div className={styles.dropdown_container}>
              <Dropdown
                setValue={setCourse}
                options={["Curso 1", "curso 2"]}
                id={"1"}
                width={360}
                initialText={"Selecionar curso"}
                leftIcon={<IconCourse />}
              />
              <span>Selecione um curso</span>
            </div>
            <div className={styles.dropdown_container}>
              <Dropdown
                setValue={setIntern}
                options={["Estagiário 1", "Estagiário 1"]}
                id={"2"}
                width={243}
                initialText={"Selecionar estagiário"}
                leftIcon={<IconAvatar />}
              />
              <span>Selecione um estagiário</span>
            </div>
            <IconClose onClick={() => onClose(false)} />
          </div>
        </div>

        <span className={styles.course_name}>{course}</span>
        <div className={styles.cards_container}>
          <IndividualCard />
          <IndividualCard />
          <IndividualCard />
          <IndividualCard />
          <IndividualCard />
        </div>
      </div>
    </EmptyModal>
  );
};

export default CardProgress;
