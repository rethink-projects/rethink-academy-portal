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
  email: string;
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

  // Headers of table, depends on switch state
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
      "Padronização e Documentação",
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

  // get evaluates from datebase and save in evaluations using useState
  const getEvaluations = async (month: string) => {
    try {
      const evaluationsData = await axios.get<evaluationUserType[]>(
        `http://localhost:4000/api/evaluate/${month}?skillType=${skill}`,
        { params: { skill } }
      );
      setEvaluations(evaluationsData.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  // columns of table using da headers
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

  // useState for rows of table
  const [rows, setRows] = useState<GridRowsProp[] | any>([]);

  // UseEffect for call function get evaluates
  useEffect(() => {
    if (month) {
      getEvaluations(month);
    }
    return;
  }, [month, role, skill]);

  // useEffect for set the rows of table
  useEffect(() => {
    if (skill) {
      headers = headersHardSkill;
    } else {
      headers = headersSoftSkill;
    }
    const evaluationsMap = evaluations.map((evaluate, index) => {
      if (
        evaluate.main === role &&
        evaluate.skillType === skill &&
        evaluate.month === month
      ) {
        return {
          id: evaluate.id ? evaluate.id : "NoEvaluate " + evaluate.userId,
          email: evaluate.email,
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

  // methods create and update evalute
  const createNewEvaluate = async (tableData: any, value: string) => {
    try {
      const newValue = parseInt(value);
      await axios.post<evaluationUserType[]>(
        `http://localhost:4000/api/evaluate`,
        {
          month: month,
          userEmail: tableData.row.email,
          skillType: skill,
          skill1:
            tableData.field === headers[role][0]
              ? newValue
              : tableData.row[headers[role][0]],
          skill2:
            tableData.field === headers[role][1]
              ? newValue
              : tableData.row[headers[role][1]],
          skill3:
            tableData.field === headers[role][2]
              ? newValue
              : tableData.row[headers[role][2]],
          skill4:
            tableData.field === headers[role][3]
              ? newValue
              : tableData.row[headers[role][3]],
          skill5:
            tableData.field === headers[role][4]
              ? newValue
              : tableData.row[headers[role][4]],
          skill6:
            tableData.field === headers[role][5]
              ? newValue
              : tableData.row[headers[role][5]],
        }
      );
      if (month) {
        await getEvaluations(month);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const updateEvaluate = async (row: any, value: string) => {
    try {
      const updateResponse = await axios.patch<evaluationUserType[]>(
        `http://localhost:4000/api/evaluate/${row.id}`,
        {
          value: value,
          main: role,
          skill: row.field,
          skillType: skill,
        }
      );
      if (month) {
        await getEvaluations(month);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  // method for edit cells of table
  const onEditStop = async (row: any, value: any) => {
    const idSplit = row.id.split(" ");
    if (idSplit[0] === "NoEvaluate") {
      createNewEvaluate(row, value);
    } else {
      updateEvaluate(row, value);
    }
    month && (await getEvaluations(month));
  };

  // styles of table
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

  return (
    <div style={{ height: 316, width: "100%" }}>
      <DataGrid
        rows={rows}
        headerHeight={36}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        hideFooter={true}
        disableColumnMenu
        onCellEditStop={(row, value: any) =>
          onEditStop(row, value.target.value)
        }
        sx={styleGrid}
      />
    </div>
  );
}
