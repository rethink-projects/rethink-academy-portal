import { useState } from "react";
import TrailModal from "../../../../components/TrailModal/TrailModal";
import ValidationModal from "../ValidationModal/ValidationModal";
import styles from "./ModuleModal.module.css";

type ModuleModalProps = {
  type: "add" | "edit";
  onClose: VoidFunction;
  onClickConfirm?: VoidFunction;
  onClickCancel?: VoidFunction;
  oneButton?: boolean;
  moduleName: string;
  setModuleName: (value: string) => void;
  nameButtonRight?: string;
  nameButtonLeft?: string;
};
const ModuleModal = ({
  type,
  onClose,
  moduleName,
  setModuleName,
}: ModuleModalProps) => {
  const handleSubmit = () => {};
  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);
  const [validationType, setValidationType] = useState<
    "save" | "cancel" | "delete"
  >("save");
  let title;
  switch (type) {
    case "add":
      title = "Adicionar Módulo";
      break;
    default:
      title = "Editar Módulo";
  }

  return (
    <TrailModal
      title={title}
      onClose={onClose}
      onClickConfirm={() =>
        type === "edit"
          ? (setValidationModalIsOpen(true), setValidationType("save"))
          : onClose()
      }
      onClickCancel={onClose}
    >
      {validationModalIsOpen && (
        <ValidationModal
          onClose={setValidationModalIsOpen}
          setParentIsOpen={onClose}
          type={validationType}
        />
      )}
      <span className={styles.aux_text}>
        {type === "add"
          ? "Descreva aqui o nome do módulo de aulas."
          : "Edite aqui o nome do módulo."}
      </span>
      <form className={styles.container} onSubmit={handleSubmit}>
        <label>Nome do Módulo:</label>
        <input
          placeholder="Exemplo: Empreendedorismo e Design"
          type="text"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />
      </form>
    </TrailModal>
  );
};

export default ModuleModal;
