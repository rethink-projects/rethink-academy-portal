import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Box } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

import { useAuth } from "../../../../context/AuthContext";
import axios from "axios";

import Images from "../../../../assets/index";
import style from "./TableContent.module.css";
import Tooltip from "../../../../components/Tooltip/Tooltip";
import { useEffect, useState } from "react";

import TextEditor from "../textEditor/TextEditor";

export type noteType = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  categories: boolean[];
  isPublic: boolean;
};

function createData({
  id,
  title,
  content,
  createdAt,
  categories,
  isPublic,
}: noteType) {
  return {
    id,
    title,
    content,
    createdAt,
    categories,
    isPublic,
  };
}

const TableContent = ({
  handleClick,
}: {
  handleClick: React.Dispatch<
    React.SetStateAction<noteType | null | undefined>
  >;
}) => {
  const [notes, setNotes] = useState<noteType[]>([]);

  const { user } = useAuth();

  const getNotes = async (email: string) => {
    const notes = await axios.get(`http://localhost:4000/api/note/${email}`);

    return notes.data.notesFormated;
  };

  useEffect(() => {
    (async () => {
      if (user) {
        setNotes(await getNotes(user.email));
      }
    })();

    return;
  }, [user]);

  let rows = notes.map((note: noteType) => createData(note));

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <TableContainer className={style.table_container} component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead className={style.table_head}>
          <TableRow>
            <TableCell
              className={style.table_head_nota}
              key={"name"}
              align={"left"}
            >
              Nota
            </TableCell>
            <TableCell
              className={style.table_head_date}
              key={"date"}
              align={"left"}
            >
              Data
            </TableCell>
            <TableCell
              className={style.table_head_category}
              key={"category"}
              align={"left"}
            >
              Categoria
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              className={style.table_body}
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => handleClick(row)}
            >
              <TableCell
                className={style.table_body_nota}
                component="th"
                scope="row"
              >
                {row.title}
              </TableCell>
              <TableCell className={style.table_body_date} align="left">
                {new Date(row.createdAt).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell className={style.table_body_category} align="left">
                {row.categories[0] && (
                  <Tooltip direction="top" content="Hard Skills">
                    <div className={style.table_body_category_icon_div}>
                      <img
                        className={style.table_body_category_icon}
                        src={Images.HardSkillsIconNote}
                        alt="hard skills icon"
                      />
                    </div>
                  </Tooltip>
                )}{" "}
                {row.categories[1] && (
                  <Tooltip direction="top" content="Soft Skills">
                    <div className={style.table_body_category_icon_div}>
                      <img
                        className={style.table_body_category_icon}
                        src={Images.SoftSkillsIconNote}
                        alt="soft skills icon"
                      />
                    </div>
                  </Tooltip>
                )}{" "}
                {row.categories[2] && (
                  <Tooltip
                    direction="top-left"
                    content="Desenvolvimento Pessoal"
                  >
                    <div className={style.table_body_category_icon_div}>
                      <img
                        className={style.table_body_category_icon}
                        src={Images.DPIconNote}
                        alt="DP icon"
                      />
                    </div>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableContent;
