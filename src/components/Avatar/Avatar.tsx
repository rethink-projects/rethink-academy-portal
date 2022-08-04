// CSS
import styles from "./Avatar.module.css";

type AvatarProps = {
  type?: "image" | "text" | "icon";
  size?: "large" | "default" | "small" | "micro";
  onClick?: () => void;
  children: JSX.Element;
};

const Avatar = ({
  type = "text",
  size = "default",
  onClick,
  children,
}: AvatarProps) => {
  return <div className={`${styles[type]} ${styles[size]}`}>{children}</div>;
};

export default Avatar;
