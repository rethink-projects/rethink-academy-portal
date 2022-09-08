import React, { useEffect, useState } from "react";

// Styles
import styles from "./Note.module.css";

// components
import InputText from "../InputText/InputText";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Content from "./Components/Content";
import {
  createStickerNotes,
  getStickerNotesByUserEmail,
  removeStickerNotes,
  updateStickerNotes,
} from "../../services/backend/StickerNotes";
import { useAuth } from "../../context/AuthContext";

const Note = () => {
  type Note = {
    id: string;
    description: string;
    priority: number;
    data: string;
    userId?: string;
  };

  const { user } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);

  const changeNotes = async () => {
    await getStickerNotesByUserEmail("sthephany.tezza@rethink.dev")
      .then((response) => {
        setNotes(response.stickerNotes);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    changeNotes();
  }, []);

  const [description, setDescription] = useState("");

  const handleColor = async (id: string, colorHeader: string, text: string) => {
    let priority;

    if (colorHeader === "red") priority = 1;
    else if (colorHeader === "yellow") priority = 2;
    else priority = 3;

    await updateStickerNotes(id, text, priority);

    changeNotes();
  };

  const handleNote = async () => {
    await createStickerNotes(description, "sthephany.tezza@rethink.dev");

    changeNotes();

    setDescription("");
  };

  const handleDelete = async (id: string) => {
    await removeStickerNotes(id);
    changeNotes();
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
              text={note.description}
              priority={note.priority}
              handleColor={handleColor}
              onClickDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Note;
