import styles from "./ClassModal.module.css";

const ClassModal = () => {
  const handleSubmit = () => {};
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <label>Nome da Aula:</label>
      <input placeholder="Exemplo: Inovação e Design (07:50)" type="text" />
      <label>Embed Link:</label>
      <input type="text" placeholder="https://Exemplo.com" />
      <label>Descrição da aula:</label>
      <textarea placeholder="Exemplo: Descreva que conteúdos de teor prático, entregáveis ou skills que serão desenvolvidas no decorrer deste curso:" />
    </form>
  );
};

export default ClassModal;
