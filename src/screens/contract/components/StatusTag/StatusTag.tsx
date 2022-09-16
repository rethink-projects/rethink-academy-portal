import React from "react";
import styles from "./StatusTag.module.css";
import {
  CheckCircleOutline,
  HighlightOff,
  ErrorOutline,
} from "@mui/icons-material";
import { red, yellow } from "@mui/material/colors";

type Status = {
  type: "active" | "pending" | "inactive";
};

const StatusTag = ({ type }: Status) => {
  const getClassByType = () => {
    let currentType = styles.status_active;
    switch (type) {
      case "pending":
        currentType = styles.status_pending;
        break;
      case "inactive":
        currentType = styles.status_inactive;
        break;
      default:
        break;
    }
    return currentType;
  };
  return (
    <div className={getClassByType()}>
      {type === "active" ? (
        <>
          <CheckCircleOutline color="success" /> Ativo{" "}
        </>
      ) : type === "inactive" ? (
        <>
          <HighlightOff sx={{ color: red[600] }} /> Encerrado{" "}
        </>
      ) : (
        <>
          <ErrorOutline sx={{ color: yellow[700] }} /> Pendente
        </>
      )}
    </div>
  );
};

export default StatusTag;
