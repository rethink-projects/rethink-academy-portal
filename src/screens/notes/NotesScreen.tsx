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
import Spinner from "../../components/Spinner/Spinner";

// Icons
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import Images from "../../assets";
import { useNavigate } from "react-router-dom";

const NotesScreen = () => {
  const [state, setState] = useState<noteType | null>();

  let setCurrentNote = (note: noteType) => {
    setState(note);
  };

  const [categories, setCategories] = useState(state?.categories);
  const [isPublic, setIsPublic] = useState(state?.isPublic);
  const [title, setTitle] = useState(state?.title);
  const [content, setContent] = useState(state?.content);

  const [update, setUpdate] = useState(false);
  // const [updateReturn, setUpdateReturn] = useState("");
  const [allowRender, setAllowRender] = useState(false);
  const [allowGetNotes, setAllowGetNotes] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setModalOpen] = useState(false);

  const [notes, setNotes] = useState<noteType[]>([]);
  const [studentEmail, setStudentEmail] = useState<any>(null);

  const { user } = useAuth();

  const navigate = useNavigate();

  // --------------Functions-------------------

  const validateRoute = () => {
    let link = window.location.pathname.split("/");
    if (
      link.length === 4 &&
      link[link.length - 1] &&
      link[link.length - 1] != ""
    ) {
      if (user.role === "AMBASSADOR" && studentEmail === null) {
        setStudentEmail(link[link.length - 1]);

        setUpdate((current) => !current);
        setAllowRender(false);
        return true;
      } else if (user.role === "STUDENT") {
        navigate("/dashboard/notas");
        window.location.reload();
      }
    } else {
      setAllowRender(true);
      return true;
    }
  };

  const getNotes = async () => {
    if (studentEmail === null) {
      const notes = await axios.get(
        `http://localhost:4000/api/note/${user.email}`
      );
      setNotes(notes.data.notesFormated);
    } else {
      const notes = await axios.get(
        `http://localhost:4000/api/note/${studentEmail}`
      );

      setNotes(
        notes.data.notesFormated.filter((note: any) => note.isPublic === true)
      );
      setAllowRender(true);
    }
  };

  const createNote = async () => {
    const newNote = {
      email: user.email,
      title: "Sem título",
      categories: [false, false, false],
      isPublic: false,
      content: "Por favor insira seu texto aqui...",
    };

    if (user.role === "AMBASSADOR" && studentEmail) {
      newNote.isPublic = true;
      newNote.email = studentEmail;
    }

    const { data } = await axios.post(
      `http://localhost:4000/api/note`,
      newNote
    );
    data.note.categories = [false, false, false];

    setNotes((prevValue) => [...prevValue, data.note]);
  };

  const deleteNote = async () => {
    if (state) {
      const { data } = await axios.delete(
        `http://localhost:4000/api/note/${state.id}`
      );

      const updateNotes = notes.filter((note) => state.id !== note.id);

      setNotes(updateNotes);
    }
    setUpdate((current) => !current);
    setModalOpen(false);
  };

  const saveNote = async () => {
    const updateNote = {
      title: title,
      categories: categories,
      isPublic: isPublic,
      content: content,
    };
    if (updateNote.title === "") {
      updateNote.title = "Sem título";
    }
    if (user.role === "AMBASSADOR") {
      if (studentEmail != null) {
        updateNote.isPublic = true;
      } else {
        updateNote.isPublic = false;
      }
    }
    if (state) {
      const { data } = await axios.post(
        `http://localhost:4000/api/note/${state.id}`,
        updateNote
      );

      if (categories) {
        data.note.categories = categories;
      } else {
        data.note.categories = state.categories;
      }

      const updateNotes = notes.filter((note) => state.id !== note.id);
      updateNotes.push(data.note);

      setNotes(updateNotes);
    }
    setUpdate((current) => !current);
  };

  useEffect(() => {
    // Loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Validate Route
    if (user) {
      if (validateRoute()) {
        setAllowGetNotes(true);
      } else {
        setAllowGetNotes(false);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user && allowGetNotes) {
      getNotes();

      setState(undefined);
      setCategories(undefined);
      setIsPublic(undefined);
      setTitle(undefined);
      setContent(undefined);
    }
  }, [user, allowGetNotes]);

  useEffect(() => {
    setState(undefined);
    setCategories(undefined);
    setIsPublic(undefined);
    setTitle(undefined);
    setContent(undefined);
  }, [update]);

  // --------------------------------------------------

  if (user && allowRender && !isLoading) {
    return (
      <div className={style.notes_container}>
        <div className={style.container_extern}>
          <div className={style.table_header}>
            {user.role === "STUDENT" && (
              <div className={style.breadcrumb}>
                <Breadcrumb
                  breadcrumbItems={[
                    { title: "Home", link: "/" },
                    {
                      title: "Seu desenvolvimento",
                      link: "/desenvolvimentoPessoal",
                    },
                    { title: "Notas", link: "/notas" },
                  ]}
                />
              </div>
            )}

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
              <TableContent
                handleClick={setState}
                notes={notes}
                setNotes={setNotes}
              />
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
                  {user.role === "STUDENT" ? (
                    <PrivacyToggle
                      getVisibility={(isPublic) => {
                        setIsPublic(isPublic);
                      }}
                      setVisibility={state.isPublic}
                    />
                  ) : studentEmail === null ? (
                    <button disabled className={style.privateBtn}>
                      <LockOutlinedIcon />
                      Privado
                    </button>
                  ) : (
                    <button disabled className={style.privateBtn}>
                      <PublicOutlinedIcon />
                      Público
                    </button>
                  )}
                </div>

                <div className={style.categories}>
                  <CategoryTag
                    getCategories={(categories) => {
                      setCategories(categories);
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
                  {studentEmail === null && (
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
                  )}
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
  }
  return (
    <div className={style.loadingPage}>
      <Spinner type="light" size="big" isLoading={true} />
    </div>
  );
};

export default NotesScreen;
