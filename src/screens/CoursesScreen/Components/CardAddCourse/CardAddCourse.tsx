import React from "react";
import styles from "./CardAddCourse.module.css";
import CloseIcon from "@mui/icons-material/Close";
import InputText from "../../../../components/InputText/InputText";
import SimpleButton from "../../../../components/SimpleButton/SimpleButton";
import Textarea from "../../../../components/Textarea/Textarea";
import Dropdown from "../../../../components/Dropdown/Dropdown";

type addCourseProps = {
  title: string;
  step: number;
};

const CardAddCourse = () => {
  return (
    <div className={styles.container_card}>
      <div className={styles.title}>
        <h1>Adicionar um curso</h1>
        <CloseIcon />
      </div>
      <div className={styles.body_modal}>
        <p className={styles.step}>Etapa 1 de 3</p>
        <div className={styles.field}>
          <p className={styles.title_field}>Nome do curso</p>
          <InputText
            type={"default"}
            placeholder={"Exemplo: UX Writing"}
            hasIcon={false}
            nameInput={""}
            value={""}
          />
        </div>
        <div className={`${styles.field} ${styles.field_2}`}>
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
              type={"default"}
              placeholder={"Rethink Academy"}
              hasIcon={false}
              nameInput={""}
              value={""}
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
          />
        </div>
        <div className={styles.buttons}>
          <SimpleButton
            type="secondary"
            text={"Cancelar"}
            onClick={() => {
              console.log("NADA");
            }}
            size="block"
          />
          <SimpleButton
            text={"Avançar"}
            onClick={() => {
              console.log("NADA");
            }}
            size="block"
          />
        </div>
      </div>
    </div>
  );
};

export default CardAddCourse;

// oque falta?
/**
 * InputText com largura correta
 * textarea com largura correta
 * textare com altura correta
 * simpleButton com largura correta
 */
