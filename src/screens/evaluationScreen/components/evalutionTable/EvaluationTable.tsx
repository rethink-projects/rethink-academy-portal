import React, { useEffect, useState } from "react";
import styles from "./EvaluationTable.module.css";
import { DataGrid, GridColumns, GridRowsProp } from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import axios, { AxiosResponse } from "axios";
import { fontSize } from "@mui/system";

type BasicEditingGridType = {
  role: "ENGINEERING" | "DESIGN" | "PRODUCT";
  skill: boolean;
  month?: string;
};

export type evaluationUserType = {
  id: string;
  month: string;
  userId: string;
  skillType: boolean;
  skill1: number;
  skill2: number;
  skill3: number;
  skill4: number;
  skill5: number;
  skill6: number;
  main: string;
  name: string;
};

export default function BasicEditingGrid({
  role,
  skill,
  month,
}: BasicEditingGridType) {
  const [evaluations, setEvaluations] = useState<evaluationUserType[]>([]);

  const headersSoftSkill = {
    ENGINEERING: [
      "Empatia",
      "Resolução de Problemas",
      "Comunicação",
      "Inteligencia emocial",
      "Autoconfiança",
      "Gestão de tempo",
    ],
    DESIGN: [
      "Empatia",
      "Resolução de Problemas",
      "Comunicação",
      "Inteligencia emocial",
      "Autoconfiança",
      "Gestão de tempo",
    ],
    PRODUCT: [
      "Empatia",
      "Resolução de Problemas",
      "Comunicação",
      "Inteligencia emocial",
      "Autoconfiança",
      "Gestão de tempo",
    ],
  };

  const headersHardSkill = {
    ENGINEERING: [
      "BackEnd",
      "FrontEnd",
      "HTML e CSS",
      "React",
      "JavaScript",
      "TypeScript",
    ],
    DESIGN: [
      "Pesquisas",
      "Facilitação de Workshop",
      "Wireframe e Fluxo",
      "Design system",
      "Product Design",
      "Padronização e ",
    ],
    PRODUCT: [
      "Produto",
      "Pessoas",
      "Processos",
      "Estratégia",
      "Performance",
      "Evolução",
    ],
  };

  let headers = headersHardSkill;

  if (skill) {
    headers = headersHardSkill;
  } else {
    headers = headersSoftSkill;
  }

  const getEvaluations = async (month: string) => {
    try {
      const evaluationsData = await axios.get<evaluationUserType[]>(
        `http://localhost:4000/api/evaluate/${month}?skillType=${skill}`,
        { params: { skill } }
      );
      // console.log(evaluationsData.data);
      setEvaluations(evaluationsData.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const columns: GridColumns = [
    {
      field: "name",
      headerName: "Nome",
      width: 240,
      maxWidth: 424,
      editable: false,
    },
    {
      field: headers[role][0],
      headerName: headers[role][0],
      width: 186,
      type: "number",
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: headers[role][1],
      headerName: headers[role][1],
      width: 186,
      type: "number",
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: headers[role][2],
      headerName: headers[role][2],
      width: 186,
      type: "number",
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: headers[role][3],
      headerName: headers[role][3],
      width: 186,
      type: "number",
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: headers[role][4],
      headerName: headers[role][4],
      width: 186,
      type: "number",
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: headers[role][5],
      headerName: headers[role][5],
      width: 186,
      type: "number",
      editable: true,
      headerAlign: "center",
      align: "center",
    },
  ];

  const [rows, setRows] = useState<GridRowsProp[] | any>([]);

  // UseEffect para get das notas e renderizar as linhas da tabela
  useEffect(() => {
    if (month) {
      getEvaluations(month);
    }
    return;
  }, [month, role, skill]);

  useEffect(() => {
    // console.log({ evaluations });
    if (skill) {
      headers = headersHardSkill;
    } else {
      headers = headersSoftSkill;
    }
    // console.log(headers);
    const evaluationsMap = evaluations.map((evaluate, index) => {
      // console.log(evaluate);
      if (
        evaluate.main === role &&
        evaluate.skillType === skill &&
        evaluate.month === month
      ) {
        return {
          id: evaluate.id ? evaluate.id : "NoEvaluate " + evaluate.userId,
          name: evaluate.name,
          [headers[role][0]]: evaluate.skill1,
          [headers[role][1]]: evaluate.skill2,
          [headers[role][2]]: evaluate.skill3,
          [headers[role][3]]: evaluate.skill4,
          [headers[role][4]]: evaluate.skill5,
          [headers[role][5]]: evaluate.skill6,
        };
      }
    });

    const evaluationsFilter = evaluationsMap.filter((evaluate) => {
      if (evaluate) {
        return evaluate;
      }
    });

    setRows(evaluationsFilter);
  }, [evaluations, skill]);

  const styleGrid = {
    ".MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "&.MuiDataGrid-root": {
      border: "none",
    },
    ".MuiDataGrid-columnHeaders": {
      backgroundColor: "var(--color-input)",
    },
    ".css-f3jnds-MuiDataGrid-columnHeaders": {
      border: "none",
    },
    ".MuiDataGrid-cell": {
      border: "none",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "150%",
      color: "var(--color-secondary)",
    },
    ".css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "16px",
    },
  };

  const createNewEvaluate = async (row: any, value: string) => {
    try {
      let userEmail = row.row.name.toLowerCase();
      userEmail = userEmail.split(" ");
      userEmail = userEmail[0].concat(".", userEmail[1]) + "@rethink.dev";
      const newValue = parseInt(value);
      console.log(row);

      await axios.post<evaluationUserType[]>(
        `http://localhost:4000/api/evaluate`,
        {
          month: month,
          userEmail: userEmail,
          skillType: skill,
          skill1:
            row.field === headers[role][0]
              ? newValue
              : row.row[headers[role][0]],
          skill2:
            row.field === headers[role][1]
              ? newValue
              : row.row[headers[role][1]],
          skill3:
            row.field === headers[role][2]
              ? newValue
              : row.row[headers[role][2]],
          skill4:
            row.field === headers[role][3]
              ? newValue
              : row.row[headers[role][3]],
          skill5:
            row.field === headers[role][4]
              ? newValue
              : row.row[headers[role][4]],
          skill6:
            row.field === headers[role][5]
              ? newValue
              : row.row[headers[role][5]],
        }
      );
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const updateEvaluate = async (row: any, value: string) => {
    try {
      console.log({
        value: value,
        main: role,
        skill: row.field,
        skillType: skill,
        id: row.id,
      });
      const updateResponse = await axios.post<evaluationUserType[]>(
        `http://localhost:4000/api/evaluate/${row.id}`,
        {
          value: value,
          main: role,
          skill: row.field,
          skillType: skill,
        }
      );
      console.log({ updateResponse });
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const onEditStop = async (row: any, value: any) => {
    console.log(row.id);
    const idSplit = row.id.split(" ");
    console.log(idSplit);
    if (idSplit[0] === "NoEvaluate") {
      createNewEvaluate(row, value);
    } else {
      updateEvaluate(row, value);
    }
    month && (await getEvaluations(month));
  };

  return (
    <div style={{ height: 316, width: "100%" }}>
      <DataGrid
        rows={rows}
        headerHeight={36}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        hideFooter={true}
        disableColumnMenu
        onCellEditStop={
          (row, value: any) => onEditStop(row, value.target.value)
          // console.log(row, value.target.value)
          // onEditStop(row, value:any)
        }
        sx={styleGrid}
      />
    </div>
  );
}
