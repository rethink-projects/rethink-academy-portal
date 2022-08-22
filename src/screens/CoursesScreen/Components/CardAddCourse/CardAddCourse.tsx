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
  const [titleteste, setTitle] = useState("titleteste");

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
    skils: "",
  });

  console.log("anterior: " + previousStep + "\natual: " + currentStep);

  // console.log(
  //   "nome do curso: " +
  //     formData.name +
  //     "\noferecido por: " +
  //     formData.offeredBy +
  //     "\nnome do instrutor: " +
  //     formData.nameInstructor +
  //     "\ndescrição do instrutor: " +
  //     formData.descriptionInstructor +
  //     "\nfoto do intrutor: " +
  //     formData.avatar +
  //     "\ncarga horaria: " +
  //     formData.workload
  // );

  return (
    <TrailModal
      onClose={() => setCurrentStep(4)}
      title={currentStep === 4 ? "Tem certeza que deseja cancelar?" : title}
      nameButtonRight={
        currentStep === 3 ? "Concluir" : currentStep === 4 ? "Não" : "Avançar"
      }
      nameButtonLeft={
        currentStep === 1 ? "Cancelar" : currentStep === 4 ? "Sim" : "Voltar"
      }
      onClickConfirm={
        // currentStep === 3
        //   ? () => {
        //       onClose();
        //       console.log("concluido");
        //     }
        //   : () => setCurrentStep(currentStep + 1)

        // currentStep === 3
        //   ? () => {
        //       onClose();
        //       console.log("concluido");
        //     }
        //   : currentStep === 4
        //   ? () => setCurrentStep(previousStep)
        //   : () => {
        //       setCurrentStep(currentStep + 1);
        //       setPreviousStep(currentStep);
        //     }
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
        {/* Primeira linha */}
        {currentStep === 3 ? (
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
                onChange={(e) =>
                  setFormData((prevValue) => {
                    return { ...prevValue, workload: e.target.value };
                  })
                }
              />
            </div>
          </div>
        ) : currentStep != 4 ? (
          <div className={styles.field}>
            <p className={styles.title_field}>
              {currentStep === 1 ? "Nome do Curso" : "Nome do Instrutor"}
            </p>
            <InputText
              type={"block"}
              placeholder={
                currentStep === 1
                  ? "Exemplo: UX Writing"
                  : "Exemplo: Débora Line"
              }
              hasIcon={false}
              nameInput={""}
              value={
                currentStep === 1 ? formData.name : formData.nameInstructor
              }
              onChange={
                currentStep === 1
                  ? (e) =>
                      setFormData((prevValue) => {
                        return { ...prevValue, name: e.target.value };
                      })
                  : (e) =>
                      setFormData((prevValue) => {
                        return { ...prevValue, nameInstructor: e.target.value };
                      })
              }
            />
          </div>
        ) : (
          ""
        )}
        {/* Segunda linha */}
        {currentStep === 1 ? (
          // primeiro modal
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
                onChange={(e) =>
                  setFormData((prevValue) => {
                    return { ...prevValue, offeredBy: e.target.value };
                  })
                }
              />
            </div>
          </div>
        ) : currentStep === 2 ? (
          // segundo modal
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
              onChange={(e) =>
                setFormData((prevValue) => {
                  return {
                    ...prevValue,
                    descriptionInstructor: e.target.value,
                  };
                })
              }
            />
          </div>
        ) : currentStep != 4 ? (
          //terceiro modal
          <div className={styles.field}>
            {" "}
            <p className={styles.title_field}>
              O que o Rethinker irá aprender neste curso:
            </p>
            <Textarea
              type="block"
              placeholder={
                "Exemplo: Descreva que metodologias ou conteúdos, de cunho teórico, serãm abordados e desenvolvidos neste curso."
              }
            />
          </div>
        ) : (
          ""
        )}
        {/* Terceira linha */}
        <div className={styles.field}>
          <p className={currentStep != 4 ? styles.title_field : styles.obs}>
            {currentStep === 1
              ? "Descrição do Curso"
              : currentStep === 2
              ? "Foto do Instrutor"
              : currentStep != 4
              ? "Habilidades que o Rethinker terá:"
              : "Ao confirmar essa ação, você não poderá recuperar esses dados."}
          </p>
          {currentStep === 2 ? (
            // modal 2
            <>
              <InputText
                type={"block"}
                placeholder={"https://Exemplo.com"}
                hasIcon={false}
                nameInput={""}
                value={formData.avatar}
                onChange={(e) =>
                  setFormData((prevValue) => {
                    return { ...prevValue, avatar: e.target.value };
                  })
                }
              />
              <p className={styles.obs}>
                Adicione o link para utilizar a imagem que deseja utilizar
              </p>
            </>
          ) : currentStep != 4 ? (
            <Textarea
              type="block"
              placeholder={
                currentStep === 1
                  ? "Adicione aqui um texto que sintetize o que é e quais os objetivos de aprendizado deste Curso..."
                  : "Exemplo: Descreva que conteúdos de teor prático, entregáveis ou skills que serão desenvolvidas no decorrer deste curso:"
              }
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </TrailModal>
  );
};

export default CardAddCourse;
