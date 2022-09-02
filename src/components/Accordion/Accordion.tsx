import { useState } from "react";
import styles from "./Accordion.module.css";
import IconCheckedCircle from "@mui/icons-material/CheckCircleOutline";
import IconCircle from "@mui/icons-material/CircleOutlined";
import IconMore from "@mui/icons-material/ArrowForwardIosOutlined";
import IconVideoCam from "@mui/icons-material/VideocamOutlined";
import IconPadlock from "@mui/icons-material/LockOutlined";

type AccordionProps = {
  width?: number;
  module?: Module;
};

type Module = {
  id: number;
  name: string;
  blocked: boolean;
  completed: boolean;
  lessons?: Array<Class>;
};
type Class = {
  id: string;
  name: string;
  url: string;
  completed: boolean;
  description: string;
  order: number;
  duration: string;
  type: "video" | "audio" | "activity";
};

const Accordion = ({
  width = 348,
  module = {
    id: 1,
    name: "Aqui está o nome do módulo",
    blocked: false,
    completed: true,
    lessons: [
      {
        id: "xasdxcdefewr",
        name: "O nome dessa aula é esse",
        url: "link",
        completed: true,
        description: "texto de descrição",
        order: 1,
        duration: "(mm:ss)",
        type: "video",
      },
    ],
  },
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const lessons: Array<Class> = module.lessons!;

  return (
    <div className={isOpen ? styles.container : ""}>
      <div
        style={{ width: width }}
        className={`${
          isOpen ? styles.module_container : styles.module_container_closed
        } ${module.blocked ? styles.module_disabled : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.left_side}>
          {module.completed ? (
            <IconCheckedCircle
              sx={{ color: "var(--color-feedback-success)" }}
            />
          ) : module.blocked ? (
            <div className={styles.padlock_border}>
              <IconPadlock />
            </div>
          ) : (
            <IconCircle />
          )}
          {/* isso ainda será alterado */}
          {`Módulo 1 - ${module.name}`}
        </div>
        <div className={styles.right_side}>
          <IconMore />
        </div>
      </div>
      {isOpen && lessons != null && (
        <div className={styles.Accordion_container}>
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className={styles.Accordion_item}
              style={{ width: width + 2 }}
            >
              <div className={styles.Accordion_left_side}>
                <IconVideoCam />
                {lesson.name}
              </div>
              <div className={styles.Accordion_right_side}>
                {lesson.completed && <IconCheckedCircle />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accordion;
