import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import TextEditor from "./components/textEditor/TextEditor";
import style from "./NotesScreen.module.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TableContent, { noteType } from "./components/table/TableContent";

// Components
import CategoryTag from "./components/CategoryTags/CategoryTag";
import PrivacyToggle from "./components/PrivacyToggle/PrivacyToggle";

// Icons
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const NotesScreen = () => {

  const [state, setState] = useState<noteType | null>();

  let setCurrentNote = (note: noteType) => {
    setState(note);
  };

  return (
    <div className={style.notes_container}>
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
            icon={<AddRoundedIcon />}
            position="left"
            width={176}
          />
        </div>
      </div>
      <div className={style.table} >
        <TableContent handleClick={setState}/>
      </div>
      </div>
      <div className={style.textEditorContainer}>
      <div className={style.containerTop}>
        <div className={style.titleAndToggle}>
          <div>
            <input type="text" value={state?.title} placeholder="Título" defaultValue={"Título"} />
          </div>
          <PrivacyToggle />
        </div>

        <div className={style.categories}>
          <CategoryTag type="Hard Skills" />

          <CategoryTag type="Soft Skills" />

          <CategoryTag type="Desenvolvimento Pessoal" />
        </div>
      </div>

      <div className={style.textEditor}>
        <TextEditor noteData={state} />
      </div>

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
    </div>
  );
};

export default NotesScreen;
