import { useState } from "react";
import styles from "./Accordion.module.css";

import IconCheckedCircle from "@mui/icons-material/CheckCircleOutline";
import IconCircle from "@mui/icons-material/CircleOutlined";
import IconMore from "@mui/icons-material/ArrowForwardIosOutlined";
import IconVideoCam from "@mui/icons-material/VideocamOutlined";
import IconPadlock from "@mui/icons-material/LockOutlined";
import IconEdit from "@mui/icons-material/EditOutlined";
import IconTrash from "@mui/icons-material/DeleteOutlined";
import IconPlus from "@mui/icons-material/AddCircleOutline";

import ClassModal from "../ClassModal/ClassModal";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import ValidationModal from "../ValidationModal/ValidationModal";
import axios from "axios";

type AccordionProps = {
  width?: number;
  module: TypeModule;
  embassador?: boolean;
  blocked?: boolean;
  position: number;
  completed?: boolean;
  watcheds: string[];
  openModuleModal: (open: boolean) => void;
  setModuleModalType: (value: "add" | "edit" | "delete") => void;
  setModuleName: (moduleName: string) => void;
  setModule: (module: TypeModule) => void;
};
type TypeModule = {
  id: string;
  name: string;
  lessons: TypeLesson[];
};
type TypeLesson = {
  id: string;
  name: string;
  embedUrl: string;
  order: number;
  description: string;
  moduleId: string;
};

const Accordion = ({
  width = 348,
  openModuleModal,
  setModuleModalType,
  setModuleName,
  setModule,
  embassador,
  blocked,
  completed,
  module,
  watcheds,
  position,
}: AccordionProps) => {
  const [accordionIsOpen, setAccordionIsOpen] = useState(false);
  const [lessons, setLessons] = useState<Array<TypeLesson>>(module.lessons!);
  const [lesson, setLesson] = useState<TypeLesson>();
  const [lessonModalIsOpen, setLessonModalIsOpen] = useState(false);
  const [lessonName, setLessonName] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonEmbed, setLessonEmbed] = useState("");
  const [lessonModalType, setLessonModalType] = useState<"edit" | "add">("add");
  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);
  const [validationType, setValidationType] = useState<"save" | "delete">(
    "delete"
  );

  const setAddLessonModal = () => {
    setLesson(undefined);
    setLessonName("");
    setLessonDescription("");
    setLessonEmbed("");
    setLessonModalType("add");
    setLessonModalIsOpen(true);
  };

  const confirmLessonChanges = () => {
    if (lessonModalType === "add") {
      addLessonReq();
      const lesson: TypeLesson = {
        name: lessonName,
        description: lessonDescription,
        embedUrl: lessonEmbed,
        order: module.lessons.length,
        moduleId: module.id,
        id: module.lessons.length + "id",
      };
      lessons.push(lesson);
    } else {
      editLessonReq();
      lesson!.name = lessonName;
      lesson!.embedUrl = lessonEmbed;
    }
  };

  const setDeleteModuleModal = () => {
    setModule(module);
    setModuleName(module.name);

    openModuleModal(true);
    setModuleModalType("delete");
  };

  const setEditModuleModal = () => {
    setModule(module);
    setModuleName(module.name);
    setValidationType("save");
    setModuleModalType("edit");
    openModuleModal(true);
  };

  const addLessonReq = async () => {
    await axios.post("http://localhost:4000/api/lesson", {
      name: lessonName,
      description: lessonDescription,
      embedUrl: lessonEmbed,
      order: module.lessons.length,
      moduleId: module.id,
    });
  };

  const editLessonReq = async () => {
    await axios.put("http://localhost:4000/api/lesson/" + lesson!.id, {
      id: lesson!.id,
      name: lessonName,
      description: lessonDescription,
      embedUrl: lessonEmbed,
      order: module.lessons.length,
      moduleId: module.id,
    });
  };

  const lessonComplete = (id: string) => {
    if (watcheds.includes(id)) {
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
          type={lessonModalType}
          className={lessonName}
          description={lessonDescription}
          embedLink={lessonEmbed}
          setLessonName={setLessonName}
          setEmbedLink={setLessonEmbed}
          setDescription={setLessonDescription}
          onClickConfirm={confirmLessonChanges}
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
        onClick={() => setAccordionIsOpen(!accordionIsOpen)}
      >
        {embassador ? (
          <>
            {/* CONTEÚDO DO MENU PARA O EMBAIXADOR */}
            <div className={styles.left_side_embassador}>
              <IconMore />
              {`Módulo ${position} - ${module.name}`}
            </div>
            <div className={styles.right_side_embassador}>
              <IconTrash onClick={setDeleteModuleModal} />
              <IconEdit onClick={() => setEditModuleModal()} />
            </div>
          </>
        ) : (
          <>
            {/* CONTEÚDO DO MENU PARA O ESTAGIÁRIO */}
            <div className={styles.left_side}>
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
              <div className={styles.accordion_left_side}>
                <IconVideoCam />

                {lesson.name}
              </div>
              <div className={styles.accordion_right_side}>
                {embassador ? (
                  <IconEdit
                    onClick={() => (
                      setLessonName(lesson.name),
                      setLesson(lesson),
                      setLessonDescription(lesson.description),
                      setLessonEmbed(lesson.embedUrl),
                      setLessonModalIsOpen(true),
                      setLessonModalType("edit")
                    )}
                  />
                ) : (
                  lessonComplete(lesson.id) && <IconCheckedCircle />
                )}
              </div>
            </div>
          ))}
          {embassador && (
            <div className={styles.no_lessons}>
              <ButtonWithIcon
                icon={<IconPlus />}
                text={"Adicionar Aula"}
                position={"right"}
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
            {embassador && (
              <ButtonWithIcon
                icon={<IconPlus />}
                text={"Adicionar Aula"}
                position={"right"}
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
