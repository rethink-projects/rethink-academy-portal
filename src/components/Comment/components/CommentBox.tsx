import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Avatar from "../../Avatar/Avatar";
import Images from "../../../assets";

import styles from "./CommentBox.module.css";

type CommentBoxProps = {
  id: string;
  text: string;
  avatar?: string;
  name?: string;
  title?: string;
  email?: string;
  CommenterEmail?: string;
  onClickDelete: (id: string) => void;
};

const CommentBox = ({
  id,
  text,
  onClickDelete,
  avatar,
  name,
  title,
  email,
  CommenterEmail,
}: CommentBoxProps) => {
  const { user } = useAuth();

  return (
    <div className={styles.comment_box}>
      <div className={styles.comments}>
        <div className={styles.header}>
          <div className={styles.userImage}>
            <Avatar
              type={"image"}
              size={"large"}
              children={
                <img src={avatar ? avatar : Images.avatar} alt="avatar image" />
              }
            />
          </div>
          <div className={styles.description}>
            <p>{name}</p>
            <span>{title}</span>
          </div>
          {user.email === CommenterEmail ? (
            <button
              className={styles.trashIcon}
              onClick={() => onClickDelete(id)}
            >
              <img src={Images.icons.trashIcon} alt="trash icon" />
            </button>
          ) : (
            <div></div>
          )}
        </div>
        <div className={styles.textArea}>
          <p>{text}</p>
        </div>
      </div>
      <div className={styles.line}></div>
    </div>
  );
};

export default CommentBox;
