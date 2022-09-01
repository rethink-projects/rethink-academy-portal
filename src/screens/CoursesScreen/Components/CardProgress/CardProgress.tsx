import EmptyModal from "../../../../components/EmptyModal/EmptyModal";

type TypeCardProgress = {
  onClose: VoidFunction;
};

const CardProgress = ({ onClose }: TypeCardProgress) => {
  return (
    <EmptyModal onClose={onClose} id={""}>
      <div>SEU CONTEÚDO AQUI</div>
    </EmptyModal>
  );
};

export default CardProgress;
