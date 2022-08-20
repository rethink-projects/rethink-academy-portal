import { useState } from "react";
import TrailModal from "../../../../components/TrailModal/TrailModal";
import ValidationModal from "../ValidationModal/ValidationModal";
import styles from "./ClassModal.module.css";

type ClassModalProps = {
  type: "add" | "edit";
  onClose: VoidFunction;
  onClickConfirm?: VoidFunction;
  onClickCancel?: VoidFunction;
  oneButton?: boolean;
  nameButtonRight?: string;
  nameButtonLeft?: string;
  className: string;
  embedLink: string;
  description: string;
  setLessonName: (value: string) => void;
  setEmbedLink: (value: string) => void;
  setDescription: (value: string) => void;
  visualNameChange: VoidFunction;
};
const ClassModal = ({
  onClose,
  type,
  className,
  embedLink,
  description,
  setLessonName,
  setEmbedLink,
  setDescription,
  visualNameChange,
}: ClassModalProps) => {
  const handleSubmit = () => {};
  let title;
  if (type === "add") {
    title = "Adicionar Aula";
  } else {
    title = "Editar Aula";
  }
  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);
  const [validationType, setValidationType] = useState<
    "save" | "cancel" | "delete"
  >("save");
  return (
    <TrailModal
      title={title}
      onClose={onClose}
      onClickConfirm={() =>
        type === "edit"
          ? (setValidationModalIsOpen(true), setValidationType("save"))
          : onClose()
      }
      onClickCancel={() => (onClose(), visualNameChange())}
    >
      {validationModalIsOpen && (
        <ValidationModal
          onClose={setValidationModalIsOpen}
          setParentIsOpen={onClose}
          type={validationType}
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
