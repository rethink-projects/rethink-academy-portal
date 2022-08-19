import TrailModal from "../../../../components/TrailModal/TrailModal";

type ValidationModalProps = {
  type: "save" | "cancel" | "delete";
  onClose: (value: boolean) => void;
  setParentIsOpen?: (value: boolean) => void;
};
const ValidationModal = ({
  type,
  onClose,
  setParentIsOpen = () => "",
}: ValidationModalProps) => {
  let title: string,
    text: string,
    leftButtonText: string = "Sim",
    rightButtonText: string = "Não",
    parentIsOpen: boolean = false;
  switch (type) {
    case "save":
      title = "Deseja salvar as alterações?";
      text =
        "Ao confirmar essa ação, você não poderá recuperar dados anteriores.";
      rightButtonText = "Salvar";
      leftButtonText = "Não salvar";
      break;
    case "cancel":
      title = "Tem certeza que deseja cancelar?";
      text = "Ao confirmar essa ação, você não poderá recuperar esses dados.";
      parentIsOpen = !parentIsOpen;
      break;
    case "delete":
      title = "Tem certeza que deseja excluir?";
      text = "Ao confirmar essa ação, você não poderá recuperar esses dados.";
      break;
  }
  return (
    <TrailModal
      title={title}
      onClose={() => onClose(false)}
      onClickCancel={() => onClose(false)}
      onClickConfirm={() => (onClose(false), setParentIsOpen(parentIsOpen))}
      nameButtonLeft={leftButtonText}
      nameButtonRight={rightButtonText}
    >
      <span>{text}</span>
    </TrailModal>
  );
};

export default ValidationModal;
