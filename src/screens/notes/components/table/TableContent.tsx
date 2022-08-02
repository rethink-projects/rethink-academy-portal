import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Box } from "@mui/material";
import { visuallyHidden } from '@mui/utils';


import Images from "../../../../assets/index";
import style from "./TableContent.module.css";
import Tooltip from "../../../../components/Tooltip/Tooltip";

function createData(title: string, date: number, categories: boolean[]) {
  return {
    title,
      date,
      hard: categories[0],
      soft: categories[1],
      desenvolvimentoPessoal: categories[2],
    };
  }
  
  const notes = [
    {
      title: "Anotações",
      date: 1659120152653,
      categories: [true, false, true]
    },
    {
      title: "Curso figma",
      date: 237,
      categories: [true, true, true]
    },
    {
      title: "1:1 Março",
      date: 1647802751770,
      categories: [false, false, true]
    },
    {
      title: "Soft Talk Liderança",
      date: 305,
      categories: [true, false, false]
    },
    {
      title: "1:1 Fevereiro",
      date: 1644951497325,
      categories: [false, true, false]
    },
    {
      title: "Anotações",
      date: 1659120152653,
      categories: [true, false, true]
    },
    {
      title: "Curso figma",
      date: 237,
      categories: [true, true, true]
    },
    {
      title: "1:1 Março",
      date: 1647802751770,
      categories: [false, false, true]
    },
    {
      title: "Soft Talk Liderança",
      date: 305,
      categories: [true, false, false]
    },
    {
      title: "1:1 Fevereiro",
      date: 1644951497325,
      categories: [false, true, false]
    },
    {
      title: "Anotações",
      date: 1659120152653,
      categories: [true, false, true]
    },
    {
      title: "Curso figma",
      date: 237,
      categories: [true, true, true]
    },
    {
      title: "1:1 Março",
      date: 1647802751770,
      categories: [false, false, true]
    },
    {
      title: "Soft Talk Liderança",
      date: 305,
      categories: [true, false, false]
    },
    {
      title: "1:1 Fevereiro",
      date: 1644951497325,
      categories: [false, true, false]
    },
    {
      title: "Anotações",
      date: 1659120152653,
      categories: [true, false, true]
    },
    {
      title: "Curso figma",
      date: 237,
      categories: [true, true, true]
    },
    {
      title: "1:1 Março",
      date: 1647802751770,
      categories: [false, false, true]
    },
    {
      title: "Soft Talk Liderança",
      date: 305,
      categories: [true, false, false]
    },
    {
      title: "1:1 Fevereiro",
      date: 1644951497325,
      categories: [false, true, false]
    },
  ];

  
  let rows = [
    notes.map((note:any) =>
    createData(
      note.title,
      note.date,
      note.categories
      )
      )
    ];
  
  
  export default function TableContent() {

  return (
    <TableContainer className={style.table_container} component={Paper}>
      <Table size="small" aria-label="a dense table">
      <TableHead className={style.table_head}>
        <TableRow>
            <TableCell className={style.table_head_nota}
              key={'name'}
              align={'left'}
            >
                Nota
            </TableCell>
            <TableCell className={style.table_head_date}
              key={'date'}
              align={'left'}
            >
                Data
            </TableCell>
            <TableCell className={style.table_head_category}
              key={'category'}
              align={'left'}
            >
                Categoria
            </TableCell>
        </TableRow>
      </TableHead>
        <TableBody>
          {rows.map((note) =>(
            note.map((row) => (
              <TableRow
                className={style.table_body}
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  className={style.table_body_nota}
                  component="th"
                  scope="row"
                >
                  {row.title}
                </TableCell>
                <TableCell className={style.table_body_date} align="left">
                  {new Intl.DateTimeFormat("pt-BR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(row.date)}
                </TableCell>
                <TableCell className={style.table_body_category} align="left">
                  {row.hard && (
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
                  {row.soft && (
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
                  {row.desenvolvimentoPessoal && (
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
            )
          )))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
