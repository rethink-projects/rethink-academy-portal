import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from "@mui/x-data-grid-generator";

import styles from "./TableActivityPlan.module.css";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { useParams } from "react-router-dom";

// const TimeLine = () => {
//   return <div></div>;
// };

// export default TimeLine;

type StageType = {
  id: string;
  stage: string;
  start: Date;
  finish: Date;
  content: string;
  status: string;
  isNew: boolean;
};

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    stage: randomTraderName(),
    period: 25,
    content: 20,
    status: "Finalizado",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    stage: randomTraderName(),
    period: 36,
    content: 20,
    status: "Finalizado",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    stage: randomTraderName(),
    period: 19,
    content: 20,
    status: "Finalizado",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    stage: randomTraderName(),
    period: 28,
    content: 20,
    status: "Finalizado",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    stage: randomTraderName(),
    period: 23,
    content: 20,
    status: "Finalizado",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, stage: "", period: "", content: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "stage" },
    }));
  };

  return (
    <div className={styles.header_table}>
      <h1 className={styles.header_title_table}>Plano de Atividades</h1>
      <ButtonWithIcon
        onClick={handleClick}
        position="left"
        width={238}
        size="small"
        type="primary"
        text="Adicionar etapa"
        icon={<AddCircleOutlineIcon />}
      />
    </div>
  );
}

export default function TableActivityPlan() {
  const { id: courseId } = useParams();

  useEffect(() => {
    axios.get("http://localhost:4000/api/stage").then((response) => {
      if (response.data) {
        const stage: GridRowsProp = response.data.stageLine.map(
          (stage: any) => {
            //   return (stage.start = new Date(stage.start)
            //     .toLocaleDateString()
            //     .toString());
            console.log(stage.id);
            return (stage.content = "Eita nóis");
          }
        );

        // const date = new Date(response.data.stageLine[0].start);
        // console.log(date.toLocaleDateString());
        setRows(stage);
      }
    });
  }, []);

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
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: 16,
      lineHeight: "150%",
      color: "var(--color-secondary)",
    },
    ".css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: 14,
      lineHeight: "16",
      color: "var(--color-secondary-hover)",
    },
    ".css-1j9kmqg-MuiDataGrid-toolbarContainer": {
      justifyContent: "flex-end",
    },
  };

  const [rows, setRows] = React.useState<GridRowsProp>();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId, row: any) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
    const stage: any = rows?.filter((row) => row.id === id);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    axios.delete("http://localhost:4000/api/stage/" + id);

    setRows(rows?.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows?.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows?.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: any) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows?.map((row) => (row.id === newRow.id ? updatedRow : row)));

    const today = new Date();

    let status = "CLOSED";
    if (today > updatedRow.start && today < updatedRow.finish) {
      status = "PROGRESS";
    } else if (today < updatedRow.start) {
      status = "FINISHED";
    } else if (today > updatedRow.finish) {
      status = "CLOSED";
    }

    axios.post("http://localhost:4000/api/stage/" + updatedRow.id, {
      stage: updatedRow.stage,
      start: updatedRow.start,
      finish: updatedRow.finish,
      content: updatedRow.content,
      status: status,
      courseId: "1",
    });

    return updatedRow;
  };

  const columns: GridColumns = [
    {
      field: "stage",
      headerName: "Etapa",
      width: 140,
      editable: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "start",
      headerName: "Início",
      type: "date",
      width: 160,
      editable: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "finish",
      headerName: "Conclusão",
      type: "date",
      width: 160,
      editable: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "content",
      headerName: "Conteúdo",
      editable: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
      width: 696,
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   type: "number",
    //   editable: true,
    //   sortable: false,
    //   headerAlign: "center",
    //   align: "center",
    //   width: 220,
    // },
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
      width: 100,
      cellClassName: "actions",
      sortable: false,
      headerAlign: "center",
      align: "center",
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id, row)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      {rows && (
        <DataGrid
          sx={styleGrid}
          rows={rows}
          columns={columns}
          headerHeight={36}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          experimentalFeatures={{ newEditingApi: true }}
          hideFooter={true}
          disableColumnMenu
        />
      )}
    </Box>
  );
}
