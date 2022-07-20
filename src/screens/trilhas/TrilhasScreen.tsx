import styles from "./TrilhasScreen.module.css";

const TrilhasScreen = () => {
  return (
    <div className={styles.tela_supra}>
        <div className={styles.barra_lateral}></div>
      <div className={styles.trilhas_container}>
        <div className={styles.text_container}>
          <div className={styles.title}>Trilhas</div>
          <div className={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </div>
          <div className={styles.cards_container}>
            <div className={styles.teste}>CARD 1</div>
            <div className={styles.teste}>CARD 2</div>
            <div className={styles.teste}>CARD 3</div>
            <div className={styles.teste}>CARD 4</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrilhasScreen;
