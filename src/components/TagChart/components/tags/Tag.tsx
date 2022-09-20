import { ErrorData } from "@firebase/util";
import { getDataGridUtilityClass } from "@mui/x-data-grid";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { api } from "../../../../services/backend/Api";
import { dataDois } from "../chart/BarChart";
import styles from "./Tag.module.css";

export const headers = [
  "Gerais",
  "Reuniões Internas",
  "Atividades Internas",
  "Fup",
  "1:1",
  "Daily",
];

const EvaluationTag = ({
  tags,
  setTags,
}: {
  tags: string;
  setTags: (value: any) => void;
}) => {
  const handleClass = (buttonSkill: string) => {
    if (buttonSkill === tags) {
      return [styles.tag_button, styles.tag_button_active].join(" ");
    }
    return styles.tag_button;
  };

  return (
    <div className={styles.tag_container}>
      {headers.map((item) => (
        <button
          className={handleClass(item)}
          onClick={() => {
            setTags(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default EvaluationTag;
