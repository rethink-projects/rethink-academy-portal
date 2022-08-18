import React from "react";
import AddTask from "../../components/AddTask/AddTask";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Note from "../../components/Note/Note";
import SearchCalendar from "./Components/SearchCalendar/SearchCalendar";

import styles from "./RegisterScreen.module.css";

// Route
{
  /* <Route path="/register" element={<Layout />}>
<Route index element={<RegisterScreen />} />
</Route> */
}

const RegisterScreen = () => {
  return (
    <div className={styles.register_container}>
      <div className={styles.register_content}>
        <div className={styles.register_breadcrumb}>
          <Breadcrumb
            breadcrumbItems={[
              { title: "Home", link: "/" },
              { title: "Registro de Horas", link: "/register" },
            ]}
          />
        </div>
        <div className={styles.register_body}>
          <div className={styles.register_registerTasks}>
            <AddTask />
          </div>
          <div className={styles.register_reminders}>
            <Note />
          </div>
        </div>
      </div>
      <div className={styles.register_searchTasks}>
        <SearchCalendar />
      </div>
    </div>
  );
};

export default RegisterScreen;
