import { Modal, Module, Validation } from "./CourseTypes";

interface AccordionProps {
  width?: number;
  module: Module;
  ambassador?: boolean;
  blocked?: boolean;
  position: number;
  completed?: boolean;
  watched: string[];
  openModuleModal: (open: boolean) => void;
  setModuleModalType: (value: Modal) => void;
  setModuleName: (moduleName: string) => void;
  setModule: (module: Module) => void;
  reRender: VoidFunction;
}

interface ModuleModalProps {
  type: Modal;
  onClose: VoidFunction;
  onClickConfirm?: VoidFunction;
  onClickCancel?: VoidFunction;
  oneButton?: boolean;
  module?: Module;
  moduleName?: string;
  setModuleName: (value: string) => void;
  nameButtonRight?: string;
  nameButtonLeft?: string;
  modules: Module[];
  courseId?: string;
  reRender: VoidFunction;
}

interface ValidationModalProps {
  type: Validation;
  onClose: (value: boolean) => void;
  onClickConfirm: VoidFunction;
  setParentIsOpen?: (value: boolean) => void;
}

interface ClassModalProps {
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
  modalType: "ADD" | "EDIT";
  validationType: Validation;
  setValidationType: (value: Validation) => void;
}
export type {
  AccordionProps,
  ModuleModalProps,
  ValidationModalProps,
  ClassModalProps,
};
