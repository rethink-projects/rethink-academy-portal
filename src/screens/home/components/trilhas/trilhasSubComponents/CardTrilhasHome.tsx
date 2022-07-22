import React, { useState } from "react";
import styles from "./CardTrilhasHome.module.css";
import IconPadlock from "@mui/icons-material/LockOutlined";
import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";

type CardTrilhasHome = {
  name?: string;
  dataInput?: Object;
};

//Componente do componente trilhas da HOME
const CardTrilhasHome = ({ name }: CardTrilhasHome) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const videoAmount = 100;
  const totalWatched = 66;

  return (
    <div className={styles.container}>
      <span>{name}Academy</span>
      <div className={styles.divisoria}></div>
      <div className={styles.state}>
        {isBlocked ? (
          <div className={styles.blocked}>
            <div className={styles.padlock_border}>
              <IconPadlock />
            </div>
            <span>Bloqueada!</span>
          </div>
        ) : (
          <div className={styles.free}>
            <span>{(totalWatched * 100) / videoAmount}%</span>
            <ProgressBar
              totalValue={videoAmount}
              relativeValue={totalWatched}
              size="small"
              width={110}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardTrilhasHome;
