import { Images } from "../../assets";
import styles from "./SocialButton.module.css";

type SocialButtonType = {
  type?: "primary" | "secundary";
  onClick?: () => void;
};

function SocialButton({ type = "primary", onClick }: SocialButtonType) {
  const classNameButton =
    type === "primary"
      ? `${styles.btn_social_primary}`
      : `${styles.btn_social_secundary}`;

  return (
    <div>
      <button onClick={onClick} className={classNameButton}>
        <img
          className={styles.btn_social_img}
          src={Images.google}
          alt={"Google Icon"}
        />
        <p className={styles.btn_social_p}>Entrar com o Google</p>
      </button>
    </div>
  );
}

export default SocialButton;
