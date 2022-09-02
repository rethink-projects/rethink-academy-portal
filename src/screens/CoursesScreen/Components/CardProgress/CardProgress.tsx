import EmptyModal from "../../../../components/EmptyModal/EmptyModal";

type TypeCardProgress = {
  onClose: VoidFunction;
};

const CardProgress = ({ onClose }: TypeCardProgress) => {
  return (
    <EmptyModal onClose={onClose} >
      <div>SEU CONTEÚDO AQUI</div>
    </EmptyModal>
  );
};

export default CardProgress;
