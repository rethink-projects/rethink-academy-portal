import styles from "./CardAddCourse.module.css";
import InputText from "../../../../components/InputText/InputText";
import Textarea from "../../../../components/Textarea/Textarea";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import TrailModal from "../../../../components/TrailModal/TrailModal";
import Toast from "../../../../components/Toast/Toast";
import { useNotification } from "../../../../context/NotificationContext";
import { Timestamp } from "firebase/firestore";
import { api } from "../../../../services/api";
import { useLocation } from "react-router-dom";
import { CourseResponse } from "../../CursosScreen";

interface FormData {
  name: string;
  type: string;
  offeredBy: "Rethink Academy";
  description: string;
  nameInstructor: string;
  descriptionInstructor: string;
  avatar: string;
  level: string;
  workload: string;
  learn: string;
  skills: string;
}

interface Profile {
  id: string;
  bio?: string;
  avatar?: string;
  social?: JSON;
  // user:   User    @relation(fields: [userId], references: [id])
  userId: string;
}

interface UserResponse {
  id: string;
  email: string;
  name?: string;
  surname?: string;
  main?: string;
  watched: string[];
  role: "STUDENT" | "EMBASSADOR" | "RETHINKER";
  profile?: Profile;
  course: CourseResponse[];
}

interface Module {
  id: string;
  name: string;
  courseId: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  name: string;
  embedUrl: string;
  order: number;
  description: string;
  moduleId: string;
}

type addCourseProps = {
  addCourse?: boolean;
  onClose: VoidFunction;
  idCourse?: string;
  course?: CourseResponse;
};

