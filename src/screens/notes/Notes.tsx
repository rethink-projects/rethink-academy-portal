import React from "react";
import Table from "./components/table/Table";
import TextEditor from "./components/textEditor/TextEditor";
import styles from "./Notes.module.css";

const Notes = () => {
  return (
    <div className={styles.notes_container}>
      <Table />
      <TextEditor />
    </div>
  );
};

export default Notes;
