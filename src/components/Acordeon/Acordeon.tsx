import { useState } from "react";
import styles from "./Acordeon.module.css";
import IconCheckedCircle from "@mui/icons-material/CheckCircleOutline";
import IconCircle from "@mui/icons-material/CircleOutlined";
import IconMore from "@mui/icons-material/ArrowForwardIosOutlined";
import IconVideoCam from "@mui/icons-material/VideocamOutlined";
import IconPadlock from "@mui/icons-material/LockOutlined";
import IconEdit from "@mui/icons-material/EditOutlined";
import ClassModal from "../../screens/course/components/ClassModal/ClassModal";

import { Lesson } from "../../screens/types/CourseTypes";
import { api } from "../../services/api";

type AcordeonProps = {
  width?: number;
  module: Module;
  isAmbassador?: boolean;
  onClickSubmitLesson?: VoidFunction;
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
  onClickItem: VoidFunction;
};

type editLesson = {
  id: string;
  name: string;
  embedUrl: string;
  description: string;
};

const Acordeon = ({
  width = 348,
  module,
  isAmbassador = false,
  onClickSubmitLesson = () => {},
}: AcordeonProps) => {
  const [selectedLesson, setSelectedLesson] = useState<editLesson>(
    {} as editLesson
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isModalLessonOpen, setIsModalLessonOpen] = useState(false);

  const classes: Array<Class> = module.classes!;

  const editLesson = async () => {
    await api.put(`/lesson/${selectedLesson.id}`, {
      id: selectedLesson.id,
      name: selectedLesson.name,
      description: selectedLesson.description,
      embedUrl: selectedLesson.embedUrl,
    });
    onClickSubmitLesson();
  };

  const handleSubmitEditLesson = () => {
    editLesson();
  };

  const setLessonName = (newName: string) => {
    setSelectedLesson({
      ...selectedLesson,
      name: newName,
    });
  };

  const setLessonUrl = (newUrl: string) => {
    setSelectedLesson({
      ...selectedLesson,
      embedUrl: newUrl,
    });
  };

  const setLessonDescription = (newDescription: string) => {
    setSelectedLesson({
      ...selectedLesson,
      description: newDescription,
    });
  };

  return (
    <div className={isOpen ? styles.container : ""}>
      <div
        style={{ width: width }}
        className={`${
          isOpen ? styles.module_container : styles.module_container_closed
        } ${!isAmbassador && module.blocked ? styles.module_disabled : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.left_side}>
          {!isAmbassador ? (
            module.completed ? (
              <IconCheckedCircle
                sx={{ color: "var(--color-feedback-success)" }}
              />
            ) : module.blocked ? (
              <div className={styles.padlock_border}>
                <IconPadlock />
              </div>
            ) : (
              <IconCircle />
            )
          ) : (
            <IconCheckedCircle
              sx={{ color: "var(--color-feedback-success)" }}
            />
          )}
          {`Módulo ${module.id} - ${module.name}`}
        </div>
        <div className={styles.right_side}>
          <IconMore />
        </div>
      </div>
      {isOpen && classes != null && (
        <div className={styles.acordeon_container}>
          {classes.map((clas, index) =>
            !isAmbassador ? (
              <div
                key={index}
                onClick={clas.onClickItem}
                className={styles.acordeon_item}
                style={{ width: width + 2 }}
              >
                <div className={styles.acordeon_left_side}>
                  <IconVideoCam />
                  {clas.name}
                </div>
                <div className={styles.acordeon_right_side}>
                  {clas.completed && <IconCheckedCircle />}
                </div>
              </div>
            ) : (
              <div className={styles.acordeon_item_ambassador}>
                <div
                  key={index}
                  onClick={clas.onClickItem}
                  className={styles.acordeon_item_ambassador}
                  style={{ width: width + 2 }}
                >
                  <div className={styles.acordeon_left_side}>
                    <IconVideoCam />
                    {clas.name}
                  </div>
                </div>
                <IconEdit
                  onClick={() => {
                    let className = clas.name.split("-");
                    setSelectedLesson({
                      id: clas.id,
                      name: className[1],
                      description: clas.description,
                      embedUrl: clas.url,
                    });
                    setIsModalLessonOpen(true);
                  }}
                />
              </div>
            )
          )}
        </div>
      )}
      {isModalLessonOpen && (
        <ClassModal
          onClose={() => {
            setIsModalLessonOpen(false);
          }}
          type={"edit"}
          className={selectedLesson.name}
          description={selectedLesson.description}
          embedLink={selectedLesson.embedUrl}
          setLessonName={setLessonName}
          setEmbedLink={setLessonUrl}
          setDescription={setLessonDescription}
          onClickConfirm={handleSubmitEditLesson}
        />
      )}
    </div>
  );
};

export default Acordeon;
