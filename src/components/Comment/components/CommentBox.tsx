import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Avatar from "../../Avatar/Avatar";
import Images from "../../../assets";

import styles from "./CommentBox.module.css";

type CommentBoxProps = {
  id: string;
  text: string;
  onClickDelete: (id: string) => void;
};

const CommentBox = ({ id, text, onClickDelete }: CommentBoxProps) => {
  const [textDescription, setTextDescription] = useState(text);

  return (
    <div className={styles.comment_box}>
      <div className={styles.comments}>
        <div className={styles.header}>
          <div className={styles.userImage}>
            <Avatar
              type={"image"}
              size={"large"}
              children={<img src={Images.avatar} alt="avatar image" />}
            />
          </div>
          <div className={styles.description}>
            <p>Leticia Lange</p>
            <span>Embaixadora de Design</span>
          </div>
          <button
            className={styles.trashIcon}
            onClick={() => onClickDelete(id)}
          >
            <img src={Images.icons.trashIcon} alt="trash icon" />
          </button>
        </div>
        <div className={styles.textArea}>
          <p>{textDescription}</p>
        </div>
      </div>
      <div className={styles.line}></div>
    </div>
  );
};

export default CommentBox;
