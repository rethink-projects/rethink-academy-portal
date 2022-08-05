import CardInfoCurso from "../course/components/card/CardInfoCurso";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.playground_container_inner}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
        <CardInfoCurso
          nivel="Avançado"
          module_class={{ module: 2, class: 4 }}
          author="Marcela Monteiro"
          authorDescription="Diretora de arte e designer gráfica"
          learn={["blabl", "biruleivbe", "asdas", "gabrieu"]}
          skills={["blabl", "biruleivbe", "asdas", "gabrieu"]}
          // autor="ANa"
          // description="Diretora dos tops"
        />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
