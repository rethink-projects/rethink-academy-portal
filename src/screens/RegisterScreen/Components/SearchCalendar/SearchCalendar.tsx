// Links
// https://www.syncfusion.com/react-ui-components/react-daterangepicker

// https://rsuitejs.com/components/date-range-picker/
// https://github.com/rsuite/rsuite
// https://rsuitejs.com/en/guide/introduction/

import * as React from "react";
import InputSearch from "../../../../components/InputSearch/InputSearch";

//CSS
import styles from "./SearchCalendar.module.css";

// Calendar
import CalendarComponent from "./Calendar";

export default function SearchCalendar() {
  return (
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
        <p>Você ainda não possui tarefas cadastradas!</p>
      </div>
    </div>
  );
}
