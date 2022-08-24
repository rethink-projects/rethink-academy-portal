import styles from "./CardAddCourse.module.css";
import InputText from "../../../../components/InputText/InputText";
import Textarea from "../../../../components/Textarea/Textarea";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import TrailModal from "../../../../components/TrailModal/TrailModal";

type addCourseProps = {
  title: string;
  onClose: VoidFunction;
};

const CardAddCourse = ({ title, onClose = () => {} }: addCourseProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [previousStep, setPreviousStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    offeredBy: "",
    description: "",
    nameInstructor: "",
    descriptionInstructor: "",
    avatar: "",
    level: "",
    workload: "",
    learn: "",
    skills: "",
  });

  const handlerOnChange = (event: any, key: string) => {
    setFormData((prevValue) => {
      return { ...prevValue, [key]: event.target.value };
    });
  };

  // console.log("anterior: " + previousStep + "\natual: " + currentStep);

  // console.log({ nomeDoCurso: formData.name, oferecidoPor: formData.offeredBy, nomeDoInstrutor: formData.nameInstructor });
  // console.log(formData);

  console.log(
    "nome do curso: " +
      formData.name +
      "\noferecido por: " +
      formData.offeredBy +
      "\ndescrição do curso: " +
      formData.description +
      "\nnome do instrutor: " +
      formData.nameInstructor +
      "\ndescrição do instrutor: " +
      formData.descriptionInstructor +
      "\nfoto do intrutor: " +
      formData.avatar +
      "\ncarga horaria: " +
      formData.workload +
      "\nOque vc irá aprender: " +
      formData.learn +
      "\nHabilidades: " +
      formData.skills
  );

  return (
    <TrailModal
      // oneButton={true}
      onClose={() => setCurrentStep(4)}
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
              onClose();
              console.log("concluido");
            }
          : () => {
              setCurrentStep(currentStep + 1);
              setPreviousStep(currentStep + 1);
            }
      }
      onClickCancel={
        currentStep === 1
          ? () => {
              // onClose();
              setCurrentStep(4);
              console.log("cancelado");
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
                  setValue={function (value: string): void {
                    throw new Error("Function not implemented.");
                  }}
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
                  value={formData.offeredBy}
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
                  setValue={function (value: string): void {
                    throw new Error("Function not implemented.");
                  }}
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
