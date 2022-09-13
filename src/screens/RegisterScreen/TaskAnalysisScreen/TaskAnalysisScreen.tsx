import React from "react";
import AmbassadorViewTasksMM from "../../../components/AmbassadorViewTasksMM/AmbassadorViewTasksMM";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Comment from "../../../components/Comment/Comment";
import Register from "../../../components/Register/Register";
import { useAuth } from "../../../context/AuthContext";

// css
import styles from "./TaskAnalysisScreen.module.css";

const TaskAnalysisScreen = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.rightScreen}>
        <div className={styles.breadcrumb}>
          <Breadcrumb
            breadcrumbItems={[
              { title: "Home", link: "/" },
              { title: "Registro de Horas", link: "/register" },
              { title: "Análise de Tarefas", link: "/analysis" },
            ]}
          />
        </div>
        <div className={styles.graphic}></div>
        <div className={styles.bottom_container}>
          <div className={styles.task_history}>
            <AmbassadorViewTasksMM email={user.email} />
          </div>
          <div className={styles.quick_view}>
            <Register email={user.email} />
          </div>
        </div>
      </div>
      <div className={styles.leftScreen}>
        <Comment />
      </div>
    </div>
  );
};

export default TaskAnalysisScreen;
