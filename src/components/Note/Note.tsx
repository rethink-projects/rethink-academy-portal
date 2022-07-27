import React from "react";

// Styles
import styles from "./Note.module.css";

// components
import InputText from "../InputText/InputText";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Note = () => {
  return (
    <div className={styles.note_container}>
      <h5 className={styles.note_title}>Lembretes</h5>
      <div className={styles.note_content}>
        <InputText
          type="large"
          placeholder="Adicionar lembrete"
          hasIcon
          iconPosition="right"
          nameInput="description"
          right={<AddCircleOutlineIcon />}
        />
      </div>
    </div>
  );
};

export default Note;
