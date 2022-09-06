import React from "react";
import styles from "./Teste_video.module.css";
import { useState } from "react";

const Teste_video = () => {
  const [index, setIdex] = useState(1);
  const [link, setLink] = useState(
    "https://www.loom.com/embed/880284f2e0354526a6cc9da4812d5e11"
  );

  const playVideo = () => {
    console.log("clicou no vermelho");
    const video = document.getElementsByClassName("iframe_container");
    setIdex(-1);
    setLink(link + "?autoplay=1");
    // console.log(video);
  };

  // $("#image_id").click(function () {
  //   $(".frameVideo").attr(
  //     "src",
  //     $(".frameVideo").attr("src") + "?autoplay=1"
  //   );
  // });

  return (
    <div>
      Teste_video
      <script
        type="text/javascript"
        src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"
      ></script>
      <div className={styles.container_geral}>
        <div
          onClick={() => playVideo()}
          className={styles.div_container}
          style={{ zIndex: index }}
        >
          <p>qualquer coisas</p>
        </div>
        <iframe
          className={styles.iframe_container}
          src={link}
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default Teste_video;
