import React from "react";
import AcademyProgress from "../../components/AcademyProgress/AcademyProgress";
import IconAcademyProgress from "../../components/IconAcademyProgress/IconAcademyProgress";
import StageIcon from "../../components/StageIcon/StageIcon";
import styles from "./Playground.module.css";
import { useNotification } from "../../context/NotificationContext";
import SimpleButton from "../../components/SimpleButton/SimpleButton";

function PlaygroundScreen() {
  const { notify } = useNotification();

  return (
    <div className={styles.playground_container}>
      <div className={styles.playground_container_inner}>
        {/* <AcademyProgress /> */}
        <SimpleButton
          text=" Emblema"
          onClick={() =>
            notify({
              simple: true,
              title: "Você recebeu o emblema de Design UX",
              type: "success",
            })
          }
        />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
