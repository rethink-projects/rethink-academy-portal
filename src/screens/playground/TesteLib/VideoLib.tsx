import React from "react";
import ReactPlayer from "react-player";
import YouTube from "react-youtube";
import * as loom from "@loomhq/loom-embed";
import { useEffect, useState } from "react";

const VideoLib = () => {
  const [videoHTML, setVideoHTML] = useState("");
  // ReactPlayer.canPlay("https://www.youtube.com/watch?v=yG0oBPtyNb0")
  // ReactPlayer.canPlay(
  //   "https://www.loom.com/share/84344412e3fb4dd3b6d56cd0a444a968"
  // )
  // ReactPlayer.canEnablePiP(
  //   "https://www.loom.com/share/84344412e3fb4dd3b6d56cd0a444a968"
  // )
  //   linkReplace: (selector?: string, options?: Option, target?: Document) => void;
  useEffect(() => {
    const response = async () => {
      //   const response = loom.linkReplace(
      //     "https://www.loom.com/share/84344412e3fb4dd3b6d56cd0a444a968"
      //   );

      //   console.log(response);

      //   loom.oembed(
      //     "https://www.loom.com/share/84344412e3fb4dd3b6d56cd0a444a968"
      //   );
      //   setVideoHTML(html);
      return await loom.oembed(
        "https://www.loom.com/share/84344412e3fb4dd3b6d56cd0a444a968"
      );
    };
    const resposta = response();

    // console.log(resposta.then());
  }, []);
  //   console.log(videoHTML);

  //   console.log(
  //     loom.oembed("https://www.loom.com/share/84344412e3fb4dd3b6d56cd0a444a968")
  //   );

  return (
    <div>
      VideoLib
      {/* <YouTube videoId="96j3foSEZ5Q" /> */}
      {/* {loom.linkReplace(
        "https://www.loom.com/share/84344412e3fb4dd3b6d56cd0a444a968"
      )} */}
      {/* <ReactPlayer /> */}
    </div>
  );
};

export default VideoLib;
