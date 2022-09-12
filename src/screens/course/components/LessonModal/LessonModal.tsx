import { useState } from "react";
import TrailModal from "../../../../components/TrailModal/TrailModal";
import ValidationModal from "../ValidationModal/ValidationModal";
import styles from "./LessonModal.module.css";

type LessonModalProps = {
  type: "add" | "edit";
  onClose: VoidFunction;
  oneButton?: boolean;
  nameButtonRight?: string;
  nameButtonLeft?: string;
  className: string;
  embedLink: string;
  description: string;
  setLessonName: (value: string) => void;
  setEmbedLink: (value: string) => void;
  setDescription: (value: string) => void;
  onClickConfirm: VoidFunction;
};
const LessonModal = ({
  onClose,
  type,
  className,
  embedLink,
  description,
  setLessonName,
  setEmbedLink,
  setDescription,
  onClickConfirm,
}: LessonModalProps) => {
  let title;

  if (type === "add") {
    title = "Adicionar Aula";
  } else {
    title = "Editar Aula";
  }

  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);
  const [validationType, setValidationType] = useState<"save" | "delete">(
    "save"
  );

  return (
    <TrailModal
      title={title}
      onClose={onClose}
      onClickConfirm={() =>
        type === "add"
          ? (onClose(), onClickConfirm())
          : (setValidationType("save"), setValidationModalIsOpen(true))
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

export default LessonModal;
