import axios from "axios";
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
  const [skill, setSkill] = useState("BackEnd");

  const getData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/evaluate/chartData",
        { params: { skill, header: tagType } }
      );
      console.log(data);

      return await data.chartData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setGraphData(await getData());
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setGraphData(await getData());
    };
    fetchData();
  }, [skill]);

  useEffect(() => {
    console.log(skillType);
    if (skillType === false) {
      setTagType("SOFT");
      console.log(tagType);
      setSkill("Empatia");
    } else {
      setTagType("ENGINEERING");
      setSkill("BackEnd");
    }
  }, [skillType]);

  return (
    <div className={styles.container}>
      <div className={styles.graph_header}>
        <h1>Evolução de Habilidades</h1>
      </div>
      <div className={styles.graph_container}>
        <div className={styles.graph_inner_container}>
          <div className={styles.switch_skill}>
            <p>Escolha uma habilidade para visualizar a evolução</p>
            <Switch skillType={skillType} setSkillType={setSkillType} />
          </div>
          <Tag tagType={tagType} skill={skill} setSkill={setSkill} />
          <div className={styles.card_content_line} />
        </div>
        <CustomBarChart graphData={graphData} />
      </div>
    </div>
  );
};

export default PersonalDevelopmentScreen;
