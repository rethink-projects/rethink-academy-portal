import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

import style from "./NotesScreen.module.css";

// Components
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import TableContent, { noteType } from "./components/table/TableContent";
import TextEditor from "./components/textEditor/TextEditor";
import CategoryTag from "./components/CategoryTags/CategoryTag";
import PrivacyToggle from "./components/PrivacyToggle/PrivacyToggle";
import DeleteModal from "./components/DeleteModal/DeleteModal";

// Icons
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Images from "../../assets";

const NotesScreen = () => {
  const [state, setState] = useState<noteType | null>();

  let setCurrentNote = (note: noteType) => {
    setState(note);
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const [categories, setCategories] = useState(state?.categories);
  const [isPublic, setIsPublic] = useState(state?.isPublic);
  const [title, setTitle] = useState(state?.title);
  const [content, setContent] = useState(state?.content);

  const [isModalOpen, setModalOpen] = useState(false);

  //------------ Aviso sem notas ------------------------------------

  const [notes, setNotes] = useState<noteType[]>([]);

  const { user } = useAuth();

  const getNotes = async (email: string) => {
    const notes = await axios.get(`http://localhost:4000/api/note/${email}`);
    return notes.data.notesFormated;
  };

  useEffect(() => {
    (async () => {
      if (user) {
        setNotes(await getNotes(user.email));
      }
    })();

    return;
  }, [user]);

  // console.log(user);

  // ----------------------------------------------------------------

  const createNote = () => {
    // console.log("nova nota");
    const newNote = {
      email: user.email,
      title: "Sem título",
      categories: [false, false, false],
      isPublic: false,
      content: "Por favor insira seu texto aqui...",
    };

    axios.post(`http://localhost:4000/api/note`, newNote);

    window.location.reload();
  };

  const deleteNote = () => {
    // if (window.confirm("Tem certeza que deseja excluir a nota?")) {
    // console.log("deletar");
    if (state) {
      axios.delete(`http://localhost:4000/api/note/${state.id}`);
    }
    window.location.reload();
    // }
  };

  const saveNote = () => {
    // console.log("salvando");
    const updateNote = {
      title: title,
      categories: categories,
      isPublic: isPublic,
      content: content,
    };
    if (state) {
      axios.post(`http://localhost:4000/api/note/${state.id}`, updateNote);
    }
    window.location.reload();
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  return (
    <div className={style.notes_container}>
      <div className={style.container_extern}>
        <div className={style.table_header}>
          <div className={style.breadcrumb}>
            <Breadcrumb
              breadcrumbItems={[
                { title: "Home", link: "/" },
                { title: "Playground", link: "/playground" },
                { title: "Notas", link: "/notas" },
              ]}
            />
          </div>
          <div className={style.table_header_inner}>
            <h1 className={style.table_header_inner_title}>Notas</h1>
            <ButtonWithIcon
              type="secondary"
              size="small"
              text="Nova nota"
              icon={<AddRoundedIcon />}
              position="left"
              width={176}
              onClick={createNote}
            />
          </div>
        </div>
        {/* --------------------Aviso sem notas---------------------- */}
        {notes.length > 0 ? (
          <div className={style.table}>
            <TableContent handleClick={setState} />
          </div>
        ) : (
          <div className={style.noNotes_container}>
            <div className={style.noNotes_warning}>
              <img src={Images.infoNotes} alt="Ícone de informação" />
              <p>Você ainda não possui nenhuma anotação.</p>
            </div>
          </div>
        )}
        {/* --------------------------------------------------------- */}

        {/* <div className={style.table}>
          <TableContent handleClick={setState} />
        </div> */}
      </div>

      <div className={style.rightSideContainer}>
        {state && (
          <div className={style.textEditorContainer}>
            <div className={style.containerTop}>
              <div className={style.titleAndToggle}>
                <div>
                  <input
                    type="text"
                    value={
                      state?.title != "Sem título" ? state?.title : "Título"
                    }
                    placeholder="Título"
                    onChange={(e) => {
                      e.preventDefault();
                      setTitle(e.target.value);
                      state.title = e.target.value;
                    }}
                  />
                </div>
                <PrivacyToggle
                  getVisibility={(isPublic) => {
                    setIsPublic(isPublic);
                  }}
                  setVisibility={state.isPublic}
                />
              </div>

              <div className={style.categories}>
                <CategoryTag
                  getCategories={(categories) => {
                    setCategories(categories);
                    // console.log(categories);
                  }}
                  sendCategories={state.categories}
                />
              </div>
            </div>

            <div className={style.textEditor}>
              <TextEditor
                noteData={state}
                getContent={(value) => {
                  setContent(value);
                }}
              />
            </div>

            <div className={style.containerBottom}>
              <div className={style.saveDeleteButtons}>
                <div className={style.saveButton}>
                  <ButtonWithIcon
                    type="primary"
                    size="small"
                    text="Salvar"
                    width={134}
                    position="left"
                    icon={<SaveOutlinedIcon />}
                    onClick={saveNote}
                  />
                </div>
                <div className={style.deleteButton}>
                  <ButtonWithIcon
                    type="secondary"
                    size="small"
                    text="Excluir"
                    width={134}
                    position="left"
                    icon={<DeleteOutlineOutlinedIcon />}
                    onClick={() => setModalOpen(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <DeleteModal
          onClickConfirm={deleteNote}
          title="Tem certeza que deseja excluir a nota?"
          description="Ao confirmar essa ação, você não poderá recuperar esses dados."
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default NotesScreen;
