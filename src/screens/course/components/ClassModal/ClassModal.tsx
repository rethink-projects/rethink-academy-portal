import { useState } from "react";
import { ClassModalProps } from "../../../types/PropTypes";
import TrailModal from "../../../../components/TrailModal/TrailModal";
import ValidationModal from "../ValidationModal/ValidationModal";
import styles from "./ClassModal.module.css";
import { Validation } from "../../../types/CourseTypes";

const ClassModal = ({
  onClose,
  type,
  className,
  embedLink,
  description,
  setLessonName,
  setEmbedLink,
  setDescription,
  onClickConfirm,
}: ClassModalProps) => {
  let title;

  type === "ADD" ? title = ("Adicionar Aula") : title = ("Editar Aula");

  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);
  const [validationType, setValidationType] = useState<Validation>(
    "SAVE"
  );

  return (
    <TrailModal
      title={title}
      onClose={onClose}
      onClickConfirm={() =>
        type === "ADD"
          ? (onClose(), onClickConfirm())
          : (setValidationType("SAVE"), setValidationModalIsOpen(true))
      }
      onClickCancel={() => onClose()}
    >
      {validationModalIsOpen && (
        <ValidationModal
          onClose={setValidationModalIsOpen}
          setParentIsOpen={onClose}
          type={validationType}
          onClickConfirm={onClickConfirm}
        />
      )}
      <form className={styles.container}>
        <label>Nome da Aula:</label>
        <input
          placeholder="Exemplo: Inovação e Design (07:50)"
          type="text"
          value={className}
          onChange={(e) => setLessonName(e.target.value)}
        />
        <label>Embed Link:</label>
        <input
          type="text"
          placeholder="https://Exemplo.com"
          value={embedLink}
          onChange={(e) => setEmbedLink(e.target.value)}
        />
        <label>Descrição da aula:</label>
        <textarea
          value={description}
          placeholder="Exemplo: Descreva que conteúdos de teor prático, entregáveis ou skills que serão desenvolvidas no decorrer deste curso:"
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
    </TrailModal>
  );
};

export default ClassModal;
