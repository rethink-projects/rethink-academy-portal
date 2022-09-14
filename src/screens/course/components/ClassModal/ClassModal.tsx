import { useState } from "react";
import { ClassModalProps } from "../../../types/PropTypes";
import TrailModal from "../../../../components/TrailModal/TrailModal";
import ValidationModal from "../ValidationModal/ValidationModal";
import styles from "./ClassModal.module.css";
import { Validation } from "../../../types/CourseTypes";
import IconTrash from "@mui/icons-material/DeleteOutlined";

const ClassModal = ({
  onClose,
  modalType,
  validationType,
  className,
  embedLink,
  description,
  setLessonName,
  setEmbedLink,
  setDescription,
  onClickConfirm,
  setValidationType,
}: ClassModalProps) => {
  let title;
  const typeAdd = modalType === "ADD";
  const typeEdit = modalType === "EDIT";

  typeAdd ? (title = "Adicionar Aula") : (title = "Editar Aula");

  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);

  return (
    <TrailModal
      title={title}
      onClose={onClose}
      onClickConfirm={() =>
        typeAdd
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
        {typeEdit && (
          <div className={styles.trash}>
            <IconTrash
              sx={{ color: "var(--color-feedback-error)" }}
              onClick={() => (
                setValidationType("DELETE"), setValidationModalIsOpen(true)
              )}
            />
          </div>
        )}
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
