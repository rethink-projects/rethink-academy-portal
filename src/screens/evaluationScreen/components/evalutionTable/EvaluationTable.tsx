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
  role: "engineering" | "design" | "product";
  skill: boolean;
  month?: string;
};

export type evaluationUserType = {
  [key: string]: {
    trail: string;
    hardSkills: evaluationType[];
    softSkills: evaluationType[];
  };
};

type evaluationType = {
  title: string;
  value: number;
};

export default function BasicEditingGrid({
  role,
  skill,
  month,
}: BasicEditingGridType) {
  const [evaluations, setEvaluations] = useState<
    evaluationUserType[]
    // Promise<evaluationUserType[]>
  >([]);

  const getEvaluations = async (month: string) => {
    try {
      const evaluationsData = await axios.get<evaluationUserType[]>(
        "http://localhost:4000/api/evaluate/Aug 2022"
      );
      setEvaluations(evaluationsData.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvaluations("Aug 2022");
    return;
  }, []);

  // console.log(evaluations[0].hardSkills);
  // const asyncSetEvaluations = async () => {
  //   const evaluation = await getEvaluations("Aug 2022");
  //   setEvaluations(evaluation);
  //   return;
  // };

  // console.log(evaluations != null ? evaluations[0] : "");

  const headers = {
    engineering: [
      "BackEnd",
      "FrontEnd",
      "HTML e CSS",
      "React",
      "JavaScript",
      "TypeScript",
    ],
    design: [
      "Pesquisas",
      "Facilitação de Workshop",
      "Wireframe e Fluxo",
      "Design system",
      "Product Design",
      "Padronização e ",
    ],
    product: [
      "Produto",
      "Pessoas",
      "Processos",
      "Estratégia",
      "Performance",
      "Evolução",
    ],
  };

  const columns: GridColumns = [
    {
      field: "name",
      headerName: "Nome",
      width: 180,
      editable: false,
    },
    {
      field: headers[role][0],
      headerName: headers[role][0],
      width: 176,
      type: "number",
      editable: true,
      headerAlign: "center",
    },
    {
      field: headers[role][1],
      headerName: headers[role][1],
      width: 176,
      type: "number",
      editable: true,
      headerAlign: "center",
    },
    {
      field: headers[role][2],
      headerName: headers[role][2],
      width: 176,
      type: "number",
      editable: true,
      headerAlign: "center",
    },
    {
      field: headers[role][3],
      headerName: headers[role][3],
      width: 176,
      type: "number",
      editable: true,
      headerAlign: "center",
    },
    {
      field: headers[role][4],
      headerName: headers[role][4],
      width: 176,
      type: "number",
      editable: true,
      headerAlign: "center",
    },
    {
      field: headers[role][5],
      headerName: headers[role][5],
      width: 176,
      type: "number",
      editable: true,
      headerAlign: "center",
    },
  ];

  const rows: GridRowsProp = [
    {
      id: 1,
      name: randomTraderName(),
      age: 25,
      dateCreated: randomCreatedDate(),
      lastLogin: randomUpdatedDate(),
      headerAlign: "center",
    },
    {
      id: 2,
      name: randomTraderName(),
      age: 36,
      dateCreated: randomCreatedDate(),
      lastLogin: randomUpdatedDate(),
    },
    {
      id: 3,
      name: randomTraderName(),
      age: 19,
      dateCreated: randomCreatedDate(),
      lastLogin: randomUpdatedDate(),
    },
    {
      id: 4,
      name: randomTraderName(),
      age: 28,
      dateCreated: randomCreatedDate(),
      lastLogin: randomUpdatedDate(),
    },
    {
      id: 5,
      name: randomTraderName(),
      age: 23,
      dateCreated: randomCreatedDate(),
      lastLogin: randomUpdatedDate(),
    },
  ];

  return (
    <div style={{ height: 316, width: "100%" }}>
      <DataGrid
        rows={rows}
        headerHeight={36}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        hideFooter={true}
        disableColumnMenu
        sx={{
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
        }}
      />
    </div>
  );
}
