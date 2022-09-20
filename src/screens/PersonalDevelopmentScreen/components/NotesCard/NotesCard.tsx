import React, { useEffect, useState } from "react";

import style from "./NotesCard.module.css";

import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import TableContent, {
  noteType,
} from "../../../notes/components/table/TableContent";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";

import Images from "../../../../assets";
import { api } from "../../../../services/backend/Api";

type notesCardProps = {
  studentEmail?: string;
  height?: string;
};

const NotesCard = ({ studentEmail, height }: notesCardProps) => {
  const [notes, setNotes] = useState<noteType[]>([]);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getNotes();
    }
  }, [user, studentEmail]);

  const getNotes = async () => {
    if (!studentEmail) {
      const notes = await api.get(`/note/${user.email}`);
      setNotes(notes.data.notesFormated);
      return notes.data.notesFormated;
    } else if (user.role === "AMBASSADOR") {
      const notes = await api.get(`/note/${studentEmail}`);

      setNotes(
        notes.data.notesFormated.filter((note: any) => note.isPublic === true)
      );

      return notes.data.notesFormated;
    }
  };

  return (
    <div className={style.cardContainer} style={{ height: height }}>
      {notes.length > 0 ? (
        <div className={style.table}>
          <TableContent
            handleClick={() => {
              if (!studentEmail) {
                navigate("/dashboard/notas");
              } else {
                navigate(`/dashboard/notas/${studentEmail}`);
              }
            }}
            notes={notes}
            setNotes={setNotes}
          />
        </div>
      ) : (
        <div className={style.noNotes_container}>
          <div className={style.noNotes_warning}>
            <img src={Images.infoNotes} alt="Ícone de informação" />

            <p>Você ainda não possui nenhuma anotação.</p>
          </div>
        </div>
      )}

      <ButtonWithIcon
        type="secondary"
        size="small"
        text="Nova Nota"
        icon={<AddOutlinedIcon />}
        width={622}
        onClick={() => {
          if (!studentEmail) {
            navigate("/dashboard/notas");
          } else {
            navigate(`/dashboard/notas/${studentEmail}`);
          }
        }}
        position="left"
      />
    </div>
  );
};

export default NotesCard;
