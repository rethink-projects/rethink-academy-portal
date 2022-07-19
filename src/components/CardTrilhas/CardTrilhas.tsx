import React from 'react'
import styles from "./CardTrilhas.module.css";

type TypeCardTrilhas = {
    title: string;
    description: string;
}

const CardTrilhas = ({ title, description }: TypeCardTrilhas) => {
    return (
        <div className={styles.container}>
            <div className={styles.card_image}>
                <img src="src\assets\academyCardTrilhas.png" />
            </div>
            <div className={styles.card_content}>
                <h1 className={styles.card_content_title}>{title}</h1>
                <p className={styles.card_content_description}>{description}</p>
                <p>Substitua essa tag pela barra de progresso</p>
            </div>
        </div>
    )
}

export default CardTrilhas