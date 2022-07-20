import React from 'react'
import styles from "./CardTrilhas.module.css";
import image from "../../assets/academyCardTrilhas.png";

type TypeCardTrilhas = {
    title: string;
    description: string;
}

const CardTrilhas = ({ title, description }: TypeCardTrilhas) => {
    return (
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <div className={styles.card_image}>
                    <img src={image} />
                </div>
                <div className={styles.card_content}>
                    <div className={styles.card_content_inner}>
                        <h1 className={styles.card_content_title}>{title}</h1>
                        <p className={styles.card_content_description}>{description}</p>
                        <p>Substitua essa tag pela barra de progresso</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardTrilhas