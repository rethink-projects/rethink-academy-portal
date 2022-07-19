import React from "react";
// CSS
import styles from "./Avatar.module.css";

type AvatarProps = {
  type: "image" | "text" | "icon";
  size: "large" | "default" | "small" | "micro";
  onClick?: () => void;
  component: JSX.Element;
};

const Avatar = ({ type, size, onClick, component }: AvatarProps) => {
  return <div className={`${styles[type]} ${styles[size]}`}>{component}</div>;
};

export default Avatar;
