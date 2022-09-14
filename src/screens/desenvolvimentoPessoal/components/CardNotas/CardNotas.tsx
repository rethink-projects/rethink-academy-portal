import React from "react";

import style from "./CardNotas.module.css";

import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import TableContent from "../../../notes/components/table/TableContent";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";

const CardNotas = () => {
  const navigate = useNavigate();
  return (
    <div className={style.cardContainer}>
      <div className={style.table}>
        <TableContent
          handleClick={() => {
            navigate("/dashboard/notas");
          }}
        />
      </div>
      <ButtonWithIcon
        type="secondary"
        size="small"
        text="Nova Nota"
        icon={<AddOutlinedIcon />}
        width={622}
        onClick={() => {
          navigate("/dashboard/notas");
        }}
        position="left"
      />
    </div>
  );
};

export default CardNotas;
