import { useState } from "react";

// API
import { api } from "../../../../services/api";

// TYPES
import { ModuleModalProps } from "../../../types/PropTypes";
import { Validation } from "../../../types/CourseTypes";

// STYLES
import styles from "./ModuleModal.module.css";

// COMPONENTS
import TrailModal from "../../../../components/TrailModal/TrailModal";
import ValidationModal from "../ValidationModal/ValidationModal";

const ModuleModal = ({
  type,
  onClose,
  module,
  moduleName,
  setModuleName,
  courseId,
  modules,
  reRender,
}: ModuleModalProps) => {
  const handleSubmit = () => {};
  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);
  const [validationType, setValidationType] = useState<Validation>("DELETE");

  let title: string, description: string;

  if (type === "ADD") {
    title = "Adicionar Módulo";
    description = "Descreva aqui o nome do módulo de aulas.";
  } else if (type === "DELETE") {
    title = "Tem certeza que deseja excluir";
    description =
      "Ao confirmar essa ação você não poderá recuperar esses dados.";
  } else if (type === "EDIT") {
    title = "Editar Módulo";
    description = "Edite aqui o nome do módulo.";
  }

  const setValidationModal = () => {
    if (type === "EDIT") {
      setValidationType("SAVE");
      setValidationModalIsOpen(true);
    } else {
      onConfirm();
      onClose();
    }
  };

  const onConfirm = () => {
    if (type === "ADD") {
      addModuleReq();
    } else if (type === "EDIT") {
      editModuleReq();
      module!.name = moduleName!;
    } else if (type === "DELETE") {
      deleteModuleReq();
      modules.splice(modules.indexOf(module!), 1);
    }
  };

  const addModuleReq = async () => {
    await api
      .post("/module", {
        name: moduleName,
        courseId,
      })
      .then((response) => {
        reRender();
      });
  };

  const editModuleReq = async () => {
    await api.put("/module/" + module!.id, {
      name: moduleName,
    });
  };

  const deleteModuleReq = async () => {
    await api.delete("/module/" + module!.id);
  };

  return (
    <TrailModal
      title={title!}
      onClose={onClose}
      onClickConfirm={setValidationModal}
      onClickCancel={onClose}
    >
      {validationModalIsOpen && (
        <ValidationModal
          onClose={setValidationModalIsOpen}
          setParentIsOpen={onClose}
          type={validationType}
          onClickConfirm={onConfirm}
        />
      )}
      <span className={styles.aux_text}>{description!}</span>
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
