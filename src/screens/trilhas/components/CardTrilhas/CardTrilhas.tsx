import styles from "./CardTrilhas.module.css";
import image from "../../../../assets/academyCardTrilhas.png";
import PadLock from "@mui/icons-material/LockOutlined";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";

type TypeCardTrilhas = {
  title: string;
  description: string;
  inputTrilha?: {
    totalVideo: number;
    watched: number;
  };
  image?: string;
  blocked: boolean;
  onClick: () => void;
  previous: string;
};

const CardTrilhas = ({
  onClick,
  title,
  description,
  inputTrilha,
  blocked,
  previous,
}: TypeCardTrilhas) => {
  const calcPercentage = (): number => {
    return Math.floor((watched / (totalVideo > 0 ? totalVideo : 1)) * 100);
  };

  const courseCompleted = (): boolean => {
    return calcPercentage() === 100; //totalVideo === watched
  };

  const videoBlocked = (): boolean => {
    return blocked;
  };
  if (blocked) {
    onClick = () => {};
  }
  const { totalVideo, watched } = inputTrilha!;
  const card_progressBar = courseCompleted()
    ? styles.card_progressBar_complete
    : styles.card_progressBar_incomplete;
  const completedCourseClass_container = courseCompleted()
    ? styles.container_completed
    : styles.container;
  const completedCourseClass_effect_img = courseCompleted()
    ? styles.effect_image_completed
    : styles.effect_image_incomplete;
  const completedCourseClass_effect_card_hover = courseCompleted()
    ? styles.effect_card_completed
    : styles.effect_card_incomplete;
  const videoBlockedClass = videoBlocked()
    ? styles.container_video_blocked
    : "";
  return (
    <div className={completedCourseClass_container} onClick={() => onClick()}>
      <div className={styles.container_inner}>
        <div
          style={{ backgroundImage: `url(${image})` }}
          className={styles.card_image}
        >
          <div className={completedCourseClass_effect_img}></div>
        </div>
        <div className={styles.card_content}>
          <h1 className={styles.card_content_title}>{title}</h1>
          <p className={styles.card_content_description}>{description}</p>
          <div className={card_progressBar}>
            <span>{`${calcPercentage()}%`}</span>
            <ProgressBar
              width={242}
              relativeValue={watched}
              totalValue={totalVideo > 0 ? totalVideo : 1}
            />
          </div>
          <p className={styles.legend_progressBar}>
            {`${watched} de ${totalVideo} curso(s) concluído(s).`}
          </p>
        </div>
      </div>
      {videoBlocked() ? (
        <div className={videoBlockedClass}>
          <div className={styles.container_padlock}>
            <PadLock />
          </div>
          <div className={styles.content_video_blocked}>
            <h1>Trilha Bloqueada!</h1>
            <p>
              {`Assista pelo menos um curso da Trilha ${previous} para
              desbloquear.`}
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.hover_card}>
          <div className={completedCourseClass_effect_card_hover}></div>
        </div>
      )}
    </div>
  );
};

export default CardTrilhas;
