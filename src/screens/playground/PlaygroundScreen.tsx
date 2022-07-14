import styles from "./Playground.module.css";
import Radio from "../../components/Radio/Radio";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>Insira abaixo o seu componente:</p>
      </div>
      <div className={styles.sub_content}>
        <Radio
          data={[
            { title: "Primeiro" },
            { title: "Segundo" },
            { title: "Terceiro", disabled: true },
            { title: "Quarto", disabled: true },
            { title: "Quinto", disabled: true },
          ]}
          radioFor="chose"
          checked="Quinto"
        />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