const CardAddCourse = ({
  course,
  addCourse = true,
  idCourse = "",
  onClose = () => {},
}: addCourseProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [previousStep, setPreviousStep] = useState(1);
  const [valueTypeCourse, setValueTypeCourse] = useState<string>(() => {
    return !addCourse
      ? course?.type === "COURSE"
        ? "Curso"
        : course?.type === "TRAINING"
        ? "Treinamento"
        : course?.type === "LECTURE"
        ? "Palestra"
        : "Workshop"
      : "Selecione...";
  });
  const [valueLevelCourse, setValueLevelCourse] =
    useState<string>("Selecione...");

  const location = useLocation();
  let trilhaId = location.pathname.replace("/trilhas/", "");
  const { notify } = useNotification();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    offeredBy: "Rethink Academy",
    description: "",
    nameInstructor: "",
    descriptionInstructor: "",
    avatar: "",
    level: "",
    workload: "",
    learn: "",
    skills: "",
  });

  const title = addCourse ? "Adicionar um Curso" : "Editar um Curso";

  async function loadCourse() {
    console.log(course?.teacher.profile);

    if (course) {
      const {
        description,
        id,
        learning,
        level,
        modules,
        name,
        skills,
        teacherId,
        trailId,
        type,
        workload,
        teacher,
      } = course;

      const formattedWorkload = workload.toString() + " horas";
      const formattedInstructorName = teacher?.name + " " + teacher?.surname;

      level === "LOW"
        ? setValueLevelCourse("Iniciante")
        : level === "MEDIUM"
        ? setValueLevelCourse("Intermediário")
        : setValueLevelCourse("Avançado");

      // console.log(type);

      type === "COURSE"
        ? setValueTypeCourse("Curso")
        : type === "TRAINING"
        ? setValueTypeCourse("Treinamento")
        : type === "LECTURE"
        ? setValueTypeCourse("Palestra")
        : setValueTypeCourse("Workshop");

      // console.log(valueTypeCourse);

      setFormData({
        name,
        type,
        offeredBy: "Rethink Academy",
        description,
        workload: formattedWorkload,
        skills,
        learn: learning,
        level: level,
        avatar: teacher?.profile?.avatar || "",
        nameInstructor: formattedInstructorName,
        descriptionInstructor: teacher.profile?.bio || "",
      });
    }
  }
  // console.log(course);

  const handlerOnChange = (event: any, key: string) => {
    setFormData((prevValue) => {
      return { ...prevValue, [key]: event.target.value };
    });
  };

  useEffect(() => {
    !addCourse && loadCourse();
  }, []);

  useEffect(() => {
    setFormData((prevValue) => {
      return {
        ...prevValue,
        ["type"]:
          valueTypeCourse === "Curso"
            ? "COURSE"
            : valueTypeCourse === "Workshop"
            ? "WORKSHOP"
            : valueTypeCourse === "Treinamento"
            ? "TRAINING"
            : "LECTURE",
      };
    });
  }, [valueTypeCourse]);

  useEffect(() => {
    setFormData((prevValue) => {
      return {
        ...prevValue,
        ["level"]:
          valueLevelCourse === "Iniciante"
            ? "LOW"
            : valueLevelCourse === "Intermediário"
            ? "MEDIUM"
            : "HIGH",
      };
    });
  }, [valueLevelCourse]);

  const handleSubmit = async () => {
    const titlePopUp = addCourse
      ? "Parabéns! Seu curso foi adicionado com sucesso!"
      : "Alterações salvas com sucesso!";

    notify({
      title: titlePopUp,
      type: "success",
    });

    const workload = parseInt(formData.workload.replace(/[^0-9]/g, ""));

    if (addCourse) {
      const response = await api.post(`/course`, {
        name: `${formData.name}`,
        description: `${formData.description}`,
        level: `${formData.level}`,
        workload,
        learning: `${formData.learn}`,
        skills: `${formData.skills}`,
        trailId: `${trilhaId}`,
        teacherId: "04d9b089-f0b5-4e4b-bb40-7b2fb7c636e7",
      });
      console.log("ADICIONA");

      return response.data;
    } else {
      const response = await api.put(`/course/${course?.id}`, {
        name: `${formData.name}`,
        description: `${formData.description}`,
        level: `${formData.level}`,
        workload,
        learning: `${formData.learn}`,
        skills: `${formData.skills}`,
        trailId: `${trilhaId}`,
        teacherId: "04d9b089-f0b5-4e4b-bb40-7b2fb7c636e7",
      });

      return response.data;
    }
  };

  return (
    <TrailModal
      onClose={() => setCurrentStep(4)}
      iconClose={currentStep === 4 ? false : true}
      title={currentStep === 4 ? "Tem certeza que deseja cancelar?" : title}
      nameButtonRight={
        currentStep === 3 ? "Concluir" : currentStep === 4 ? "Não" : "Avançar"
      }
      nameButtonLeft={
        currentStep === 1 ? "Cancelar" : currentStep === 4 ? "Sim" : "Voltar"
      }
      onClickConfirm={
        currentStep === 4
          ? () => setCurrentStep(previousStep)
          : currentStep === 3
          ? () => {
              // addCourse ? handleSubmit() : handleSubmitUpdateCourse();
              handleSubmit();
              onClose();
            }
          : () => {
              setCurrentStep(currentStep + 1);
              setPreviousStep(currentStep + 1);
            }
      }
      onClickCancel={
        currentStep === 1
          ? () => {
              setCurrentStep(4);
              // console.log("cancelado");
            }
          : currentStep === 4
          ? () => onClose()
          : () => {
              setCurrentStep(currentStep - 1);
              setPreviousStep(currentStep - 1);
            }
      }
    >
      <div className={styles.body_modal}>
        {currentStep != 4 && (
          <p className={styles.currentStep}>Etapa {currentStep} de 3</p>
        )}

        {currentStep === 1 && (
          <>
            <div className={styles.field}>
              <p className={styles.title_field}>Nome do Curso</p>
              <InputText
                type={"block"}
                placeholder={"Exemplo: UX Writing"}
                hasIcon={false}
                nameInput={""}
                value={formData.name}
                onChange={(e) => handlerOnChange(e, "name")}
              />
            </div>
            <div className={`${styles.field} ${styles.field_2}`}>
              <div className={styles.field}>
                <p className={styles.title_field}>Tipo de Conteúdo:</p>
                <Dropdown
                  setValue={setValueTypeCourse}
                  value={valueTypeCourse}
                  options={["Curso", "Workshop", "Treinamento", "Palestra"]}
                  id={"1"}
                  width={264}
                />
              </div>
              <div className={styles.field}>
                <p className={styles.title_field}>Oferecido por:</p>
                <InputText
                  type={"block"}
                  placeholder={"Rethink Academy"}
                  hasIcon={false}
                  nameInput={""}
                  value={"Rethink Academy"}
                  onChange={(e) => handlerOnChange(e, "offeredBy")}
                />
              </div>
            </div>
            <div className={styles.field}>
              <p className={styles.title_field}>Descrição do Curso</p>
              <Textarea
                type="block"
                placeholder={
                  "Adicione aqui um texto que sintetize o que é e quais os objetivos de aprendizado deste Curso..."
                }
                value={formData.description}
                onChangetext={(e) => handlerOnChange(e, "description")}
              />
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div className={styles.field}>
              <p className={styles.title_field}>Nome do Instrutor</p>
              <InputText
                type={"block"}
                placeholder={"Exemplo: Débora Line"}
                hasIcon={false}
                nameInput={""}
                value={formData.nameInstructor}
                onChange={(e) => handlerOnChange(e, "nameInstructor")}
              />
            </div>
            <div className={styles.field}>
              <p className={styles.title_field}>{"Descrição do Instrutor"}</p>
              <InputText
                type={"block"}
                placeholder={
                  "Descreva brevemente a área de atuação do instrutor..."
                }
                hasIcon={false}
                nameInput={""}
                value={formData.descriptionInstructor}
                onChange={(e) => handlerOnChange(e, "descriptionInstructor")}
              />
            </div>
            <div className={styles.field}>
              <p className={styles.title_field}>Foto do Instrutor</p>
              <InputText
                type={"block"}
                placeholder={"https://Exemplo.com"}
                hasIcon={false}
                nameInput={""}
                value={formData.avatar}
                onChange={(e) => handlerOnChange(e, "avatar")}
              />
              <p className={styles.obs}>
                Adicione o link para utilizar a imagem que deseja utilizar
              </p>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <div className={`${styles.field} ${styles.field_2}`}>
              <div className={styles.field}>
                <p className={styles.title_field}>Nível do Curso</p>
                <Dropdown
                  setValue={setValueLevelCourse}
                  value={valueLevelCourse}
                  options={["Iniciante", "Intermediário", "Avançado"]}
                  id={"1"}
                  width={264}
                />
              </div>
              <div className={styles.field}>
                <p className={styles.title_field}>Carga Horária</p>
                <InputText
                  type={"block"}
                  placeholder={"Exemplo: 30 horas"}
                  hasIcon={false}
                  nameInput={""}
                  value={formData.workload}
                  onChange={(e) => handlerOnChange(e, "workload")}
                />
              </div>
            </div>
            <div className={styles.field}>
              <p className={styles.title_field}>
                O que o Rethinker irá aprender neste curso:
              </p>
              <Textarea
                type="block"
                placeholder={
                  "Exemplo: Descreva que metodologias ou conteúdos, de cunho teórico, serãm abordados e desenvolvidos neste curso."
                }
                value={formData.learn}
                onChangetext={(e) => handlerOnChange(e, "learn")}
              />
            </div>
            <div className={styles.field}>
              <p className={styles.title_field}>
                Habilidades que o Rethinker terá:
              </p>
              <Textarea
                type="block"
                placeholder={
                  "Exemplo: Descreva que conteúdos de teor prático, entregáveis ou skills que serão desenvolvidas no decorrer deste curso:"
                }
                value={formData.skills}
                onChangetext={(e) => handlerOnChange(e, "skills")}
              />
            </div>
          </>
        )}
        {currentStep === 4 && (
          <p className={styles.currentStep}>
            Ao confirmar essa ação, você não poderá recuperar esses dados.
          </p>
        )}
      </div>
    </TrailModal>
  );
};

export default CardAddCourse;
