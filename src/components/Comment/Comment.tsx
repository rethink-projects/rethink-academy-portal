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
import {
  createComment,
  getCommentsFromUser,
  removeComment,
} from "../../services/backend/comments";
import { CommitOutlined } from "@mui/icons-material";

const Comment = () => {
  const [active, setActive] = useState(true);
  const [comments, setComments] = useState<
    { id: string; text: string; CommmentAuthor: any }[]
  >([]);
  const [description, setDescription] = useState("");

  const { user } = useAuth();

  const getComments = async () => {
    const data = await getCommentsFromUser("sthephany.tezza@rethink.dev");
    console.log({ data });
    setComments(data);
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleComment = async () => {
    const response = await createComment({
      text: description,
      userEmail: user.email,
    });

    setComments((prevState) => {
      return [...prevState, response.comment];
    });

    setDescription("");
  };

  const handleDelete = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));

    removeComment(id);
  };

  if (!user) return <div> carregando...</div>;

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
              name={
                comment.CommmentAuthor.name +
                " " +
                comment.CommmentAuthor.surname
              }
              title={`${comment.CommmentAuthor.role} of ${comment.CommmentAuthor.main}`}
              avatar={comment.CommmentAuthor.avatar}
              CommenterEmail={comment.CommmentAuthor.email}
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
