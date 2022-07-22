import React from "react";
import styles from "./CardTrilhasHome.module.css";
import IconPadlock from "@mui/icons-material/LockOutlined";
import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";

type CardTrilhasHome = {
  name: string;
  dataInput: Object;
};
const CardTrilhasHome = () => {
  return (
    <div className={styles.container}>
      <span>Academy</span>
      <div className={styles.divisoria}></div>
      <div className={styles.state}>
        <ProgressBar />

        {/* <div className={styles.blocked}>
                    <div className={styles.padlock_border}>
                        <IconPadlock />
                    </div>
                    <span>Bloqueada!</span>
                </div> */}
      </div>
    </div>
  );
};

export default CardTrilhasHome;
