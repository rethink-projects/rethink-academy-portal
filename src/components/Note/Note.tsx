import React, { useEffect, useState } from "react";

// Styles
import styles from "./Note.module.css";

// components
import InputText from "../InputText/InputText";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Content from "./Components/Content";

const Note = () => {
  const [notes, setNotes] = useState([
    {
      id: "1",
      text: "Texto ilustrando um lembrete 1",
      priority: 2,
    },
  ]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const data = [
      {
        id: "1",
        text: "Ilustrando um lembrete 1",
        priority: 2,
      },
      {
        id: "2",
        text: "Texto ilustrando um lembrete 2",
        priority: 3,
      },
      {
        id: "3",
        text: "Texto ilustrando um lembrete 3",
        priority: 1,
      },
      {
        id: "4",
        text: "Texto ilustrando um lembrete 4",
        priority: 1,
      },
    ];

    setNotes(data);
  }, []);

  const handleColor = (id: string, colorHeader: string, text: string) => {
    setNotes(notes.filter((note) => note.id !== id));

    let priority;

    if (colorHeader === "red") priority = 1;
    else if (colorHeader === "yellow") priority = 2;
    else priority = 3;

    const note = {
      id: id,
      text: text,
      color: colorHeader,
      priority: priority,
    };

    setNotes((prevState) => {
      return [...prevState, note];
    });

    sorting();
  };

  const sorting = () => {
    setNotes((prevState) => {
      return prevState.sort((a, b) => {
        if (a.priority < b.priority) return -1;
        else if (a.priority > b.priority) return 1;
        return 0;
      });
    });
  };

  useEffect(() => {
    sorting();
  }, []);

  const handleNote = () => {
    const note = {
      id: Math.floor(Math.random() * 1000).toString(),
      text: description,
      color: "green",
      priority: 3,
    };

    setNotes((prevState) => {
      return [...prevState, note];
    });

    setDescription("");
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (id: string) => {
    console.log("editando nota id: " + id);
  };

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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onClickRight={handleNote}
        />
        <div className={styles.note_content_notes}>
          {notes.map((note) => (
            <Content
              key={note.id}
              id={note.id}
              text={note.text}
              priority={note.priority}
              handleColor={handleColor}
              onClickDelete={handleDelete}
              onClickEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Note;
