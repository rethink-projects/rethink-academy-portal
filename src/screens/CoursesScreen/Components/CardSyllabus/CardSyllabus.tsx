import EmptyModal from "../../../../components/EmptyModal/EmptyModal";

type TypeCardSyllabus = {
  onClose: VoidFunction;
};

const CardSyllabus = ({ onClose }: TypeCardSyllabus) => {
  return (
    <EmptyModal onClose={onClose}>
      <div>SEU CONTEÚDO AQUI</div>
    </EmptyModal>
  );
};

export default CardSyllabus;
