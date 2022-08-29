import React, { useEffect, useState } from "react";
import AccordionMM from "../../components/AccordionMM/AccordionMM";
import AddTask from "../../components/AddTask/AddTask";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import InputSearch from "../../components/InputSearch/InputSearch";
import Note from "../../components/Note/Note";
import { getTaskByUserEmail } from "../../services/backend/Tasks";

//Components
import CalendarComponent from "../../components/DatePicker/Components/Calendar";
//CSS
import styles from "./RegisterScreen.module.css";

// Route
{
  /* <Route path="/register" element={<Layout />}>
<Route index element={<RegisterScreen />} />
</Route> */
}

const RegisterScreen = () => {
  type task = {
    id: string;
    name: string;
    data: string;
    startTime: string;
    endTime: string;
    tags: string;
    status: string;
    description: string;
    userId: string;
  };

  const [tasks, setTasks] = useState<task[]>([]);

  const changeTasks = async () => {
    await getTaskByUserEmail("sthephany.tezza@rethink.dev")
      .then((response) => {
        setTasks(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    changeTasks();
    console.log(tasks);
  }, []);

  return (
    <div className={styles.register_container}>
      <div className={styles.register_content}>
        <div className={styles.register_header}>
          <div className={styles.register_breadcrumb}>
            <Breadcrumb
              breadcrumbItems={[
                { title: "Home", link: "/" },
                { title: "Registro de Horas", link: "/register" },
              ]}
            />
          </div>
          <div style={{ width: "450px", height: "20px" }}></div>
        </div>
        <div className={styles.register_body}>
          <div className={styles.register_registerTasks}>
            <div className={styles.container_title}>
              <p className={styles.title}>Registro de Tarefas</p>
            </div>
            {/* <AddTask /> */}
            {tasks != null ? <p>Componente</p> : <AddTask />}
          </div>
          <div className={styles.register_reminders}>
            <Note />
          </div>
        </div>
      </div>
      <div className={styles.register_searchTasks}>
        <div className={styles.searchTasks_container}>
          <div className={styles.searchTasks_inputSearch}>
            <InputSearch
              hasIcon
              placeholder="Procurar tarefas realizadas"
              type="default"
            />
          </div>
          <div className={styles.searchTasks_CalendarTitle}>
            <p>Calendário</p>
          </div>
          <div className={styles.searchTasks_Calendar}>
            <CalendarComponent />
          </div>
          <div className={styles.searchTasks_TasksTitle}>
            <p>Tasks e Reuniões</p>
          </div>
          <div className={styles.searchTasks_Tasks}>
            <AccordionMM
              date="29 de Agosto"
              title="Daily"
              duration="0:15"
              description="Lorem ipsum dolor sit amet, consectetur adip"
              tags={["Reuniões Internas", "Em progresso"]}
              time="13h - 14:45"
              size="small"
              hasIcons={true}
            />
            {/* {tasks != null ?  <p>Você ainda não possui tarefas cadastradas!</p> : <AddTask />} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
