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

const Comment = ({ student: studentEmail }: { student?: string | false }) => {
  const [active, setActive] = useState(true);
  const [comments, setComments] = useState<
    { id: string; text: string; CommmentAuthor: any }[]
  >([]);
  const [description, setDescription] = useState("");

  const { user } = useAuth();

  const handleComment = async () => {
    if (user) {
      const response = await createComment({
        text: description,
        userEmail: studentEmail ? studentEmail : user.email,
        commentAuthor: user.email,
      });

      setComments((prevState) => {
        return [...prevState, response.comment];
      });

      setDescription("");
    }
  };

  const handleDelete = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
    removeComment(id);
  };

  const getComments = async () => {
    if (user) {
      const data = await getCommentsFromUser(
        studentEmail ? studentEmail : user.email
      );
      setComments(data);
    }
  };

  useEffect(() => {
    if (user) {
      getComments();
    }
  }, [user]);

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
          {comments.length > 0 &&
            comments.map((comment) => (
              <CommentBox
                key={comment.id}
                id={comment.id}
                text={comment.text}
                onClickDelete={handleDelete}
                name={
                  comment.CommmentAuthor.name +
                  " " +
                  comment.CommmentAuthor.surname
                }
                title={`${comment.CommmentAuthor.role.toLowerCase()} of ${comment.CommmentAuthor.main.toLowerCase()}`}
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
