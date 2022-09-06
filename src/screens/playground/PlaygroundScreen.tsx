import ReactPlayer from "react-player";
import styles from "./Playground.module.css";
import * as loomembed from "@loomhq/loom-embed";
import axios from "axios";
import { width } from "@mui/system";
import Teste_video from "./teste_video/Teste_video";
import VideoLib from "./TesteLib/VideoLib";

// Render a YouTube video player
// axios.get(https://www.loom.com/share/ + "id do loom")

function PlaygroundScreen() {
  // const video = document.querySelector("divqualquer");
  // video?.addEventListener("click", () => console.log("teste"));

  // const numsei = axios.get(
  //   "https://www.loom.com/share/84344412e3fb4dd3b6d56cd0a444a968"
  // );
  // console.log(numsei);

  // const link = "https://www.loom.com/share/84344412e3fb4dd3b6d56cd0a444a968";

  ////////////////////////////////////////////// DURAÇÃO

  // loomembed
  //   .oembed("https://www.loom.com/share/84344412e3fb4dd3b6d56cd0a444a968")
  //   .then((Response) => console.log(Response));

  return (
    <div className={styles.playground_container}>
      <div id="YOUR_CONTAINER_ID" className={styles.main_content}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
        {/* <Teste_video /> */}
        <VideoLib />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
