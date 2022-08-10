import React from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
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
      <div className={styles.register_breadcrumb}>
        <Breadcrumb
          breadcrumbItems={[
            { title: "Home", link: "/" },
            { title: "Registro de Horas", link: "/register" },
          ]}
        />
      </div>
      <div className={styles.register_registerTasks}></div>
      <div className={styles.register_reminders}></div>
      <div className={styles.register_searchTasks}>
        <SearchCalendar />
      </div>
    </div>
  );
};

export default RegisterScreen;
