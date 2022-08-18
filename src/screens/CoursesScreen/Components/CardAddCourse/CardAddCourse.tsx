import React, { useState } from "react";
import styles from "./CardAddCourse.module.css";
import CloseIcon from "@mui/icons-material/Close";
import InputText from "../../../../components/InputText/InputText";
import SimpleButton from "../../../../components/SimpleButton/SimpleButton";
import Textarea from "../../../../components/Textarea/Textarea";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import ModalTrails from "../../../../components/ModalTrilhas/ModalTrilhas";
import { setTokenSourceMapRange } from "typescript";

type addCourseProps = {
  title: string;
};

const renderFirstField = (step: number) => {
  let title = "Nome do Curso";
  let placeholder = "Exemplo: UX Writing";
  let conteudo;
  let classname = styles.field;

  if (step === 2) {
    title = "Nome do Instrutor";
    placeholder = "Exemplo: Débora Line";
  }

  if (step != 3) {
    conteudo = (
      <>
        <p className={styles.title_field}>{title}</p>
        <InputText
          type={"block"}
          placeholder={placeholder}
          hasIcon={false}
          nameInput={""}
          value={""}
        />
      </>
    );
  } else {
    classname = `${styles.field} ${styles.field_2}`;
    conteudo = (
      <>
        <div className={styles.field}>
          <p className={styles.title_field}>Nível do Curso</p>
          <Dropdown
            setValue={function (value: string): void {
              throw new Error("Function not implemented.");
            }}
            options={[]}
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
            value={""}
          />
        </div>
      </>
    );
  }

  return <div className={classname}>{conteudo}</div>;
};

const renderSecondField = (step: number) => {
  let conteudo;
  let classname = styles.field;

  if (step === 1) {
    classname = `${styles.field} ${styles.field_2}`;
    conteudo = (
      <>
        <div className={styles.field}>
          <p className={styles.title_field}>Tipo de Conteúdo:</p>
          <Dropdown
            setValue={function (value: string): void {
              throw new Error("Function not implemented.");
            }}
            options={[]}
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
            value={""}
          />
        </div>
      </>
    );
  } else if (step === 2) {
    conteudo = (
      <>
        <p className={styles.title_field}>{"Descrição do Instrutor"}</p>
        <InputText
          type={"block"}
          placeholder={"Descreva brevemente a área de atuação do instrutor..."}
          hasIcon={false}
          nameInput={""}
          value={""}
        />
      </>
    );
  } else {
    conteudo = (
      <>
        <p className={styles.title_field}>
          O que o Rethinker irá aprender neste curso:
        </p>
        <Textarea
          type="block"
          placeholder={
            "Exemplo: Descreva que metodologias ou conteúdos, de cunho teórico, serãm abordados e desenvolvidos neste curso."
          }
        />
      </>
    );
  }

  return (
    <div className={classname}>
      {/* <div className={classname}>{conteudo}</div> */}
      {conteudo}
    </div>
  );
};

const renderThirdField = (step: number) => {
  let title = "Descrição do Curso";
  let placeholder =
    "Adicione aqui um texto que sintetize o que é e quais os objetivos de aprendizado deste Curso...";
  let conteudo;

  if (step === 2) {
    title = "Foto do Instrutor";
    placeholder = "https://Exemplo.com";
  } else if (step === 3) {
    title = "Habilidades que o Rethinker terá:";
    placeholder =
      "Exemplo: Descreva que conteúdos de teor prático, entregáveis ou skills que serão desenvolvidas no decorrer deste curso:";
  }

  conteudo = (
    <>
      <p className={styles.title_field}>{title}</p>
      {step != 2 && <Textarea type="block" placeholder={placeholder} />}
      {step === 2 && (
        <div className={styles.field}>
          <InputText
            type={"block"}
            placeholder={placeholder}
            hasIcon={false}
            nameInput={""}
            value={""}
          />
          <p className={styles.obs}>
            Adicione o link para utilizar a imagem que deseja utilizar
          </p>
        </div>
      )}
    </>
  );

  return <div className={styles.filed}>{conteudo}</div>;
};

const CardAddCourse = ({ title }: addCourseProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [step, setStep] = useState(1);

  return (
    <>
      {modalIsOpen && (
        <ModalTrails
          iconClose={<CloseIcon />}
          onClose={() => setModalIsOpen(false)}
          title={title}
          nameButtonGreen={step === 3 ? "Concluir" : "Avançar"}
          nameButtonBlack={step === 1 ? "Cancelar" : "Voltar"}
          onClickConfirm={() => step != 3 && setStep(step + 1)}
          onClickCancel={() => step != 1 && setStep(step - 1)}
        >
          <div className={styles.body_modal}>
            <p className={styles.step}>Etapa {step} de 3</p>
            {renderFirstField(step)}
            {renderSecondField(step)}
            {renderThirdField(step)}
          </div>
        </ModalTrails>
      )}
    </>
  );
};

export default CardAddCourse;
