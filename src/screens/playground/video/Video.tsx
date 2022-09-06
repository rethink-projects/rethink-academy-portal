import React, { useEffect, useState } from "react";
import styles from "./Video.module.css";

var ik_player;

// useEffect(function onYouTubeIframeAPIReady() {
//   ik_player = new YT.Player("ik_player_iframe");
//   ik_player.addEventListener("onReady", onYouTubePlayerReady);
//   ik_player.addEventListener("onStateChange", onYouTubePlayerStateChange);
// }, []);
function onYouTubePlayerReady(event: any) {
  //   console.log(event);
  //   var timeVideo = event.target.getDuration();
  //   console.log(time);
  console.log("O vídeo está pronto para ser reproduzido");
}

var done = false;
function onYouTubePlayerStateChange(event: any) {
  ik_player = new YT.Player("ik_player_iframe");
  console.log("entrou aqui");
  ik_player.addEventListener("onReady", onYouTubePlayerReady);
  //   var time = event.target.showVideoInfo();
  //   console.log(time);
  //   console.log(YT.PlayerState.PLAYING);
  //   if (event.data == YT.PlayerState.PLAYING && !done) {
  //     setTimeout(() => {
  //       console.log("6 segundos de video");
  //     }, 6000);
  //     done = true;
  //   }
  //   console.log("Estado do vídeo alterado");
}

const Video = () => {
  return (
    <article>
      {/* <h2 className={styles.major}>INtro</h2> */}
      <script src="https://www.youtube.com/iframe_api"></script>
      <iframe
        id="ik_player_iframe"
        frameBorder="0"
        height="315"
        src="http://www.youtube.com/embed/5EnL2WXsxNQ?enablejsapi=1"
        width="560"
      ></iframe>
    </article>
  );
};

export default Video;
