import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomBarChart, { data } from "./components/chart/BarChart";
import Switch from "./components/switch/Switch";
import Tag, { headers } from "./components/tags/Tag";
import styles from "./PersonalDevelopmentChart.module.css";
import { useAuth } from "../../context/AuthContext";

type internEmailProps = {
  email?: string;
};

type getUserType = {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  main: "ENGINEERING" | "DESIGN" | "PRODUCT";
  profile: null;
  note: any;
  level: number;
  exp: number;
};

const PersonalDevelopmentChart = (email: internEmailProps) => {
  const { user } = useAuth();
  const [graphData, setGraphData] = useState<
    {
      name: string;
      skill: number;
      pv: number;
    }[]
  >([]);
  const [skillType, setSkillType] = useState(false);
  const [userByEmail, setUserByEmail] = useState<getUserType>();

  const getUser = async () => {
    if (email) {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/user/${email.email}`
        );
        setUserByEmail(data);
        console.log({ data });
        return;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [tagType, setTagType] = useState<
    "ENGINEERING" | "DESIGN" | "PRODUCT" | "SOFT"
  >("SOFT");

  const [skill, setSkill] = useState("Empatia");

  if (user && user.role === "AMBASSADOR") {
  }
  const getData = async () => {
    try {
      if (user && email && user.role === "AMBASSADOR") {
        const { data } = await axios.get(
          `http://localhost:4000/api/evaluate/chartData/${email.email}`,
          { params: { skill, header: tagType } }
        );
        return await data.chartData;
      } else {
        const { data } = await axios.get(
          `http://localhost:4000/api/evaluate/chartData/${user.email}`,
          { params: { skill, header: tagType } }
        );
        return await data.chartData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setGraphData(await getData());
      };
      fetchData();
    }
    getUser();
    console.log({ userByEmail });
  }, []);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setGraphData(await getData());
      };
      fetchData();
    }
  }, [skill, user, email]);

  useEffect(() => {
    console.log(skillType);
    if (skillType === false) {
      setTagType("SOFT");
      console.log(tagType);
      setSkill("Empatia");
    } else {
      user.role === "AMBASSADOR"
        ? setTagType(userByEmail!.main)
        : user.main != undefined && setTagType(user.main!);

      user.role === "AMBASSADOR"
        ? setSkill(headers[userByEmail!.main][0])
        : user.main != undefined && setSkill(headers[user.main!][0]);
    }
  }, [skillType, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
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

export default PersonalDevelopmentChart;
