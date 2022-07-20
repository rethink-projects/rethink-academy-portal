import React from 'react'
import styles from "./CardTrilhas.module.css";
import image from "../../assets/academyCardTrilhas.png";

type TypeCardTrilhas = {
    title: string;
    description: string;
    courseVideos?: {
        totalVideo: number;
        watched: number
    }
    image?: string;
}

const CardTrilhas = ({ title, description, courseVideos }: TypeCardTrilhas) => {
    const { totalVideo, watched } = courseVideos!;

    const completedCourse = () => {
        return totalVideo === watched
    }


    const completedCourseClass_container = completedCourse() ? styles.container_completed : styles.container
    const completedCourseClass_effect_img = completedCourse() ? styles.effect_image_completed : styles.effect_image
    // const completedCourseClass_effect_card = totalVideo === watched ? styles.effect_card_completed_hover : ""

    return (
        <div className={completedCourseClass_container}>
            <div className={styles.container_inner}>
                <div className={styles.card_image}>
                    <img src={image} />
                    <div className={completedCourseClass_effect_img}></div>
                </div>
                <div className={styles.card_content}>
                    <h1 className={styles.card_content_title}>{title}</h1>
                    <p className={styles.card_content_description}>{description}</p>
                    <p className={styles.card_progressBar}>Substitua essa tag pela barra de progresso</p>
                </div>
            </div>
            {/* <div className={completedCourseClass_effect_card}>
                <div>

                </div>
                <div></div>
            </div> */}

        </div>
    )
}

export default CardTrilhas