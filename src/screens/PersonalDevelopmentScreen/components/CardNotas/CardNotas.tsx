import React, { useEffect, useState } from "react";

import style from "./CardNotas.module.css";

import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import TableContent, {
  noteType,
} from "../../../notes/components/table/TableContent";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import axios from "axios";
import Images from "../../../../assets";

type notesCardProps = {
  studentEmail?: string;
};

const CardNotas = ({ studentEmail }: notesCardProps) => {
  const [notes, setNotes] = useState<noteType[]>([]);

  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  console.log(studentEmail);

  useEffect(() => {
    if (user) {
      getNotes();
    }
  }, [user, studentEmail]);

  const getNotes = async () => {
    // console.log("chamou get notes");

    if (!studentEmail) {
      // console.log("-------------------------");

      const notes = await axios.get(
        `http://localhost:4000/api/note/${user.email}`
      );
      setNotes(notes.data.notesFormated);
      return notes.data.notesFormated;
    } else if (user.role === "AMBASSADOR") {
      // console.log("**");

      const notes = await axios.get(
        `http://localhost:4000/api/note/${studentEmail}`
      );

      // console.log(
      //   notes.data.notesFormated.filter((note: any) => note.isPublic === true)
      // );

      setNotes(
        notes.data.notesFormated.filter((note: any) => note.isPublic === true)
      );

      return notes.data.notesFormated;
    }
  };

  return (
    <div className={style.cardContainer}>
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

export default CardNotas;
