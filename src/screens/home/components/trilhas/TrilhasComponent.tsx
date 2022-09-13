import styles from "./TrilhasComponent.module.css";
import IconMap from "@mui/icons-material/MapOutlined";
import CardTrilhasHome from "./trilhasSubComponents/CardTrilhasHome";
import { useEffect, useState } from "react";
import { api } from "../../../../services/api";

type TrailType = {
  trail: { name: string; id: string; description: string };
};

//Componente a ser usado na HOME
const TrilhasComponent = () => {
  const [trails, setTrails] = useState<TrailType[]>();

  useEffect(() => {
    api.get("/trail").then((response) => {
      if (response.data.trail) {
        setTrails(response.data.trail);
      }
    });
  }, []);

  return (
    <div className={styles.trilhas_container}>
      <div className={styles.trilhas_title_container}>
        <div className={styles.icon_container}>
          <IconMap />
        </div>
        <span>Trilhas</span>
      </div>
      <div className={styles.cards_container}>
        {trails?.map((trail: any) => (
          <CardTrilhasHome key={trail.id} trail={trail} />
        ))}
      </div>
    </div>
  );
};

export default TrilhasComponent;
