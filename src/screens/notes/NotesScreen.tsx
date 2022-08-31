import React, { useEffect, useState } from "react";
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
import Images from "../../assets";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

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

  // ----------------------------------------------------------------

  const createNote = () => {
    console.log("nova nota");
    const newNote = {
      email: user.email,
      title: "Título",
      categories: [false, false, false],
      isPublic: false,
      content: "Por favor insira seu texto aqui...",
    };

    axios.post(`http://localhost:4000/api/note`, newNote);

    window.location.reload();
  };

  const deleteNote = () => {
    if (window.confirm("Tem certeza que deseja excluir a nota?")) {
      console.log("deletar");
      if (state) {
        axios.delete(`http://localhost:4000/api/note/${state.id}`);
      }
      window.location.reload();
    }
  };

  const saveNote = () => {
    console.log("salvando");
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
              <p> O estagiário não fez nenhuma anotação até o momento</p>
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
                    value={state?.title}
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
                    console.log(categories);
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
                <ButtonWithIcon
                  type="primary"
                  size="small"
                  text="Salvar"
                  width={134}
                  position="left"
                  icon={<SaveOutlinedIcon />}
                  onClick={saveNote}
                />
                <ButtonWithIcon
                  type="secondary"
                  size="small"
                  text="Excluir"
                  width={134}
                  position="left"
                  icon={<DeleteOutlineOutlinedIcon />}
                  onClick={deleteNote}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesScreen;
