import EmptyModal from "../../../../components/EmptyModal/EmptyModal";

type TypeCardSyllabus = {
  onClose: VoidFunction;
};

const CardSyllabus = ({ onClose }: TypeCardSyllabus) => {
  return (
    <EmptyModal onClose={onClose} id={""}>
      <div>SEU CONTEÚDO AQUI</div>
    </EmptyModal>
  );
};

export default CardSyllabus;
