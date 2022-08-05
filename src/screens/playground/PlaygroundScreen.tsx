import styles from "./Playground.module.css";
import TrilhasComponent from "../home/components/trilhas/TrilhasComponent";
import CardMetas from "../../components/CardMetas/CardMetas";
function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
        <h2>Playground de Componentes</h2>
        <p>Insira abaixo o seu componente:</p>

        <div className={styles.playground_container_inner}>
          <CardMetas
            goalsData={[
              { title: "meta 1", month: "Janeiro", isDone: true },
              { title: "meta 2", month: "Janeiro", isDone: false },
              { title: "meta 3", month: "Janeiro", isDone: true },
              { title: "meta 4", month: "Janeiro", isDone: false },
              { title: "meta 5", month: "Janeiro", isDone: true },
              { title: "meta 6", month: "Janeiro", isDone: false },
              { title: "meta 7", month: "Janeiro", isDone: false },
              { title: "meta 8", month: "Janeiro", isDone: true },
              { title: "meta 9", month: "Janeiro", isDone: false },
              { title: "meta 10", month: "Janeiro", isDone: false },
              { title: "meta 11", month: "Janeiro", isDone: true },
              { title: "mes errado", month: "Dezembro", isDone: true },
              {
                title: "mes certo, escrita diferente ",
                month: "janeiro",
                isDone: false,
              },
            ]}
            month="Janeiro"
          />
        </div>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
