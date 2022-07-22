import React from 'react'
import styles from "./CardUltimasMetas.module.css"
import Images from "../../assets/index";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';


type cardProps = {
    quantMetas: number;
    mes: string;
    quantMetasConcluidas: number;
}

const CardUltimasMetas = ({quantMetas, mes, quantMetasConcluidas}: cardProps) => {
  return (
    <div className={styles.CardUltimasMetas_container}>
        <div className={styles.CardUltimasMetas_title} >
            <img src={Images.FlagUltimasMetas} alt="bandeira" />
            <h1>Últimas Metas</h1>
        </div>
        <div className={styles.CardUltimasMetas_info} >
            <div className={styles.CardUltimasMetas_inner} >
                <img src={Images.MedalUltimasMetas} alt="medalha ultimas metas" />
                <div className={styles.CardUltimasMetas_inner_info}>
                    <h1>Avaliação de {mes}</h1>
                    <p>{quantMetas<10 ? `0${quantMetas}` : quantMetas} Metas</p>
                </div>
                <ArrowForwardIosRoundedIcon onClick={() => {}} className={styles.cardUltimasMetas_arrow} />
            </div>
            <div className={styles.CardUltimasMetas_line} ></div>
            <div className={styles.CardUltimasMetas_progress} >
                <div className={styles.progress_metas} >
                    <p>{quantMetasConcluidas} </p>
                    <span>/{quantMetas} </span>
                </div>
                <div className={styles.progressbar} >
                    <p>barra</p>
                </div>
                <img src={Images.AmpulhetaUltimasMetas} alt="ampulheta" />
            </div>
        </div>
    </div>
  )
}

export default CardUltimasMetas