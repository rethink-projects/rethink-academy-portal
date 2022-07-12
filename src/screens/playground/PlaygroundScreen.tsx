import Button from "../../components/Button/Button";
import DropDown from "../../components/Dropdown/Dropdown";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  const dropdownContent = ["List Item1", "List Item2"];
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>insira abaixo o seu componente:</p>
      </div>
      <div className={styles.sub_content}>
        <span>Componente DropDown</span>
        <div className={styles.dropdowns}>
          <DropDown chave={1} content={dropdownContent} size="large" />
          <DropDown chave={2} content={dropdownContent} />
          <DropDown chave={3} content={dropdownContent} size="small" />
          <DropDown chave={4} content={dropdownContent} size="micro" />
        </div>
      </div>
      <div className={styles.sub_content}>
        <span>Componente Button</span>
        <Button />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
