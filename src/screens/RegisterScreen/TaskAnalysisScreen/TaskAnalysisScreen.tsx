import { link } from "fs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AmbassadorViewTasksMM from "../../../components/AmbassadorViewTasksMM/AmbassadorViewTasksMM";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Comment from "../../../components/Comment/Comment";
import Register from "../../../components/Register/Register";
import TagChart from "../../../components/TagChart/TagChart";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../services/api";

// css
import styles from "./TaskAnalysisScreen.module.css";

const TaskAnalysisScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userFromPathname, setUserFromPathname] = useState<false | string>(
    false
  );
  const [graphData, setGraphData] = useState<
    {
      name: string;
      skill: number;
      pv: number;
    }[]
  >([]);

  const getData = async () => {
    try {
      if (user) {
        const { data } = await api.get("/chart/" + user.email, {
          params: tags !== "Gerais" ? { tags } : null,
        });
        setGraphData(data);
      }
    } catch (error: any) {
      console.log({ error: error.message });
    }
  };

  const [tags, setTags] = useState("Gerais");
  const [breadcrumbData, setBreadcrumbData] = useState([
    { title: "Home", link: "/" },
    { title: "Registro de Horas", link: "/dashboard/register" },
    { title: "Análise de Tarefas", link: "#" },
  ]);

  useEffect(() => {
    // const user = user.email;
    if (user) {
      getData();
      setUserFromPathname(user.email);
      setBreadcrumbData((prevState) => [
        ...prevState,
        { title: user.name, link: "#" },
      ]);
    }
  }, [user]);

  if (userFromPathname && user.role !== "AMBASSADOR") {
    // navigate("dashboard/register/analysis");
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftScreen}>
        <div className={styles.breadcrumb}>
          <Breadcrumb breadcrumbItems={breadcrumbData} />
        </div>
        <div className={styles.graphic}>
          <TagChart tags={tags} setTags={setTags} graphData={graphData} />
        </div>
        <div className={styles.bottom_container}>
          <div className={styles.task_history}>
            <AmbassadorViewTasksMM email={user.email} />
          </div>
          <div className={styles.quick_view}>
            <Register email={user.email} />
          </div>
        </div>
      </div>
      <div className={styles.rightScreen}>
        <Comment student={userFromPathname && userFromPathname} />
      </div>
    </div>
  );
};

export default TaskAnalysisScreen;
