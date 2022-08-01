import React from "react";
import style from "./TextEditorContainer.module.css";

// Components
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import CategoryTag from "./components/CategoryTags/CategoryTag";
import PrivacyToggle from "./components/PrivacyToggle/PrivacyToggle";

// Icons
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const textEditorContainer = () => {
  return (
    <div className={style.textEditorContainer}>
      <div className={style.containerTop}>
        <div className={style.titleAndToggle}>
          <div>
            <input type="text" placeholder="Título" defaultValue={"Título"} />
          </div>
          <PrivacyToggle />
        </div>

        <div className={style.categories}>
          <CategoryTag type="Hard Skills" />

          <CategoryTag type="Soft Skills" />

          <CategoryTag type="Desenvolvimento Pessoal" />
        </div>
      </div>

      <div className={style.textEditor}></div>

      <div className={style.containerBottom}>
        <div className={style.saveDeleteButtons}>
          <ButtonWithIcon
            type="primary"
            size="small"
            text="Salvar"
            width={134}
            position="left"
            icon={<SaveOutlinedIcon />}
          />
          <ButtonWithIcon
            type="secondary"
            size="small"
            text="Excluir"
            width={134}
            position="left"
            icon={<DeleteOutlineOutlinedIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default textEditorContainer;
