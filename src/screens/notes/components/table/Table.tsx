import React from "react";
import style from "./Table.module.css";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";

import Images from "../../../../assets/index";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TableContent from "./TableContent";

const Table = () => {
  const iconButtonNovaNota = <AddRoundedIcon />;

  return (
    <div className={style.container_extern}>
      <div className={style.table_header}>
        <div className={style.breadcrumb} >
          <Breadcrumb
            breadcrumbItems={[
              { title: "Home", link: "/" },
              { title: "Playground", link: "/playground" },
              { title: "Notas", link: "/notas" },
            ]}
          />
        </div>
        <div className={style.table_header_inner}>
          <h1 className={style.table_header_inner_title} >Notas</h1>
          <ButtonWithIcon
            type="secondary"
            size="small"
            text="Nova nota"
            icon={iconButtonNovaNota}
            position="left"
            width={176}
          />
        </div>
      </div>
      <div className={style.table} >
        <TableContent />
      </div>
    </div>
  );
};

export default Table;
