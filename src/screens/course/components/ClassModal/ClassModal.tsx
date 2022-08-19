import TrailModal from "../../../../components/TrailModal/TrailModal";
import styles from "./ClassModal.module.css";

type ClassModalProps = {
  type: "add" | "edit";
  onClose: VoidFunction;
  onClickConfirm?: VoidFunction;
  onClickCancel?: VoidFunction;
  oneButton?: boolean;
  nameButtonRight?: string;
  nameButtonLeft?: string;
  className: string;
  embedLink: string;
  description: string;
  setClassName: (value: string) => void;
  setEmbedLink: (value: string) => void;
  setDescription: (value: string) => void;
};
const ClassModal = ({
  onClose,
  type,
  className,
  embedLink,
  description,
  setClassName,
  setEmbedLink,
  setDescription,
}: ClassModalProps) => {
  const handleSubmit = () => {};
  let title;
  if (type === "add") {
    title = "Adicionar Aula";
  } else {
    title = "Editar Aula";
  }
  return (
    <TrailModal
      title={title}
      onClose={onClose}
      onClickConfirm={() => ""}
      onClickCancel={() => ""}
    >
      <form className={styles.container}>
        <label>Nome da Aula:</label>
        <input
          placeholder="Exemplo: Inovação e Design (07:50)"
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <label>Embed Link:</label>
        <input
          type="text"
          placeholder="https://Exemplo.com"
          value={embedLink}
          onChange={(e) => setEmbedLink(e.target.value)}
        />
        <label>Descrição da aula:</label>
        <textarea
          value={description}
          placeholder="Exemplo: Descreva que conteúdos de teor prático, entregáveis ou skills que serão desenvolvidas no decorrer deste curso:"
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
    </TrailModal>
  );
};

export default ClassModal;
