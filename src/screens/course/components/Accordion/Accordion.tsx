import { api } from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// TYPES
import { Lesson, Validation } from "../../../types/CourseTypes";
import { AccordionProps } from "../../../types/PropTypes";

// ICONS
import IconCheckedCircle from "@mui/icons-material/CheckCircleOutline";
import IconCircle from "@mui/icons-material/CircleOutlined";
import IconMore from "@mui/icons-material/ArrowForwardIosOutlined";
import IconVideoCam from "@mui/icons-material/VideocamOutlined";
import IconPadlock from "@mui/icons-material/LockOutlined";
import IconEdit from "@mui/icons-material/EditOutlined";
import IconTrash from "@mui/icons-material/DeleteOutlined";
import IconPlus from "@mui/icons-material/AddCircleOutline";

//STYLES
import styles from "./Accordion.module.css";

// COMPONENTS
import ClassModal from "../ClassModal/ClassModal";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import ValidationModal from "../ValidationModal/ValidationModal";
import Tooltip from "../../../../components/Tooltip/Tooltip";

const Accordion = ({
  width = 348,
  openModuleModal,
  setModuleModalType,
  setModuleName,
  setModule,
  ambassador,
  blocked,
  completed,
  module,
  watched,
  position,
  reRender,
}: AccordionProps) => {
  const [accordionIsOpen, setAccordionIsOpen] = useState(false);
  const [lessons, setLessons] = useState<Array<Lesson>>(module.lessons!);
  const [lesson, setLesson] = useState<Lesson>();
  const [lessonModalIsOpen, setLessonModalIsOpen] = useState(false);
  const [lessonName, setLessonName] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonEmbed, setLessonEmbed] = useState("");
  const [lessonModalType, setLessonModalType] = useState<"EDIT" | "ADD">("ADD");
  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);
  const [validationType, setValidationType] = useState<Validation>("DELETE");
  const navigate = useNavigate();

  const setAddLessonModal = () => {
    setLesson(undefined);
    setLessonName("");
    setLessonDescription("");
    setLessonEmbed("");
    setLessonModalType("ADD");
    setLessonModalIsOpen(true);
  };

  const confirmLessonChanges = () => {
    if (lessonModalType === "ADD") {
      addLessonReq();
      // setTimeout(function () {
      reRender();
      // }, 100);
    } else if (validationType === "SAVE") {
      editLessonReq();
      lesson!.name = lessonName;
      lesson!.embedUrl = lessonEmbed;
    } else {
      deleteLessonReq();
      lessons.splice(lessons.indexOf(lesson!), 1);

      // lessons.remove(lesson!.indexOf, 1);
    }
  };

  const setDeleteModuleModal = () => {
    setModule(module);
    setModuleName(module.name);

    openModuleModal(true);
    setModuleModalType("DELETE");
  };

  const setEditModuleModal = () => {
    setModule(module);
    setModuleName(module.name);
    setValidationType("SAVE");
    setModuleModalType("EDIT");
    openModuleModal(true);
  };

  const addLessonReq = async () => {
    api
      .post("/lesson", {
        name: lessonName,
        description: lessonDescription,
        embedUrl: lessonEmbed,
        moduleId: module.id,
      })
      .then((response) =>
        lessons.push({
          name: lessonName,
          description: lessonDescription,
          embedUrl: lessonEmbed,
          moduleId: module.id,
          id: response.data.lesson.id,
        })
      );
  };

  const editLessonReq = async () => {
    api.put("/lesson/" + lesson!.id, {
      id: lesson!.id,
      name: lessonName,
      description: lessonDescription,
      embedUrl: lessonEmbed,
      moduleId: module.id,
    });
  };
  const deleteLessonReq = async () => {
    api.delete("/lesson/" + lesson!.id);
  };

  const lessonComplete = (id: string) => {
    if (watched.includes(id)) {
      return true;
    }
    return false;
  };

  return (
    <div className={accordionIsOpen ? styles.container : ""}>
      {/* -------MODAIS------ */}
      {lessonModalIsOpen && (
        <ClassModal
          onClose={() => setLessonModalIsOpen(false)}
          modalType={lessonModalType}
          className={lessonName}
          description={lessonDescription}
          embedLink={lessonEmbed}
          setLessonName={setLessonName}
          setEmbedLink={setLessonEmbed}
          setDescription={setLessonDescription}
          onClickConfirm={confirmLessonChanges}
          setValidationType={setValidationType}
          validationType={validationType}
        />
      )}
      {validationModalIsOpen && (
        <ValidationModal
          onClickConfirm={confirmLessonChanges}
          onClose={setValidationModalIsOpen}
          type={validationType}
        />
      )}
      {/* MENU DO ACORDEON */}
      <div
        style={{ width: width }}
        className={`${
          accordionIsOpen
            ? styles.module_container
            : styles.module_container_closed
        } ${blocked ? styles.module_disabled : ""}`}
      >
        {ambassador ? (
          <>
            {/* CONTEÚDO DO MENU PARA O EMBAIXADOR */}
            <div
              className={styles.left_side_ambassador}
              onClick={() => setAccordionIsOpen(!accordionIsOpen)}
            >
              <IconMore />
              {`Módulo ${position} - ${module.name}`}
            </div>
            <div className={styles.right_side_ambassador}>
              <Tooltip content="Deletar" direction="top">
                <IconTrash onClick={setDeleteModuleModal} />
              </Tooltip>
              <Tooltip content="Editar" direction="top">
                <IconEdit onClick={() => setEditModuleModal()} />
              </Tooltip>
            </div>
          </>
        ) : (
          <>
            {/* CONTEÚDO DO MENU PARA O ESTAGIÁRIO */}
            <div
              className={styles.left_side}
              onClick={() => setAccordionIsOpen(!accordionIsOpen)}
            >
              {blocked ? (
                <div className={styles.padlock_border}>
                  <IconPadlock />
                </div>
              ) : completed ? (
                <IconCheckedCircle
                  sx={{ color: "var(--color-feedback-success)" }}
                />
              ) : (
                <IconCircle />
              )}
              {`Módulo ${position} - ${module.name}`}
            </div>
            <div className={styles.right_side}>{<IconMore />}</div>
          </>
        )}
      </div>
      {accordionIsOpen && lessons != null && lessons.length > 0 ? (
        <div className={styles.accordion_container}>
          {lessons.map((lesson) => (
            <div
              className={styles.accordion_item}
              key={lesson.id}
              style={{ width: width + 2 }}
            >
              <div
                className={styles.accordion_left_side}
                onClick={() => navigate("aulas/" + lesson.id)}
              >
                <IconVideoCam />

                {lesson.name}
              </div>
              <div className={styles.accordion_right_side}>
                {ambassador ? (
                  <Tooltip direction={"top"} content={"Editar"}>
                    <IconEdit
                      onClick={() => (
                        setLessonName(lesson.name),
                        setLesson(lesson),
                        setLessonDescription(lesson.description),
                        setLessonEmbed(lesson.embedUrl),
                        setLessonModalIsOpen(true),
                        setLessonModalType("EDIT")
                      )}
                    />
                  </Tooltip>
                ) : (
                  lessonComplete(lesson.id) && <IconCheckedCircle />
                )}
              </div>
            </div>
          ))}
          {ambassador && (
            <div className={styles.no_lessons}>
              <ButtonWithIcon
                icon={<IconPlus />}
                text={"Adicionar Aula"}
                position={"left"}
                size={"medium"}
                type={"primary"}
                width={218}
                onClick={() => setAddLessonModal()}
              />
            </div>
          )}
        </div>
      ) : (
        accordionIsOpen && (
          <div className={styles.no_lessons}>
            <span>Este módulo ainda não possui nenhuma aula.</span>
            {ambassador && (
              <ButtonWithIcon
                icon={<IconPlus />}
                text={"Adicionar Aula"}
                position={"left"}
                size={"medium"}
                type={"primary"}
                width={218}
                onClick={() => setAddLessonModal()}
              />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Accordion;
