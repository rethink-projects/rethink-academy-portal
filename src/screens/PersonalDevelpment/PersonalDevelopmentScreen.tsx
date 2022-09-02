import React, { useEffect, useState } from "react";
import CustomBarChart, { data } from "./components/chart/BarChart";
import Switch from "./components/switch/Switch";
import Tag from "./components/tags/Tag";
import styles from "./PersonalDevelopmentScreen.module.css";

const PersonalDevelopmentScreen = () => {
  const [graphData, setGraphData] = useState<
    {
      name: string;
      skill: number;
      pv: number;
    }[]
  >([]);
  const [skillType, setSkillType] = useState(true);
  const [tagType, setTagType] = useState<
    "ENGINEERING" | "DESIGN" | "PRODUCT" | "SOFT"
  >("ENGINEERING");

  useEffect(() => {
    setGraphData(data);
  }, []);

  useEffect(() => {
    console.log(skillType);
    if (skillType === false) {
      setTagType("SOFT");
      console.log(tagType);
    } else {
      setTagType("ENGINEERING");
    }
  }, [skillType]);

  return (
    <div className={styles.container}>
      <div className={styles.graph_header}>
        <h1>Evolução de Habilidades</h1>
        <Switch skillType={skillType} setSkillType={setSkillType} />
      </div>
      <div className={styles.graph_container}>
        <div className={styles.graph_inner_container}>
          <p>Escolha uma habilidade para visualizar a evolução</p>
          <Tag tagType={tagType} setTagType={setTagType} setGraphData={setGraphData} />
          <div className={styles.card_content_line} />
        </div>
        <CustomBarChart
          graphData={graphData}
        />
      </div>
    </div>
  );
};

export default PersonalDevelopmentScreen;
