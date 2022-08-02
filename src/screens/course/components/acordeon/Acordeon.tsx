import { useState } from "react";
import styles from "./Acordeon.module.css";
import IconCheckedCircle from "@mui/icons-material/CheckCircleOutline";
import IconCircle from "@mui/icons-material/CircleOutlined";
import IconMore from "@mui/icons-material/ArrowForwardIosOutlined";
import IconVideoCam from "@mui/icons-material/VideocamOutlined";
import IconPadlock from "@mui/icons-material/LockOutlined";

type AcordeonProps = {
  width?: number;
  module?: Module;
};

type Module = {
  id: number;
  name: string;
  blocked: boolean;
  completed: boolean;
  classes?: Array<Class>;
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

const Acordeon = ({
  width = 348,
  module = {
    id: 1,
    name: "Aqui está o nome do módulo",
    blocked: false,
    completed: false,
    classes: [
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
}: AcordeonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes: Array<Class> = module.classes!;

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
          {`Módulo 1 - ${module.name}`}
        </div>
        <div className={styles.right_side}>
          <IconMore />
        </div>
      </div>
      {isOpen && classes != null && (
        <div className={styles.acordeon_container}>
          {classes.map((clas) => (
            <div className={styles.acordeon_item} style={{ width: width }}>
              <div className={styles.acordeon_left_side}>
                <IconVideoCam />
                {clas.name}
              </div>
              <div className={styles.acordeon_right_side}>
                {clas.completed && <IconCheckedCircle />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Acordeon;
