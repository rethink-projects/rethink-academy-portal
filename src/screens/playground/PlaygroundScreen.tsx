import styles from "./Playground.module.css";
import Label from "../../components/Label/Label";
import IconInfo from "@mui/icons-material/InfoOutlined";

// Simple Button
import SimpleButton from "../../components/SimpleButton/SimpleButton";
import CardTrilhas from "../../components/CardTrilhas/CardTrilhas";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>Insira abaixo o seu componente:</p>
      </div>
      <div>
        <SimpleButton
          type="secondary"
          size="big"
          text="Simple Button"
          onClick={() => { }}
        />
      </div>
      <div className={styles.sub_content}>
        <span>Componente Label</span>
        <Label color="primary" size="large" iconPosition="both" text="label">
          <IconInfo />
        </Label>
        <Label color="secondary" size="large" iconPosition="right" text="label">
          <IconInfo />
        </Label>
        <Label color="accent" size="large" iconPosition="none" text="label">
          <IconInfo />
        </Label>
        <Label color="danger" size="default" iconPosition="left" text="label">
          <IconInfo />
        </Label>
        <Label color="warning" size="small" iconPosition="right" text="label">
          <IconInfo />
        </Label>
        <Label color="success" size="micro" iconPosition="left" text="label">
          <IconInfo />
        </Label>
        <CardTrilhas title="Title" description="Description"></CardTrilhas>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
