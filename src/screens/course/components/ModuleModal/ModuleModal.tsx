import axios from "axios";
import { useState } from "react";
import TrailModal from "../../../../components/TrailModal/TrailModal";
import ValidationModal from "../ValidationModal/ValidationModal";
import styles from "./ModuleModal.module.css";
type TypeModule = {
  id: string;
  name: string;
  lessons?: TypeLesson[];
  blocked?: boolean;
};
type TypeLesson = {
  id: string;
  name: string;
  embedUrl: string;
  order: number;
  description: string;
  moduleId: string;
};

type ModuleModalProps = {
  type: "add" | "edit" | "delete";
  onClose: VoidFunction;
  onClickConfirm?: VoidFunction;
  onClickCancel?: VoidFunction;
  oneButton?: boolean;
  module?: TypeModule;
  moduleName?: string;
  setModuleName: (value: string) => void;
  nameButtonRight?: string;
  nameButtonLeft?: string;
  modules: TypeModule[];
  courseId?: string;
};
const ModuleModal = ({
  type,
  onClose,
  module,
  moduleName,
  setModuleName,
  courseId,
  modules,
}: ModuleModalProps) => {
  const handleSubmit = () => {};
  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);
  const [validationType, setValidationType] = useState<"save" | "delete">(
    "delete"
  );

  let title: string, description: string;

  if (type === "add") {
    title = "Adicionar Módulo";
    description = "Descreva aqui o nome do módulo de aulas.";
  } else if (type === "delete") {
    title = "Tem certeza que deseja excluir";
    description =
      "Ao confirmar essa ação você não poderá recuperar esses dados.";
  } else if (type === "edit") {
    title = "Editar Módulo";
    description = "Edite aqui o nome do módulo.";
  }

  const setValidationModal = () => {
    if (type === "edit") {
      setValidationType("save");
      setValidationModalIsOpen(true);
    } else {
      onConfirm();
      onClose();
    }
  };

  const onConfirm = () => {
    if (type === "add") {
      addModuleReq();
      const moduleTemp: TypeModule = {
        id: "aleatório" + Math.random(),
        name: moduleName!,
        blocked: true,
      };
      modules.push(moduleTemp!);
    } else if (type === "edit") {
      editModuleReq();
      module!.name = moduleName!;
    } else if (type === "delete") {
      deleteModuleReq();
      modules.splice(modules.indexOf(module!), 1);
    }
  };

  const addModuleReq = async () => {
    await axios.post("http://localhost:4000/api/module", {
      name: moduleName,
      courseId,
    });
  };

  const editModuleReq = async () => {
    await axios.put("http://localhost:4000/api/module/" + module!.id, {
      name: moduleName,
    });
  };

  const deleteModuleReq = async () => {
    await axios.delete("http://localhost:4000/api/module/" + module!.id);
  };
  // console.log("moduleName na tela ModuleModal: " + moduleName);

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
