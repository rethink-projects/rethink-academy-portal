import TrailModal from "../../../../components/TrailModal/TrailModal";
import { ValidationModalProps } from "../../../types/PropTypes";

const ValidationModal = ({
  type,
  onClose,
  onClickConfirm,
  setParentIsOpen = () => "",
}: ValidationModalProps) => {
  let title: string,
    text: string,
    leftButtonText: string = "Sim",
    rightButtonText: string = "Não",
    parentIsOpen: boolean = false;

  const onConfirm = () => {
    setParentIsOpen(parentIsOpen);
    onClickConfirm();
    onClose(false);
  };

  const typeSave = type === "SAVE";

  if (typeSave) {
    title = "Deseja salvar as alterações?";
    text =
      "Ao confirmar essa ação, você não poderá recuperar dados anteriores.";
    leftButtonText = "Não salvar";
    rightButtonText = "Salvar";
  } else {
    title = "Tem certeza que deseja excluir?";
    text = "Ao confirmar essa ação, você não poderá recuperar esses dados.";
  }

  return (
    <TrailModal
      title={title}
      onClose={() => onClose(false)}
      onClickCancel={typeSave ? () => onClose(false) : onConfirm}
      onClickConfirm={typeSave ? onConfirm : () => onClose(false)}
      nameButtonLeft={leftButtonText}
      nameButtonRight={rightButtonText}
    >
      <span>{text}</span>
    </TrailModal>
  );
};

export default ValidationModal;
