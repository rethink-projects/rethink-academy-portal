import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import styles from "./Comment.module.css";
import Images from "../../assets";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Avatar from "../Avatar/Avatar";
import Textarea from "../Textarea/Textarea";
import "./Comment.css";
import CommentBox from "./components/CommentBox";
import SimpleButton from "../SimpleButton/SimpleButton";

const Comment = () => {
  const [active, setActive] = useState(false);
  const [comments, setComments] = useState([
    {
      id: "1",
      text: "Ameeeei a sua apresentação em nosso primeiro encontro Lu, não vejo a hora da próxima!",
    },
  ]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const data = [
      {
        id: "1",
        text: "Ameeeei a sua apresentação em nosso primeiro encontro Lu, não vejo a hora da próxima!",
      },
      {
        id: "2",
        text: "Ameeeei a sua apresentação em nosso primeiro encontro Lu, não vejo a hora da próxima!",
      },
    ];

    setComments(data);
  }, []);

  const handleComment = () => {
    const comment = {
      id: Math.floor(Math.random() * 1000).toString(),
      text: description,
    };

    setComments((prevState) => {
      return [...prevState, comment];
    });

    setDescription("");
  };

  const handleDelete = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className={styles.container}>
      {!active && (
        <div className={styles.no_comments}>
          <div className={styles.error_outline}>
            <ErrorOutlineIcon />
          </div>
          <p>Você ainda não possui comentários! Vamos começar?</p>
        </div>
      )}
      {active && (
        <div className={styles.container_comments}>
          {comments.map((comment) => (
            <CommentBox
              id={comment.id}
              text={comment.text}
              onClickDelete={handleDelete}
            />
          ))}
        </div>
      )}
      <div className={styles.make_comment}>
        <Textarea
          type={"small"}
          placeholder={"Deixe seu Comentário"}
          value={description}
          onChangetext={(e) => setDescription(e.target.value)}
        />
        <SimpleButton size={"small"} text={"Enviar"} onClick={handleComment} />
      </div>
    </div>
  );
};

export default Comment;
