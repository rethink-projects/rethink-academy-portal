import { link } from "fs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AmbassadorViewTasksMM from "../../../components/AmbassadorViewTasksMM/AmbassadorViewTasksMM";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Comment from "../../../components/Comment/Comment";
import Register from "../../../components/Register/Register";
import { useAuth } from "../../../context/AuthContext";

// css
import styles from "./TaskAnalysisScreen.module.css";

const TaskAnalysisScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userFromPathname, setUserFromPathname] = useState<false | string>(
    false
  );
  const [breadcrumbData, setBreadcrumbData] = useState([
    { title: "Home", link: "/" },
    { title: "Registro de Horas", link: "/dashboard/register" },
    { title: "Análise de Tarefas", link: "#" },
  ]);

  useEffect(() => {
    const student = window.location.pathname.split("/")[4];
    if (student) {
      setUserFromPathname(student);
      setBreadcrumbData((prevState) => [
        ...prevState,
        { title: student.split(".")[0], link: "#" },
      ]);
    }
  }, []);

  if (userFromPathname && user.role !== "AMBASSADOR") {
    navigate("dashboard/register/analysis");
  }

  return (
    <div className={styles.container}>
      <div className={styles.rightScreen}>
        <div className={styles.breadcrumb}>
          <Breadcrumb breadcrumbItems={breadcrumbData} />
        </div>
        <div className={styles.graphic}></div>
        <div className={styles.bottom_container}>
          <div className={styles.task_history}>
            <AmbassadorViewTasksMM />
          </div>
          <div className={styles.quick_view}>
            <Register type="intern" />
          </div>
        </div>
      </div>
      <div className={styles.leftScreen}>
        <Comment student={userFromPathname && userFromPathname} />
      </div>
    </div>
  );
};

export default TaskAnalysisScreen;
