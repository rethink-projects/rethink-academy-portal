import { useEffect, useState } from "react";
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

type AccordionProps = {
  width?: number;
  module: TypeModule;
  embassador?: boolean;
  blocked?: boolean;
  completed?: boolean;
  watcheds: string[];
  openModuleModal: (open: boolean) => void;
  setModuleModalType: (value: "add" | "edit") => void;
  setModuleName: (moduleName: string) => void;
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
  moduleId: number;
};

const Accordion = ({
  width = 348,
  openModuleModal,
  setModuleModalType,
  setModuleName,
  embassador,
  blocked,
  completed,
  module,
  watcheds,
}: // modules,
// module = {
//   id: 1,
//   name: "Aqui está o nome do módulo",
//   blocked: false,
//   completed: true,
//   lessons: [
//     {
//       id: "xasdxcdefewr",
//       name: "O nome dessa aula é esse",
//       url: "link",
//       completed: true,
//       description: "texto de descrição",
//       order: 1,
//       duration: "(mm:ss)",
//       type: "video",
//     },
//     {
//       id: "xasdxcdefsewr",
//       name: "O nome dessa aula é aaaaaaaaaaaaaaaaaa",
//       url: "link",
//       completed: true,
//       description: "texto de descrição",
//       order: 1,
//       duration: "(mm:ss)",
//       type: "video",
//     },
//   ],
// },

AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lessons, setLessons] = useState<Array<TypeLesson>>(module.lessons!);
  const [lesson, setLesson] = useState<TypeLesson>();
  const [lessonModalIsOpen, setLessonModalIsOpen] = useState(false);
  const [lessonName, setLessonName] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonEmbed, setLessonEmbed] = useState("");
  const [lessonModalType, setLessonModalType] = useState<"edit" | "add">("add");

  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);
  const [validationType, setValidationType] = useState<
    "save" | "cancel" | "delete"
  >("delete");

  const setAddLessonModal = () => {
    setLessonName("");
    setLessonDescription("");
    setLessonEmbed("");
    setLessonModalType("add");
    setLessonModalIsOpen(true);
  };
  const confirmChanges = () => {
    lesson!.name = lessonName;
  };

  const lessonComplet = (id: string) => {
    if (watcheds.includes(id)) {
      return true;
    }
    return false;
  };

  return (
    <div className={isOpen ? styles.container : ""}>
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
          visualNameChange={confirmChanges}
        />
      )}
      {validationModalIsOpen && (
        <ValidationModal
          onClose={setValidationModalIsOpen}
          type={validationType}
        />
      )}
      {/* MENU DO ACORDEON */}
      <div
        style={{ width: width }}
        className={`${
          isOpen ? styles.module_container : styles.module_container_closed
        } ${blocked ? styles.module_disabled : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {embassador ? (
          <>
            {/* CONTEÚDO DO MENU PARA O EMBAIXADOR */}
            <div className={styles.left_side_embassador}>
              <IconMore />
              {`Módulo 1 - ${module.name}`}
            </div>
            <div className={styles.right_side_embassador}>
              <IconTrash
                onClick={() => (
                  setValidationModalIsOpen(true), setValidationType("delete")
                )}
              />
              <IconEdit
                onClick={() => (
                  openModuleModal(true),
                  setModuleModalType("edit"),
                  setModuleName(module.name)
                )}
              />
            </div>
          </>
        ) : (
          <>
            {/* CONTEÚDO DO MENU PARA O ESTAGIÁRIO */}
            <div className={styles.left_side}>
              {completed ? (
                <IconCheckedCircle
                  sx={{ color: "var(--color-feedback-success)" }}
                />
              ) : blocked ? (
                <div className={styles.padlock_border}>
                  <IconPadlock />
                </div>
              ) : (
                <IconCircle />
              )}
              {`Módulo 1 - ${module.name}`}
            </div>
            <div className={styles.right_side}>{<IconMore />}</div>
          </>
        )}
      </div>
      {isOpen && lessons != null && lessons.length > 0 ? (
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
                  lessonComplet(lesson.id) && <IconCheckedCircle />
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
                onClick={() => (setAddLessonModal(), setLesson(undefined))}
              />
            </div>
          )}
        </div>
      ) : (
        isOpen && (
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
