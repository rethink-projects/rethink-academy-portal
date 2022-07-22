import React from 'react'
import styles from "./CardTrilhas.module.css";
import image from "../../assets/academyCardTrilhas.png";
import PadLock from '@mui/icons-material/LockOutlined';
import ProgressBar from "../ProgressBar/ProgressBar";

type TypeCardTrilhas = {
    title: string;
    description: string;
    inputTrilha?: {
        totalVideo: number;
        watched: number
    }
    image?: string;
}

const CardTrilhas = ({ title, description, inputTrilha }: TypeCardTrilhas) => {
    const { totalVideo, watched } = inputTrilha!;

    const calcPercentage = (): number => {
        return Math.floor((watched / totalVideo) * 100);
    }

    const coursecompleted = (): boolean => {
        return false //totalVideo === watched
    }

    const videoBlocked = (): boolean => {
        return false
    }


    const completedCourseClass_container = coursecompleted() ? styles.container_completed : styles.container
    const completedCourseClass_effect_img = coursecompleted() ? styles.effect_image_completed : styles.effect_image_incomplete
    const completedCourseClass_effect_card_hover = coursecompleted() ? styles.effect_card_completed : styles.effect_card_incomplete
    const videoBlockedClass = videoBlocked() ? styles.container_video_blocked : "";


    return (
        <div className={completedCourseClass_container}>
            <div className={styles.container_inner}>
                <div style={{ backgroundImage: `url(${image})` }} className={styles.card_image}>
                    <div className={completedCourseClass_effect_img}></div>
                </div>
                <div className={styles.card_content}>
                    <h1 className={styles.card_content_title}>{title}</h1>
                    <p className={styles.card_content_description}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    {/* <p className={styles.card_progressBar}>Substitua essa tag pela barra de progresso</p> */}
                    <div className={styles.card_progressBar}>
                        <span>{`${calcPercentage()}%`}</span>
                        <ProgressBar relativeValue={watched} totalValue={totalVideo} />
                    </div>
                    <p className={styles.legend_progressBar}>20 de 20 cursos concluídos.</p>

                </div>
            </div>
            {videoBlocked() ?
                <div className={videoBlockedClass}>
                    <div className={styles.container_padlock}>
                        <PadLock />
                    </div>
                    <div className={styles.content_video_blocked}>
                        <h1>Trilha Bloqueada!</h1>
                        <p>Assista pelo menos um curso da Trilha nome para desbloquear.</p>
                    </div>
                </div>
                :
                <div className={styles.hover_card}>
                    <div className={completedCourseClass_effect_card_hover}></div>

                </div>
            }

        </div >
    )
}

export default CardTrilhas